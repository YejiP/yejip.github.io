---
layout: post
title: AWS fundamentals IAM + EC2
description: >
  AWS CDA 빨리 따자
excerpt_separator: <!--more-->
---


## AWS availability Zone (AZ)
  한 region에 최소 2개에서 6개 까지 존재한다. (평균적으로는 세개)
  예를들어, Sydney:ap-southesast-2 라는 region 을 선택한다면, 이 지역에는 하나 이상(최소 2개에서 6개)의 데이터 센터가 존재하는 것이다. 이 데이터 센터는 물리적으로 떨어져 있다. 그치만, high bandwith ultra-low latency network 로 연결되어 있다.


## Regional 과 Global service
  지역 선택 해야하는 서비스가 있고, 그렇지 않은 서비스가 있다. 왜지?
  ec2는 regional service의 예시, IAM 은 global 서비스의 예시.

# IAM (Identity and Access Management)
  는 무엇인고 하니,,,  'AWS 리소스에 대한 액세스를 안전하게 제어할 수 있는 웹 서비스' 라고 나와있다.
  여기에는

  *users* : 사람

  *group* : 팀

  *roles* : 기계

  가 존재한다. 그리고 JSON 파일로 정책 주어진다.

  MFA(Multi Factor Authentication) 이 가능하다. (한가지가 아니라 여러가지 관문을 거쳐야만 인증이 완료 되는 것. 보안 강화)

  Root account 는 inital setup 하고 사용하지 않는다. 대신 추후에는 IAM user access 키 이용해서 접속하도록 한다.
  한 명의 IAM user --- credentials (공유하면 안된다)
  하나의 IAM role --- 하나의 application


# EC2
  EC2와 관련된 개념 네가지를 정리하도록 하겠다.
  1. EC2 : 가상 머신 빌랴줌
  2. EBS : 가상 드라이브에 데이터 저장
  3. ELB : Distributing load across machines
  4. ASG : 오토 스케일링 그룹



  일단 요기 튜토리얼에서는 EC2 instance를 만들었다. (AMI AMAZON LINUX2, free tier)
  이렇게 EC2 instance를 만들었으면 이제 우리 컴퓨터에서 접속을 해봐야한다.
  SSH 로 한다. SSH 의 포트는 보통 22인가보다. EC2 만들 때 Security group 에서 이미 SSH port 22 규칙이 디폴트로 있었다.
  그래서 따로 규칙 추가 안하고 연결 진행하면 된다.

  일단 cmd에서 SSH 가능한 OS는 mac, linux, window >=10 이다.
  윈도우 10이하면 putty 사용해야한다. 나는 윈도10이지만 모르고 푸티를 사용해서 여지껏 하고 있었다. 배움이란 역시 슬프고 즐겁다..

  접속은 이렇게 한다. 커맨드 라인에, ssh -i key.pem ec2-user@ip주소 (key 는 ec2 만들 때 내려받을 수 있다.)
  그.러.나.! 일케 하면 오류뜬다. 'permission error. Unprotected private key file '
  왜냐면, key file을 프로텍트 해줘야한다. 그것은 바로 chmod 0400 key.pem 명령어를 통해 할 수 있다. 일케 해주면 소유자만 읽을 수 있게 되나보다.

  AMI AMAZON LINUX2, free tier에서 간편하게 브라우저로 연결하는 방법이 생겼다. CONNECT가서 클릭하면 된다. 굉장히 편한 매력이 있다. TERMINAL 과 KEY는 필요없지만 쨌든 이 방법도 SSH를 사용하기 때문에 SSH 포트22 룰이 필요하다.


## Security Groups
  Ec2 머신에서 어떻게 트래픽이 허용될 것인지 정해준다.
  firewall 처럼 작용한다.
  ports, authorize IP(IPv4, IPv6),Inbound/outbound...
  region에 국한되어 만들어진다. 따라서 새로운 region 이면 새로 security groups 만들어야 한다.
  Application 이 TIME OUT --> Security group issue
                 Connection refused --> application error.

  Default : Inbound 는 block, outbound 는 Authroize.



## Public  vs  Private  vs Elastic IP
  Public IP
    : www로 접근 가능
    : 특별한 주소가 필요하다. 같은 IP는 안된다.

  Private IP
    : private network에서만 접근 가능
    : private 내부에서는 ip 가 다 달라야하지만, 다른 private network 의 ip와는 겹칠 수 있다.
    : internet 에 접속하려면 NAT + internet gateway 를 사용해야한다.
    : specified range 만 private IP 로 사용가능하다.


  Elastic IP
    : instance를 start/stop 하면 IP가 바뀌는데 그것을 해결하기 위한 방안 같은 것. (Fixed IP 필요할 때)
    : IPv4
    : 계정 당 max 5개 가질 수 있다.
    :그치만 추천은 하지 않는다. 그냥 DNS name을 등록하래

  EC2는 internal AWS network 에선 private IP 사용한다. 그러나 SSH 시에는 public만 사용 가능.
  private IP 는 stop 해도 변하지 않고, public은 변한다. 그래서 Elastic IP 사용

