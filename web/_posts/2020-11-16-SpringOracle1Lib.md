# Spring과 Oracle DB 연결 - library 추가

- 이 글에선 아래 빨간 박스안에 있는 파일들을 어떻게 설정하고 만드는지를 볼 것이다.설정을 먼저 할 것이다. 

![flow](https://user-images.githubusercontent.com/37058233/99798001-95d61200-2b73-11eb-811d-e63f5b08efeb.PNG)



# 1. sql테이블 - Oracle SQL

- 방명록은 아래와 같은 구성을 가지고 있다. 

  ![guestbook](https://user-images.githubusercontent.com/37058233/99865796-98764d00-2bef-11eb-81e7-f86060ccd86b.PNG)

- 수정은 pw를 입력하면 할 수 있게 한다.


![guestbookPw](https://user-images.githubusercontent.com/37058233/99865734-39183d00-2bef-11eb-8f16-0ae3201815ff.PNG)

- 위와 같은 정보를 저장할 수 있는 sql 테이블은 다음과 같다.

  <img width="441" alt="1116sp11" src="https://user-images.githubusercontent.com/37058233/99865540-d1152700-2bed-11eb-9a04-6c54af0267ad.PNG">

- ## **테이블 생성**

- Oracle sql에 접속해 아래와 같이 테이블을 생성한다.

- 참고로 쿼리 문들은 증거물로 남겨놓는게 좋다. (main/resource에 guestbook.sql)

```sqlite
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
rollback();
```

- ## **tomcat server.xml 포트 바꾸기**

- oracle db랑 포트 번호가 겹친다. 8080(외부에서 접근)과 1521(내부에서 테이블 접근)를 사용

-  tomcat server.xml의 port 번호 바꿔준다. 기본 : 8080 => 사용자 설정 : 8089(사용되고 있지 않은 아무 포트)

<img width="211" alt="1116sp13" src="https://user-images.githubusercontent.com/37058233/99865993-08390780-2bf1-11eb-9772-0e5d7df18309.PNG"><img width="484" alt="1116sp14" src="https://user-images.githubusercontent.com/37058233/99865992-07a07100-2bf1-11eb-979b-b39fe80684d5.PNG">

# 2. db.properties 파일 생성

- db.properties는 java 에서 Oracle db에 접속/로그인 할 수 있는 정보가 있는 파일이다.

- src/main/resources 안에 생성 <img width="137" alt="1116sp7" src="https://user-images.githubusercontent.com/37058233/99800287-75a85200-2b77-11eb-9328-ef65f991205e.PNG" style ="float : center">

- db.properties 파일을 새로 만들고 , 아래 코드를 넣어준다. (자신이 설정한 username과 pw 넣으면 된다.)

  ```
  driver=oracle.jdbc.driver.OracleDriver
  url=jdbc:oracle:thin:@localhost:1521:XE
  user=hr
  password=hr 
  ```

- driver에는 자바에서 오라클에 접속하게 도와주는 클래스를 넣는다.

- jdbc:oracle:thin: 오라클에 접속할 수 있는 주소 @도메인:포트번호
- user과 pw에는 오라클 db에서 설정한 id와 pw 넣으면 된다.

# 3. xml 파일에 라이브러리를 추가

- 다음 네가지 라이브러리를 추가하려고 한다. 넷 중 ojbc6.jar 만 살짝 다르고 나머지 셋은 거의 똑같은 방법으로 추가할 수 있다.

```
ojdbc6.jar, mybatis.jar(3.4.6), mabatis-spring.jar(1.3.2), spring-jdbc.jar (4.3.6)
```

## **ojdbc6.jar 추가**

<img width="169" alt="1116sp7-2" src="https://user-images.githubusercontent.com/37058233/99801238-092e5280-2b79-11eb-8aa0-bcbf653877e1.PNG" style = "float : left">  1 .  web-inf안에  lib 폴더를 만든다.

  2 . C:\oraclexe\app\oracle\product\11.2.0\server\jdbc\lib 여기에 들어간다.

  3 . 여기에 있는 ojbdc6.jar를 spring 1번 lib에 복붙한다.







<img width="166" alt="1116sp7-4" src="https://user-images.githubusercontent.com/37058233/99799858-b784c880-2b76-11eb-9d0a-1b110eb11b96.PNG" style = "float : left"> - oracle은 license 정책이 까다로워서 maven에 등록할 수 없다. 그래서 이렇게 해주었고, **나머지 세개의 library 들은 그냥 pom.xml에 등록하면 된다.** 그럼 자동으로 maven dependencies에 생긴다.





## **mybatis.jar(3.4.6) 추가**

1 . (https://mvnrepository.com/artifact/org.mybatis/mybatis/3.4.6)[https://mvnrepository.com/artifact/org.mybatis/mybatis/3.4.6]여기서 mybatis.jar 3.4.6버전을 검색해 들어가  maven 버전 코드를 복사한다.

<img width="492" alt="1116sp9" src="https://user-images.githubusercontent.com/37058233/99802883-d174da00-2b7b-11eb-893d-ed77269e4e7f.PNG">

2 . pom.xml 파일 	&lt;dependencies> 아래에 붙여넣기한다.

<img width="408" alt="1116sp8" src="https://user-images.githubusercontent.com/37058233/99802690-76db7e00-2b7b-11eb-80f0-cea37bf5a75c.PNG">

```xml
<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.4.6</version>
</dependency>
```

## **mybatis-spring.jar(1.3.2) 추가**

- 위와 마찬가지로 검색해 찾아서 pom.xml dependencies 안에 붙여넣는다. 

```xml
<!-- mybatis-spring -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>1.3.2</version>
</dependency>
```

## **spring-jdbc.jar(4.3.6) 추가**

- 이하 동문
- 여기서 version을 직접 4.3.6이라고 주는 것 보다, &lt;org.springframework-version>의 태그에 담긴 정보를 사용해서 ${org.springframework-version} 이렇게 주는 것이 더 좋다. spring 버전이 바뀌면 spring-jdbc 라이브러리 버전도 함께 바뀌게 된다.

```xml
<org.springframework-version>4.3.6.RELEASE</org.springframework-version>
<!-- spring-jdbc -->
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-jdbc</artifactId>
<version>${org.springframework-version}</version> <!--윗줄을 따라-->
</dependency>
```

# 4.세개의 xml 파일 만든다

```
mybatis-config.xml : mybatis에게 guestbook.xml이 mapper라는 정보를 준다.  
root-context.xml : db.properties를 읽어 값 세팅,mybatis의 sqlsession 객체를 가져옴
guestbook.xml : 쿼리문이 들어간 mapper 파일로서, java interface의 함수를 query문으로 구현한 느낌을 주는 파일이다.
```

## **mybatis-config.xml**

- mybatis framework를 사용하기 위해 연동해준다. jdbc는 보안상 문제 때문에 mybatis 이용. 
  - **연동 준비** : pom.xml 에다가 dependencies 세개 추가하는거 (2번에서 함)
  - **실제 연동** : mybatis-config.xml 에서 해준다.(이제 함)
- https://mybatis.org/mybatis-3/ko/getting-started.html
- **mybatis-config.xml 에서 mapper resource 로 "guestbook.xml" 사용** (흐름을 머릿속에 두고 보기. 기억 안나면 -흐름 편 으로 돌아가세요)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <mappers>
        <mapper resource="guestbook.xml"/> 
    </mappers>
</configuration>
```

## **guestbook.xml**

- 바로 위에서 mapper resource로 지목됐다. 
- 실제 쿼리문이 들어가는 것이 매퍼이다. 이건 설정 파일이지 실제로 쿼리문이 실행되는 것이 아니다.
- 일단 파일만 만들어 놓고, 내용은 다음 시간에 interface와 vo 클래스를 구현한 후에 넣기로 한다.

## **root-context.xml**

<img width="176" alt="1116sp7-3" src="https://user-images.githubusercontent.com/37058233/99799864-b9e72280-2b76-11eb-8987-2fddcf71b224.PNG" style = "float : right"> 1 .  src main webapp web-inf spring 의 root-context.xml 

 

2 . db.properties 파일을 읽어들여 값 세팅,mybatis의 sqlsession 객체를 가져옴 











- mybatis를 사용하기 위한 기본적인 자바 인터페이스는 SqlSession이다. 이 인터페이스를 통해 명령어를 실행하고 매퍼를 얻으며 트랜잭션을 관리 할 수 있다
- 

```xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- db.properties 읽어오기 -->
    <bean
          class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
        <property name="location">
            <value>classpath:db.properties</value>
        </property>
    </bean>

    <!-- db.properties의 설정 값을 읽어서 setting -->
    <bean id="dataSource"
          class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="${driver}" />
        <property name="url" value="${url}" />
        <property name="username" value="${user}" />
        <property name="password" value="${password}" />
    </bean>

    <!-- 트랙잭션 관리를 위한 빈설정 -->
    <bean id="transactionManager"
          class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource" />
    </bean>

    <!-- sqlSessionTemplete -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource" />
        <property name="configLocation" value="classpath:mybatis-config.xml" />
    </bean>
    <!-- sqlSession -->
    <bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
        <constructor-arg index="0" name="sqlSessionFactory"
                         ref="sqlSessionFactory" />
    </bean>
</beans>
```



다음 시간엔 설정 보다는 코드 부분을 보도록 할 것이다. 그럼 이만..