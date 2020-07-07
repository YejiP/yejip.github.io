---
layout: post
title: AWS fundamentals IAM + EC2
description: >
  AWS CDA 재빠르게 따보기 시작!
excerpt_separator: <!--more-->
---

##FUNDAMENTALS
# AWS availability Zone (AZ)
  한 region에 최소 2개에서 6개 까지 존재한다. (평균적으로는 세개)
  예를들어, Sydney:ap-southesast-2 라는 region 을 선택한다면, 이 지역에는 하나 이상(최소 2개에서 6개)의 데이터 센터가 존재하는 것이다. 이 데이터 센터는 물리적으로 떨어져 있다. 그치만, high bandwith ultra-low latency network 로 연결되어 있다.


#Regional 과 Global service
  지역 선택 해야하는 서비스가 있고, 그렇지 않은 서비스가 있다. 왜지?
  ec2는 regional service의 예시, IAM 은 global 서비스의 예시.

##IAM (Identity and Access Management)
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


## EC2
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
