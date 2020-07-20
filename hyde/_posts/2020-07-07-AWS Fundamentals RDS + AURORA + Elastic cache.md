---
layout: post
title: AWS Fundamentals : RDS + AURORA + Elastic cache
description: >
  RDS + AURORA + Elastic cache 를 알아보자...
excerpt_separator: <!--more-->
---

# RDS(Relational Database Service)

## RDS overview
  : managed DB service (Query lang 으로 SQL 사용)
  : AWS 에서 DB 만들게 해준다. (postgres, MySQL, MariaDB, Oracle, Microsoft SQL server, Aurora)

## RDS 의 장단점
  (장): 관리되니까 편하다. (자동 provisioning, OS patching, 백업, 타임스탬프, Dashboards, Multi AZ setup, 윈도우 유지, Scaling(vertical&horizontal), storage는 EBS에 의해 back up 됨.)
  (단): SSH 는 못한다.

## RDS backup
: 자동임. 매일 full, 5분마다 transaction log 가 backup 된다. 7일 기록이 보유되고, 최대 35일 까지 보유 가능하다.
: DB Snapshot은 유저가 만들 수 있고, 이것은 내가 원하는 만큼 동안 보유 가능하다.


## RDS read replica

  :RDS DB 인스턴스 하나에 읽고 쓰기 한다. 그 DB인스턴스를 비동기 복제를 한다. 복제된 인스턴스는 읽기만 가능.
    예를들어, 우리팀이 일하고 있는 DB가 있다. 다른 팀도 그 DB를 이용해서 뭘 하고 싶어한다.
    만약 우리 DB에 직접 연결하게 하면, Instance가 overload될 수도 있다. 따라서 RDS DB를 복제한다.
    비동기 복제를 하고, 복제된 DB에서 그 팀이 READ할 수 있게 해준다. insert, delete, update는 쓰기 권한이니까 당연히 못한다.


## RDS read replica network cost
  : 내 data가 다른 AZ로 복제된다면 Network cost 지불해야한다. 같은 AZ면 공짜. (둘다 비동기, 아마 위의 예시같이 다른 팀 사용할 때..)

## RDS Multi AZ (재난 대비인 경우)
  :동기 방식으로 ! Availability 상승,하나의 DNS (Automatic failover) , scaling 은 아니다.


##  Hands on:
  DB freetier - mySQL, Postgres SQL
  AWS에 RDS 만들고, sqlelectron (DB client 프로그램)에서 접근 가능하다. DB 클라이언트 프로그램을 다운받아서 server info 에 DB 타입, Server address, end point 입력, port , user PW 넣으면 접근 가능하다.

  Instance action 에서 read replica, take snapshot 가능하다.

## RDS security
  :Encryption (At rest, In-flight)
  master가 encrypted 안돼있으면 read replicas 도 안된다.
  1. At rest encryption
    처음 만들어질 때만 실행 가능.
    AWS KMS - AES - 256 encryption으로 encrypt.
    launch time 에 encrpytion 이 정의돼야 한다.
    Oracle과 SQL server 에는 Trnasparent data encryption 가능.

  2. In flight encryption
    SSL certificates.


## RDS encryption operations
*unencrypt 된거 snapshot 하면 그것도 unencrypt. 근데 우리는 encrpyt 된거 원한다.*
이때, Snapshot 만들어 이걸 복제하면서 encrpyt 가능하게 한다. (왜 복제해서 해야되지..?)
encrpyt된 snapshot 에서 DB를 복구한다.

## Network & IAM
  network sec : DB는 보통 private subnet 에서 deploy 된다.
  ec2 처럼 security group 이용한다.
  Access management
    IAM policy (manage AWS RDS)
    전통 USER NAME/PW DB에 로긴 가능.
    RDS MYSQL & postgres SQL 에 IAM Based auth 로긴 가능.

## RDS 커넥트 w/ IAM authentication
  pw 필요 없다. (15분 유효기간 있는 AUTH token 사용한다.)
  RDS Service서 auth token 얻고, SSL encrpyt pass auth toekn 사용해 my sql 연결(..?)



# Amazon Aurora
  1. 오픈 소스 아니다.
  2. postgres/mysql 과 호환된다.
  my sql의 5배의 효율을 자랑, postgres의 3배의 효율
  storage가 10GB ~ 64TB 까지 많아진다. (점진적)
  15 replicas 까지 가능
  failover은 즉시, high Availability
  RDS보다 20 퍼 비싸지만 효율적이다.

## AURORA High Availability & READ Scaling
  3 AZ에 걸쳐 6개의 카피 데이터. (4/6 : for write, 3/6 : for read) -->?
  self healing! 30초 내 failover
  shared storage volume에 master instance가 Write 한다. (read도 당연 가능) 그럼 그 shared volume에서 다른 instance가 read한다.
  replica 는 1~15개

## Aurora security  
  RDS와 같은 엔진을 이용하기 때문에 security가 비슷하다. (IAM token)
  KMS , at resting
  SSL , in flight
  Automated back up, replica , snapshot 은 모두 보안 ㅇㅇ
  SSH 못한다.

## Aurora serverless
  실제 사용량에 따른 auto scaling을 한다.
  간헐적으로 들어오고 예측 불가능한 workload에 사용하기 좋다.
  capacity planning 안해도 된다. (cost efficient)
  proxy fleet

## Global Aurora
    1. aurora cross region read replicas : Disaster Recovery 에 좋다.
    2. aurora global DB
      하나의 주요 region (R/W)
      read only (5개) 다섯개의 secondary region..
      16개의 read replicas (region 당 16개의 read replicas)
      latency가 감소하게 도와준다.

# AWS Elastic Cache
in-memory DB, low latency
RDS랑 비슷, RDS for Cache
write/read scaling & multi AZ

USER
