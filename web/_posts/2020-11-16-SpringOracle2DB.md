---
layout: post
category: web
tags: spring
---
# Spring과 Oracle DB 연결 - 구현

![dbCode](https://user-images.githubusercontent.com/37058233/99866789-61a43500-2bf7-11eb-9ac3-9695692e7178.PNG)



# guestBookVO.java

<img width="441" alt="1116sp11" src="https://user-images.githubusercontent.com/37058233/99865540-d1152700-2bed-11eb-9a04-6c54af0267ad.PNG">

- 위 정보를 담을 수 있는 VO객체를 생성한다. (pw = password, text = content 이다.)
- lombok은 getter와 setter, 생성자 등을 만들어주는 라이브러리다. 사용자가 추가해야한다. 그거에 관한 것은 다음 포스트에서...

```java
package sesoc.intern.guestbook2.vo;
import lombok.Data;
@Data
public class GuestBookVO {
	private int seqno;
	private String username;
	private String password;
	private String content;
	private String regdate;
}
```

# guestbookDao.java - interface

- src/main/java에 package sesco.intern.guestbook2.dao 폴더를 생성해 넣어준다.
- interface에서는 함수명과 반환타입을 정해주지만 코드가 구현되어있지는 않다. (함수의 구현은 mapper 파일인 **guestbook.xml 에서 sql 언어로 구현**되었다.)

```java
package sesoc.intern.guestbook2.dao;
import java.util.List;
import java.util.Map;
import sesoc.intern.guestbook2.vo.GuestBookVO;
public interface GuestbookDao {
	public int insertGuest(GuestBookVO vo);
	public List<GuestBookVO>  selectAll();
	public int delete(Map<String,Object> map);
}
```

* 참고 _ DAO는 Database Access Object라는 뜻이다.

# guestbook.xml

- 저번에 만든 파일(- library 편)에 드디어 코드를 넣는다.!

- interface에서 선언만 해놓은 함수를 guest.xml 파일에서 구현한다.

  ![daoGuestbook](https://user-images.githubusercontent.com/37058233/99536221-69908900-29ed-11eb-874b-c2b0b99f222f.PNG)

- 매퍼에다가 java interface 클래스명을 namespace에 넣는다.

- 매퍼 안에는 태그가 있다. insert, select, update, delete.

- insert id에는 interface에 있는 메소드명을 적어주고, resultType에는 처리하는 데이터의 타입명을 써준다(풀네임).

- **#{}는 게터 호출하는 것**이다. mapper파일에서는 ${}이렇게 불러오는게 아니라 #{}이렇게 불러온다.

- commit은 my batis가 자동으로 해서 넣지 않아줘도 된다.

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- 자바 인터페이스 클래스 명을 namespace에 넣음 -->
<mapper namespace="sesoc.intern.guestbook2.dao.GuestbookDao">
    <insert id="insertGuest" parameterType="GuestBookVO">
        INSERT INTO GUESTBOOK
        (seqno, username, pwd, text)
        VALUES
        (guestbook_seq.nextval, #{username}, #{password}, #{content})
    </insert>
    <select id ="selectAll" resultType = "GuestBookVO">
        SELECT
        seqno,
        username,
        pwd as password,
        text as content,
        to_char(regdate,'YYYY-MM-DD' ) as regdate
        FROM GUESTBOOK
        ORDER BY seqno DESC
    </select>
</mapper>
```

# GuestbookMapper.java -@Repository

- sesoc.intern.guestbook2.dao 패키지 안에 만들어준다.
- GuestbookMapper.java 에서 interface를 .class로 받아서 (implements가 아니라) sessionsqlSession으로 정보를 넘긴다. (sqlSession 은 DB와 연결하는 동작을 해준다.)

```java
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import sesoc.intern.guestbook2.vo.GuestBookVO;
@Repository
public class GuestbookMapper{
    @Autowired
    SqlSession session;
    public int insertGuest(GuestBookVO vo) {
        System.out.println("데이터: " + vo.toString());
        //interface를 리턴해준다. reflection , 자바 고급기능중에 하나다.더 알아보기
        GuestbookDao dao = session.getMapper(GuestbookDao.class);
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



다음 포스트에서 계속...
