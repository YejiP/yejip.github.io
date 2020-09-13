---
layout: post
title: AWS fundamentals ELB + ASG
description: >
  ELB 와 ASG는 무엇인가..?
excerpt_separator: <!--more-->
---
# AWS FUNDAMENTALS : ELB + ASG

## Background Knowledge

    1. Scalability
    vertical   : Instance의 크기를 , 성능을 증가시키는 의미. ex) t2.micro --> t2.large
    horizontal : Instace의 수를 증가시키는 것, Distributed system. 요즘 app 에서 흔하게 사용한다.
    
    2. High Availability
    : 보통 horizontal scalability와 연관.
    : Data center loss 에 살아남기 위해서..


## EC2에서는?
    Vertical scaling : instance의 크기 증가시킨다. --> RDS와 Elastic Cache 
    Horizontal scaling : instance의 수 증가시킨다. --> Autoscaling group, Load balancer.
    High availability : multi AZ 에서 같은 app을 가동 시킨다.--> RDS multi AZ는 passive, Horizontal scaling 은 active.


# Load Blancing
**Internet 트래픽을 여러개의 서버로 보내주는 서버**
    여러 유저가 EC2 instance로 바로 접근하는게 아니라, 하나의 통로인 'load balancer'로 접근한다.
    load balancer는 여러개의 EC2 instance에 연결되어 있고, user를 instance에 보내준다.

**load balancer의 장점**
    load를 downstream 서버에 분산시켜준다.
    single point access(DNS)를 제공한다. (각각의 서버가 아니라 load balancer로 가면 됨)
	failures를 잘 핸들한다.

​	instance health check를 정기적으로 한다.
​    SSL termination 을 제공한다.

  

**ELB 전반적인 내용**
    아마존 제공 LB

​    아마존에서 관리하기 때문에 편리하고, 직접 관리하는 것 보다 훨씬 낫다.

​	내가 직접 load balancer 하는게 더 저렴하지만, 복잡하다.

    AWS에 있는 Load Balancer의 타입.
    
    1. Classic Load Balancer (HTTP/S,TCP)
    2. Application Load Balancer (HTTP/S, websocket) --> layer7
    3. Network Load Balancer (TCP, TLS, UDP) --> layer4
    4. Internal/external Load Balancer
    
    load balancer security groups
      : application 의 security group 의 source 가 된다. (참조해서)
    
    LB Errors
      4xx errors : client induced errors.
      5xx errors : application induced errors.
      503 errors : capacity /no registered target
      time out, can't connect to my application : check your security groups.
    
    Health check
      ping protocol : HTTP
           port : 80
           path : /
    
      건강하다면, 200 (ok) 보낸다.
      이 신호 안오면 안 건강한 걸로 간주되고, load balancer 이 여기로는 traffic 안 보낸다.


    Load Balancer과 instance 연결하는 법
      일단 laod balancer 만들고, 그 과정에서 instance 만들었었다.
      거기서, application security group의 Instance source에 0.0.0.0/0 (어디에서나) 에서 load balancer 로 바꾼다.
      그러면 load balancer 거쳐서 instance에 들어온다.  


## EC2 Load Balancer
### 1.CLB(Classic Load Balancer)



![Classic Load Balancer - Elastic Load Balancing](https://docs.aws.amazon.com/ko_kr/elasticloadbalancing/latest/classic/images/load_balancer.png) 

fixed host name, layer4/7 , TCP/HTTP 를 기반으로 한 Health check 

Anywhere 에서 EC2 instance에 직접 접근할 수 없게하고, EC2 instances 들은 Load balancer에서 오는 트래픽만 받을 수 있게 만든다. (Security group 설정으로) *따라서 load balancer을 통해서만 ec2에 접근 가능하게 된다.*

load balancer에 ec2 직접 추가 가능



### 2. ALB(Application Load Balancer)

![Application Load Balancer](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2019/10/06/illustration-2.png)

layer7, url의 path, hostname, query,string,header 에 기반해 route해준다.
  micro service 나 container based app 에 적합하다.
  port mapping feature 있다.
  ALB는 multiple target group으로 이끌어준다.
  *target group의 타입*
EC2 instance, EC2 tasks, Lambda function, IP address(must be private)
  Health check는 target group level 에서 진행된다.
  fixed host hostname
  client 의 IP를 직접적으로 못본다.  true IP 는 HTTP에 있는 header X-forwarded port에 있다. porto..
  Listener 에서 rule edit, path, host 등등에 따라 target group 지정이 가능하다.

    *Load Blanacer Stickiness*
    같은 client 는 항상 같은 instance로 direct되게 하는 것.
    쿠키 통해 가능하다. user가 session data 를 잃지 ㅇ낳게 해준다.
    stickiness 기간 지정 가능.
    
    *Crosszone LB*
    다른 존에 있는 instance와 연결가능하다.
    CLB는 기본설정으로 사용 안하고, ALB는 항상 사용, NLB는 기본설정은 안사용하는데 돈 내면 가능...



### 3. NLB(Network Load Balancer)

![Amazon API Gateway 기반 VPC Link 활용 방법](https://d2908q01vomqb2.cloudfront.net/7b52009b64fd0a2a49e6d8a939753077792b0554/2018/07/02/api-gateway-vpc-link-2.png)

layer4(TCP , UDP traffic)
  초당 백만개의 요청 수행한다.
  반응속도 빠름. (100ms, cf. ALB : 400ms)
  하나의 static IP
  NLB security group은 좀 다르게, CLB에서는 LB에서 오는 트래픽, EC2에서 받았다면
  NLB에서는 외부 traffic을 Target Group에 전달해주기 때문에 IP가 NLB IP 가 아니라 외부 IP라서
  Security group rule 에 80 HTTP 0.0.0.0/0 추가해줘야한다. (아니근데 애초에 HTTP안 받는거아님?? 뭐지)





# SSL/TSL

  클라이언트 ~ LB 간 정보를 암호화 시킨다. (in-flight encryption)
  SSL(secure socket layer), TSL(Transport Layer Security)
  SSL 인증서는 만료일이 있어서 갱신되어야한다.

## SNI(Server Name Indication)
    여러개의 SSL certificate를 한 웹 서버에서 로딩할 수 있게한다.
    클라이언트가 호스트 네임을 지명해야한다.
    서버가 알맞은 cert를 찾아준다.
    ALB/NLB/Cloudfront 에서 동작.
    ALB 는 여러개의 SSL certificate에 대해 여러개의 Listner 를 제공한다.
    
    cf) CLB 는 하나의 SSL cert 만 가능

## ELB (Connection draining - CLB), (Deregistration Delay -  ALB, NLB)
    Instance 가 ok 한 상태가 아닐 때, 정상 instance 에 request 보내는 것.


# Autoscaling group
  scale in : removing , scale out : adding according to load.
  min.max 를 정할 수 있다.
  LB에 자동으로 등록된다.

## ASG scaling policy
    1. target tracking scaling : 40% ~
    2. simple/step scaling : cloud watch alarm 이 울리면 2 unit 늘려라.
    3. scheduled actions : 5pm on fridays, increase min capacity.