## 서버 시작 Command
    sudo su : root로, 권한 문제 없이 모든 command 다 칠 수 있다.
    yum update -y
    tum install -y httpd.x86-64
    systemCH? start httpd.service
              enable
    curl localhost:80 (Apache server는 port 80)
    echo "Hello world" > var/www/html/index.html


## EC2 USER DATA
    : Bootstrapping : 머신이 시작될 때의 launching commands 이다. 컴터 시작할 때 마다 자동으로 커맨드 수행되는 것.
    : EC2 만들 때, advanced details 에 user data 있다.
    여기에 명령어 (앞에 sudo 꼭) 적어놓으면 된다.
    
    예시)
      #!/bin/bash (이거 첫줄에 써야함. 중요 뽀인또)
      #install httpd (Linux2 버전)
      sudo yum update -y
    
    user data에 있는 커맨드는, intance가 새로 만들어질 때 마다 수행된다.
      ==> 내 홈페이지의 경우, EC2 톰캣 서버 깔기?를 USER DATA 에 넣을 수 있을 것같다. 그러나 JSP 파일은 내가 직접 넣어야할듯..



## EC2 Instance Launch Types:
    총 다섯가지 있다.
    
    1. on demand instance
      : 사용한 만큼 낸다.
      : 가장 비싸지만, no long term commitment. (오래 계약 안해도 된다.)
    
      : elastic workload 에 적합하다.
    
    2. Reserved Instances
      : 75프로 저렴(on demand 기준)
      : 대신 1년 이상 사용해야한다.
      : 특정 instance type를 예약해야한다.
      : 꾸준한 사용이 필요한 일에 적합하다.
    
    3. EC2 Spot Instances
      : 90프로 저렴(on demand 기준)
      : 현재 사용 예산 > 정해놓은 limit --> instance 사라진다.
      : batch job, data analysis, image porecssing 등에 적합.
    
    4. Dedicated Hosts
      : EC2 instance placement 의 full control 가능.  --> 정확히 이해를 못했다. 그치만 물리적으로..?
      : 복잡한 licensing model 이 있는 SW에 적합함. (왜?)
      : 강한 규제나 제약이 있는 회사.
    
    5. EC2 dedicated Instances
      : 하드웨어가 내꺼
      : 다른 Instance와 하드웨어 공유 가능하지만, 너의 계정에 있는 것들만 가능.
      : No control over Instance placement.


## EC2 Network Interfaces (ENI)
      : VPC: Virtual Private Cloud
      : ENI는 VPC의 logical component, virtual network card 대표.
      : EC2를 네트워크에 연결해준다.
      : Primart private IPv4,
      : 하나 이상의 IPv4 ENI 만들기 가능 for failover.
      : ENI 만들고, EC2에 Attach 하면, 한 instance에 두개의 instance가 붙는다. 그리고 ENI 는 옮길 수 있다.

## EC2 pricing
      : 시간 당 붙는다.
      : region, type of ec2, os 에 따라 가격이 다르다.
      : billed by the second. 6 초나 60초나 비용이 같다. 0.023/60 달러
      : Instance 가 스탑되면, 그 후 돈이 청구되지 않는다.

## Custom AMI
    PROS
      : 필요한 패키지를 미리 깔 수 있다.
      : 부트 타임 빠름.
      : network 안 머신 조종.
      : 유지 보수, 장저밍 많다.
    
    AMI ARE NOT BUILT FOR A SPECIFIC AWS REGION.

## Burstable Instances
      t2 machines
        : 보통은 그럭저럭 괜찮은 cpu이다. 처리할게 갑자기 많아지면, Burst 하면서 처리. Good CPU.
        : Credit을 burst 하면서 동작한다. credit이 다 사라지면, cpu 성능이 나빠진다.
        : 기계가 burst 멈추면, credit 이 시간을 거치며 축적된다.


## T2 unlimited
      : unlimited burst credit balance.


# 이 단원에서 EXAM CHECK LIST!
    1. ec2에 ssh로 접속하는 방법.
    2. .pem permission & 에러
    3. security group의 적합한 사용.
    4. private, public, elastic IP 의 기본적 차이점.
    5. user data 이용하는 법과 customize 하는 법.
    6. OS 향상 시키기 위해 custom AMI 하는 법...?
    7. EC2 는 seconds 에 의해 청구된다.  ?
          'AWS 리전에 따라 시간 또는 초 단위로 계산됩니다.',
          '1시간 미만의 각 인스턴스 시간은 Linux 인스턴스의 경우 초당 요금으로 청구되고 다른 모든 인스턴스 유형의 경우 1시간으로 청구됩니다.'
          '인스턴스가 초 단위로 요금이 청구되는 경우 새 인스턴스가 시작될 때마다, 즉 인스턴스가 실행 상태로 전환될 때마다 최소 60초의 요금이 청구됩니다.'
