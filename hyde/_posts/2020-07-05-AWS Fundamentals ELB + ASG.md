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
    in
