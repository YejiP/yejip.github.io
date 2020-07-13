---
layout: post
title: AWS fundamentals ELB + ASG
description: >
  ELB 와 ASG는 무엇인가..?
excerpt_separator: <!--more-->
---
# AWS FUNDAMENTALS : ELS + ASG

## Background Knowledge

    1. Scalability
    vertical   : Instance의 크기를 , 성능을 증가시키는 의미. ex) t2.micro --> t2.large
    horizontal : Instace의 수를 증가시키는 것, Distributed system. 요즘 app 에서 흔하게 사용한다.

    2. High Availability
    : 보통 horizontal scalability와 연관.
    : Data center loss 에 살아남기 위해서..


## EC2에서는?
    Vertical scaling : instance의 크기 증가시킨다.
    Horizontal scaling : instance의 수 증가시킨다. --> Autoscaling group, Load Balancer.
    High availability : multi AZ 에서 같은 app을 가동 시킨다.


## Load Blancing
  Internet 트래픽을 여러개의 서버로 보내주는 서버
    여러 유저가 EC2 instance로 바로 접근하는게 아니라, 하나의 통로인 'load balancer'로 접근한다.
    load balancer는 여러개의 EC2 instance에 연결되어 있고, user를 instance에 보내준다.

  load balancer의 장점
    load를 downstream 서버에 분산시켜준다.
    single point access를 제공한다. (각각의 서버가 아니라 load balancer로 가면 됨)
    instance health check를 정기적으로 한다.
    SSL termination 을 제공한다.

  ELB 전반적인 내용
    아마존 제공 LB
    아마존에서 관리하기 때문에 편리하고, 직접 관리하는 것 보다 훨씬 낫다.

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
    1. CLB(Classic Load Balancer)
      fixed host name, layer4/7 , TCP/HTTP 를 기반으로 한 Health check  

    2. ALB(Application Load Balancer)
      layer7, url의 path, hostname, query,string,header 에 기반해 route해준다.
      micro service 나 container based app 에 적합하다.
      port mapping feature 있다.

    
