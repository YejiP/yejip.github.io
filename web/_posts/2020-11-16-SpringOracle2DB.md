# Spring과 Oracle db 연결 - DB 설정

## **1. tomcat server.xml 의 포트를 바꿔준다. (oracle db랑 포트 번호가 겹쳐서)**

tomcat server.xml의 port 번호 바꿔준다. 기본 : 8080 => 사용자 설정 : 8089...

oracle이 8080(외부에서 접근)과 1521(내부에서 테이블 접근)를 사용하기 때문에 



# 인터페이스(.java)

- src/main/java에 package sesco.intern.guestbook2.dao
- 설계도를 만든다. 
- 우리는 방명록을 기록한 테이블을 만들 것이다. 
- param에 오라클 쪽으로 넘길 데이터를 넣는다. 그러면 이 정보를 **mapper가 guestbook.xml에서 mybatis가 넘겨준다.**
  return으로 몇개가 저장됐는지 나온다. 한개니까 1이 반환될 것이다.
- seqno(number), username(varchar2(30)), content(varchar2(3000)), pw(varchar2(30)), regdate(date)

```java
public interface GuestbookDao{
    public int insertGuest(GuestBookVO vo);
}
```

DAO: Database Access Object

# sql테이블 - Oracle SQL

- Oracle sql에 접속해 아래와 같이 테이블을 생성한다. 스프링에서는 insert update delete한다.

- 참고로 쿼리 문들은 증거물로 남겨놓는게 좋다.

```
drop table guestbook;
drop sequence guestbook_seq;

create table guestbook 
(
	seqno number constraint guestbook_no_pk primary key, 
	username varchar2(30) constraint guestbook_name_nn not null, 
	password varchar2(30),
	"content" varchar2(3000),
	regdate date default sysdate
);

create sequence guestbook_seq;

);
```

# GuestbookMapper.java

- sesoc.intern.guestbook2.dao 패키지
- sqlSession 은 db와 연결하는 동작을 해준다.

```java
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import sesoc.intern.guestbook2.vo.GuestBookVO;

@Repository
public class GuestbookMapper{
    //spring 에서 가지고 있다. root context에 보면 sql session 을 만든다. spring 에서 bean이 객체다.
    @Autowired
    SqlSession session;
    public int insertGuest(GuestBookVO vo) {
        System.out.println("데이터: " + vo.toString());
        //interface를 리턴해준다. reflection , 자바 고급기능중에 하나다.
        //reflection, 객체를 메모리에 올릴려고하면 new로하거나, static 선언, 아니면 reflection 하면 메모리에 올린다. 
        //implements 는 구현이 목적이면, 이건 좀 다른거.
        //guestbook.xml 에서 매퍼 그부분이랑 연결 getMapper!!
        GuestbookDao dao = session.getMapper(GuestbookDao.class);
        //여기서 vo를 넣는다. 성공하면 1이 리턴, 실패하면 0이 리턴
        int result = dao.insertGuest(vo);
        if(result == 0 ) {
            System.out.println("성공");
        } else {
            System.out.println("실패");
        }
        return result;
    }
}
```



interface 와 mapper 파일, or

마이바티스를 사용하기 위한 기본적인 자바 인터페이스는 SqlSession이다. 이 인터페이스를 통해 명령어를 실행하고 매퍼를 얻으며 트랜잭션을 관리 할 수 있다

5. **interface**에서 insertGuest 함수 만들어 param으로 타입 명시. (구현은 안한다. 그게 인터페이스니까.)

6. . (spring 프로그램 말고 잠시 oracle로)

7. GuestbookMapper.java 에서 interface를 .class로 받아서 (implements가 아니라) sessionsqlSession으로 정보를 넘긴다. 

인터페이스를 

- @Controller에서 받은 데이터를 mybatis와 연결해주는 클래스인 @Repository를 통해 전달한다.

- mybatis는 그럼 oracle db와 정보를 주고 받는다. 연동해주는 클래스는 sqlSession이다.