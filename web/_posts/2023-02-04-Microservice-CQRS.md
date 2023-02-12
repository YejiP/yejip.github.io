---
layout: post
category: web
tags: netcore
title: CQRS Social Media Project 분석
description:  >
  Udemy 영상인 .NET Microservices: CQRS & Event Sourcing with Kafka를 정리한 포스트입니다. 작성 중 입니다. (2023/2/11)
---

[CQRS란?](#cqrs란?)

[Social Media CQRS 프로젝트와 폴더 구성](#project-description)

[CQRS 흐름 정리](#cqrs-flow)

## CQRS란?
- Command and Query Responsibility Segregation, 즉 Command(Create, Update, and Delete) 와 Query(Read)를 분리해 처리해주는 것.
  - Create, Update, Delete 리퀘스트가 들어왔을 때, Aggregate의 상태가 변화하게된다. 상태 변화가 변화될 때, 이벤트를 발생시켜서 이를 EventStoreCollection DB에 저장하고, kafka에 이벤트를 발행시킨다. kafka에 발행된 Query쪽의 Consumer가 Query DB를 만들 때 사용된다.
  - Read 리퀘스트가 들어왔을 때, Query DB에서 읽어서 클라이언트에게 반환한다.

## Project Description

- 간단한 social media프로젝트를 CQRS형식으로 구현한다. 자세한 내용은 [Udemy](https://www.udemy.com/share/106Pe23@SxkI_3qlTuNzuUyKG24wUSKRR1O-380c1mK9CX3658JxydP3mj2IhKtDATFiwZaOkQ==/)에서..

  <img width="1243" alt="image" src="https://user-images.githubusercontent.com/37058233/218257962-0f166063-3327-42e8-a014-b1f638aedfae.png">

- 폴더 스트럭쳐는 다음과 같다.

  - CQRS-ES/CQRS.Core에는 Abstract클래스나 Interface가 있다. 이를 SM-POST에서 상속해서 사용한다.
  - SM-POST/Cmd는 CUD에 대한 요청을 처리해, Cmd DB에 정보를 저장하고, kafka에 event를 produce하게 한다.
  - SM-POST/Query는 R에 대한 요청을 처리해, Query DB에서 읽어온 정보를 클라이언트에게 반환한다. 또한, kafka에 프로듀스된 이벤트를 consumer를 통해 Query DB에 저장한다.

<img width="897" alt="image" src="https://user-images.githubusercontent.com/37058233/218254498-74b0b77a-49c3-473e-b742-33f258f3ba93.png">

## CQRS Flow

### Create, Update, Delete에 대한 요청이 들어왔을 때

[CUD 요청 시 더 자세한 흐름 보기 - 클릭](https://yejip.com/web/2023-02-12-Microservice-CQRS-Command)

<img width="1482" alt="image" src="https://user-images.githubusercontent.com/37058233/218307673-1d8841c3-c3f9-4e48-b39c-3174c4442bb4.png">

### **앞서 Kafka에 produce된 event를 consumer를 이용해 Query DB에 저장하기**

1. ConsumerHostedService를 통해 EventConsumer의 consume이 유발된다. => 이 부분 확실히는 모르겠다.
2. EventConsumer은 Kafka queue에 있는 Json데이터를 받아 deserialize해 event정보를 읽어 EventHandler에 넘겨준다.
3. 이 이벤트 정보가 EventHandler에 등록이 돼있으면, event object를 생성해 handler method를 invoke한다.
4. EventHandler에서 이벤트 정보를 받아서 comment, post repository를 통해 post와 comment가 query DB에 생성된다.

### **Read에대한 요청이 들어왔을 때**

1. **@PostLookUpController** 클라이언트에서 들어오는 요청에 따라 FindAllPostsQuery, FindPostByIdQuery, FindPostsByAuthorQuery, FindPostsWithCommentsQuery, FindPostsWithLikesQuery 객체를 생성한다.  
2. **@PostLookUpController** 요청에 따라 만들어진 커맨드 객체를 QueryDispatcher로 보낸다.
3. **@QueryDispatcher** Handler Dictionary를 통해 커맨드를 QueryHanlder의 아규먼트로 넘겨준다. 
   1. 이 Handler Dictionary는 프로그램이 시작될 때, Query/Program.cs에서 Dispatcher의 RegisterHandler 메소드를 통해 key(쿼리 타입): value(QueryHandler.HandleAsync 함수) 페어로 저장된다.
   2. Dispatcher에 커맨드가 컨트롤러를 통해 넘어 올 경우, 쿼리가 QueryHandler.HandleAsync의 아규먼트로 넘어간다.
4. **@QueryHanlder** post, comment repository가 DB에서 요청된 정보를 조회해 PostEntity에 담아 리턴해준다.(post와 comment repository는 query 쪽에서만 쓰인다. command쪽에서는 event store repository가 사용됨.)
5. 반환된 PostEntity정보로 NormalResponse를 리턴한다. 컨트롤러에서 이를 클라이언트로 보낸다.

## 깊게 알아보기 (추가 예정)

**CQRS-ES/CQRS.Core**

- Commands, Queriees, Domain, Messages, Handlers, Events, Infastructure, Producers, Consumers

**SM-POST**

- Common
  - DTO
  - Events
- Query
  - Api
    - Queries
    - DTO
    - Controllers
  - Domain
    - Entity
    - Repositories
  - Infrastructure
    - Dispatcher
    - Handler
    - Repositories
    - Data Access
    - Consumer
- Cmd
  - Api
    - Commands
    - DTO
    - Controllers
  - Domain
    - Aggregates
  - Infrastructure
    - Dispatcher
    - Handler
    - Repositories
    - Stores
    - Producer
