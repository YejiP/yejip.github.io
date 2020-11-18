# Spring과 Oracle db 연결 - DB 설정

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
