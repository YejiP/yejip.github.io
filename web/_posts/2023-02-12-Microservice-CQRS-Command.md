---
layout: post
category: web
tags: netcore
title: CUD 요청 시 이벤트가 DB에 저장되고 Kafka에 발행되는 자세한 흐름
description:  >
  Udemy 영상인 .NET Microservices: CQRS & Event Sourcing with Kafka를 정리한 포스트입니다. 작성 중 입니다. (2023/2/11)
---

<img width="1482" alt="image" src="https://user-images.githubusercontent.com/37058233/218307673-1d8841c3-c3f9-4e48-b39c-3174c4442bb4.png">

1. **@CommandController** 클라이언트에서 들어오는 들어오는 요청에 따라 NewPostCommand, EditMessageCommand, AddCommentCommand, EditCommentCommand, LikePostCommand, RemoveCommentCommand, DeletePostCommand의 커맨드 객체를 만든다.

2. **@CommandController** 요청에 따라 만들어진 커맨드 객체를 Dispatcher로 보낸다.

3. **@CommandDispatcher** Handler Dictionary를 통해 커맨드를 CommandHandler의 아규먼트로 넘겨준다. 

   1. 이 Handler Dictionary는 프로그램이 시작될 때, Command/Program.cs에서 Dispatcher의 RegisterHandler 메소드를 통해 key(커맨드 타입): value(commandHandler.HandleAsync 함수) 페어로 저장된다.
   2. Dispatcher에 커맨드가 컨트롤러를 통해 넘어 올 경우, 커맨드가 commandHandler.HandleAsync의 아규먼트로 넘어간다.

4. **@CommandHandler**

   1. post를 새로 생성하는 경우에는, PostAggregate객체를 생성한다.
   2. post를 수정하거나, 삭제하거나, 커멘트에 관한 커맨드인 경우, EventSourcingHandler에서 getByIdAsync로 PostAggreate를 불러온다

5. **@CommandHandler** 4번에서 불러온 PostAggregate의 커맨드에 상응하는 메소드가 실행된다.

   Ex1) EditMessageCommand일 경우, PostAggregate.EditMessage(message)가 실행된다. 

   Ex2) CommentAddedEvent일 경우, PostAggregate.AddComment(comment, username)이 실행된다. 

6. **@PostAggregate** 메소드가 실행될 때, 커맨드가 실행되었다는 알림 event가 생성되고 부모클래스인 AggregateRoot의 RaiseEvent의 아규먼트로 이벤트가 전달된다.

7. **@PostAggregate** RaiseEvent에서 event를 아규먼트로 받아 ApplyChange 함수가 실행된다. 그러면 이벤트가 changes에 저장된다. 

8. **@CommandHandler** PostAggregate의 함수가 실행된 후, PostAggregate를 Event Sourcing Handler의 saveAsync 메소드의 아규먼트로 전달한다. 

9. **@EventSourcingHandler** EventStore의 SaveAsync가 실행된다. 

   ​	여기서 중요한 일 두가지가 일어난다.

   1. **@EventStore** repository를 통해 uncommited change들이 Event Store DB에 저장된다.
   2. **@EventStore** EventProducer가 **kafka에 json형식으로 이벤트를 정보를 넘긴다.**

10. 마지막으로 **@EventSourcingHandler**, aggregate.MarkChangesAsCommitted();로 change가 반영됐음을 표시해준다.

