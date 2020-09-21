---
layout: post
title: WEB Basics
description: >
  저급 언어, 고급 언어, 컴파일링

  상위 언어 --(컴파일링)--> 어셈블리어 --(어셈블러)--> 기계어 --(논리소자)--> 기계작동
excerpt_separator: <!--more-->
---


# Web 기초

## 컴퓨터 언어

1. 저급 언어

*기계 중심의 언어.

기계어(0,1로 이루어짐), 어쎔블리어(기계어와 1:1 대응을 가지는 기호)

프로그램 유지 보수가 어렵다.*


2. 고급 언어

*사람 중심의 언어

웹 개발 관련 고급언어

Python (데이터 과학 뿐 아니라 웹개발에서도 사용)
PHP (웹의 80% 이상이 이 언어로 작성 )
JavaScript (원래는 브라우저에서만, 그치만 이제는 서버에서도)
JAVA (큰 규모의 소프트웨어 개발에 많이 사용된다.)
Ruby (빠른 개발에 사용, 단순하고 세련된 웹 만들기 가능하다.)*

## 웹의 동작 (HTTP의 이해)
HTTP(Hypertext transfer protocol)
웹 브라우저 ~ 웹 서버, 통신하기 위해서는 규약이 필요하다.
HTTP v0.9 (최초) ~ HTTP v2(현재)

HTTP v1.1 기준.
하나의 물리적 컴퓨터에는 여러가지 소프트웨어 서버가 동작 가능하다. 이 서버의 포트값은 달라야한다.
http 포트는 80

1. HTTP 의 작동 방식

HTTP 작동방식
- 서버/클라이언트 모델 (클라이언트가 서버에 요청하면 서버가 응답한다)
무상태(Stateless) 방식 :
    응답이 끝나고 나면 서버와 클라이언트의 연결이 끊긴다.
    같은 클라이언트가 연속해서 요청을 하더라도, 서버는 그게 같은 클라이언트인지 모른다.

    장)
    불특정 다수에게 서비스하기 좋다.
    클라이언트와 서버가 계속 연결돼있지 않기 때문에, 최대 연결수보다 더 많은 요청과 응답 처리 가능.

    단)
    클라이언트의 이전 상황을 모른다. (난 분명 장바구니에 청바지 담았는데 결제누르니까 사라짐.)
    그래서 쿠키가 등장

-URL (Uniform Resource Locator)
  세부분으로 나누어짐
  접근 프로토콜://IP주소나 도메인 이름/문서경로/문서이름
  http        ://www.yejip.com     /docs   /Webbasics/


2. HTTP 프로토콜의 요청/응답 데이터 포맷
### HTTP 요청 메세지
크게 세부분으로 나뉨
    요청 헤더
    (빈줄)
    요청 바디

예시
    GET /servlet/query?a=10&b=90 HTTP/1.1
    Host: www.sk.com
    user-agent: mozilla/4.0
    Accept-language: kr


자세히
  요청 헤더
    GET          /servlet/query?a=10&b=90 HTTP/1.1
    요청 method     요청URI(자원 위치)      프로토콜 버전
    Host: www.sk.com
    user-agent: mozilla/4.0
    Accept-language: kr

  빈줄
      빈줄이다.

  요청 바디
    빈칸 (GET 방식은 요청 바디가 없다. URI에서 가져가서)

### HTTP 응답 메세지
크게 세부분으로 나뉨
  응답 헤더
  (빈줄)
  응답 바디

예시
    HTTP/1.1 200 OK
    Date:
    Server:
    Last-Modified:
    Content-Length:
    Content-Type:


요청 메소드
    GET : 정보를 요청하기 위해서 사용. (SELECT)
    POST : 정보를 밀어넣기 위해서 사용. (INSERT)
    PUT : 정보를 *업데이트* 하기 위해서 사용. (UPDATE)
    DELETE : 정보를 삭제하기 위해서 사용. (DELETE)
    HEAD : (HTTP)헤더 정보만 요청, (해당 자원이 존재하는지 혹은 서버에 문제가 없는지를 확인하기 위해서 사용)
    OPTIONS : 웹서버가 지원하는 메서드의 종류를 요청
    TRACE : 클라이언트의 요청을 그대로 반환한다. (서버 상태 확인 목적)

