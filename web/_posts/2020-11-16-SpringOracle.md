---
layout: post
category: web
tags: spring
---
# Spring과 Oracle DB 연결 - 흐름

```
목표 : Mybatis 프레임을 통해 spring과 Oracle DB를 연결한다.
주의 : 초보자의 눈으로 본 흐름이다. (아래 그림은 클래스 다이어그램과 하등 상관없다)
```

- 어렵지는 않은데 복잡하다. 할 수 있 다 는 뜻이다. 어쨌든 이 글에서 방명록 spring 프로젝트와 db를 어떻게 연결해야하는지에  알아보도록 할 것이다.
- 전체적인 그림은 다음과 같다. 앞으로 자세하게 알아보도록 한다.



![flow](https://user-images.githubusercontent.com/37058233/99527961-eff29e00-29e0-11eb-9c54-795f075f4518.PNG)

# Intro

Oracle db와 spring 을 연결하기 위해서는 여러 환경 설정과 다음과 같은 파일들이 필요하다. [참고문서](https://mybatis.org/mybatis-3/ko/java-api.html)

- **db.properties** : Oracle db에 연결할 수 있는 정보를 담은 파일

  ```
  driver=oracle.jdbc.driver.OracleDriver
  url=jdbc:oracle:thin:@localhost:1521:XE
  user=hr
  password=hr
  ```

- **root-context.xml** : db.properties를 읽어 값 세팅,mybatis의 sqlsession 객체를 가져옴

- **mybatis-config.xml** : mybatis에게 guestbook.xml이 mapper라는 정보를 준다.

  ```xml
  <!--예시, full code 아님.-->
  <configuration>
      <mappers>
          <mapper resource="guestbook.xml" />
      </mappers>
  </configuration>
  ```

- **guestbook.xml** : 쿼리문이 들어간 mapper 파일로서, java interface의 함수를 query문으로 구현한 느낌을 주는 파일이다.

  ```xml
  <!--예시, full code 아님.-->
  <mapper namespace="sesoc.intern.guestbook2.dao.GuestbookDao">
      <insert id="insertGuest" parameterType="GuestBookVO">
          INSERT INTO GUESTBOOK
          (seqno, username, pwd, text)
          VALUES
          (guestbook_seq.nextval, #{username}, #{password}, #{content})
      </insert>
  ```

- **guestbookDao.java** : DB에 저장될 데이터를 처리할 함수 이름이 있는 interface다.

- **guestbookMapper.java** : @Repository 객체다. interface를 .class로 가져와 그것의 함수를 사용한다.

- **guestbookController.java** : @Controller 객체다.  guestbookMapper를 객체로 만들어 이용한다.

- **guestBookVO.java** : DB에 저장될 데이터를 value object로 표현한 것이다.

# flow

## **Oracle SQL 정보를 root-context.xml에 넘김**

- **db.properites** 에 oracle SQL 에 접근할 수 있는 정보가 들어있다. 이 파일을 **root-context.xml**에 넣어주면 spring 프로젝트에서 oracle SQL에 접근할 수 있다.

![dbflow](https://user-images.githubusercontent.com/37058233/99527963-f08b3480-29e0-11eb-92e1-2102fda5b247.PNG)

## **mybatis를 통해 java obj와 SQL 자동 매핑**

![mybatisflow](https://user-images.githubusercontent.com/37058233/99527964-f123cb00-29e0-11eb-9a02-02ec2a5764bc.PNG)

- mybatis는 java 객체와 SQL 객체가 자동매핑할 수 있게 도와주는 프레임워크다.

- 이때 **guestbookDao.java** 가 인터페이스로 중요한 역할을 한다.

- **guestbookDao.java** 파일의 함수가 호출되면 이 함수와 매치되는 **guestbook.xml**의 쿼리문이 실행되는 느낌이다. 따라서 SQL에 접근할 수 있게 된다.

  ![daoGuestbook](https://user-images.githubusercontent.com/37058233/99536221-69908900-29ed-11eb-874b-c2b0b99f222f.PNG)

## **java 파일에서 guestbookDao 인터페이스를 이용해 DB 접근**

![javaflow](https://user-images.githubusercontent.com/37058233/99527958-eec17100-29e0-11eb-9698-9ff87f103993.PNG)

- **guestbookMapper**인 repository 객체 에서 **guestbookDao** 인터페이스를 사용한 함수를 만들어 데이터를 전달한다.

  ```java
  @Autowired
  GuestbookMapper dao;
  public List<GuestBookVO> selectAll() {
      GuestbookDao dao = session.getMapper(GuestbookDao.class);
      List<GuestBookVO> list = dao.selectAll();
      return list;
  }
  ```

- **GuestbookController**에서 **guestbookMapper**의 객체를 만들어 데이터를 저장하고 읽는 등의 행위를 한다.

  ```java
  @Autowired
  GuestbookMapper gm;
  @RequestMapping("/list")
  public String list(Model model) {
      List<GuestBookVO> list = gm.selectAll();
      model.addAttribute("list",list);
      return "list";
  }
  ```

다음 편에서 더 자세하게 알아보도록 한다... 힘들쓰
