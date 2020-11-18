

# 201121 에 완성될 문서입니다. 읽지마세요

## 1. tomcat server.xml 의 포트를 바꿔준다. (oracle db랑 포트 번호가 겹쳐서)

tomcat server.xml의 port 번호 바꿔준다. 기본 : 8080 => 사용자 설정 : 8089...

oracle이 8080(외부에서 접근)과 1521(내부에서 테이블 접근)를 사용하기 때문에 



## 2. 다음과 같은 네개의 **라이브러리**를 추가한다. 

```
ojdbc6.jar, mybatis.jar(3.4.6), mabatis-spring.jar(1.3.2), spring-jdbc.jar (4.3.6)
```

## 3. db.properties에서 java 에서 Oracle db에 접속/로그인 할 수 있는 정보, **Oracle SQL** 에서 db테이블을 만들어준다

## 4. xml 파일 세개를 만든다.

```
mybatis-config.xml : mybatis 프레임워크를 사용하게 해준다.
root-context.xml : db.properties를 읽어들인다.
guestbook.xml : 매퍼파일이다. 실제 쿼리문이 들어간다. 
```

interface 와 mapper 파일, or

마이바티스를 사용하기 위한 기본적인 자바 인터페이스는 SqlSession이다. 이 인터페이스를 통해 명령어를 실행하고 매퍼를 얻으며 트랜잭션을 관리 할 수 있다

5. **interface**에서 insertGuest 함수 만들어 param으로 타입 명시. (구현은 안한다. 그게 인터페이스니까.)

6. . (spring 프로그램 말고 잠시 oracle로)

7. GuestbookMapper.java 에서 interface를 .class로 받아서 (implements가 아니라) sessionsqlSession으로 정보를 넘긴다. 



- 

- 인터페이스를 

- @Controller에서 받은 데이터를 mybatis와 연결해주는 클래스인 @Repository를 통해 전달한다.

- mybatis는 그럼 oracle db와 정보를 주고 받는다. 연동해주는 클래스는 sqlSession이다.

# Spring과 Oracle db 연결 - library 추가

1.  (ojdbc___.jar 우리는 ojdbc6.jar 사용)

   2. web-inf안에  lib 폴더를 만든다.
   3. C:\oraclexe\app\oracle\product\11.2.0\server\jdbc\lib 여기에 들어간다.
   4. 여기에 있는 ojbdc6.jar를 spring 1번 lib에 복붙한다.

   아래서부터는 **pom.xml**에 등록하면 된다. 그럼 maven dependencies에 등록된다. 근데 oracle은 maven에 등록할 수 없다. license 정책이 까다로워서.. 그래서 위에 따로 저렇게 해준 것이다.

2. mybatis.jar : 3.4.6버전 https://mvnrepository.com/artifact/org.mybatis/mybatis/3.4.6 여기서 maven 버전. pom.xml 파일 	&lt;dependencies> 아래에 붙여넣기한다.

   https://mybatis.org/mybatis-3/ko/index.html 여기서 mybatis 3 다운로드

3. mabatis-spring.jar 1.3.2버전

4. spring-jdbc.jar 4.3.6

```xml
<org.springframework-version>4.3.6.RELEASE</org.springframework-version>


<!-- spring-jdbc -->
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-jdbc</artifactId>
<version>${org.springframework-version}</version> <!--윗줄을 따라-->
</dependency>
```

## db.properties 파일 생성

- main resources 안에 생성

  ```
  driver=oracle.jdbc.driver.OracleDriver
  url=jdbc:oracle:thin:@localhost:1521:XE
  user=hr
  password=hr
  ```

  driver은 자바에서 오라클에 접속하는거라서 그렇게 할 수 있는 클래스가 필요하다.
  
  jdbc:oracle:thin: 오라클에 접속할 수 있는 주소 @도메인:포트번호

# 세개의 xml 파일 만든다

- **모두 src/main/resources** 에 만든다. 

## mybatis-config.xml

- https://mybatis.org/mybatis-3/ko/getting-started.html

- mapper resource = "guestbook.xml" 으로 해준다.
- mybatis framework를 사용하기 때문에 연동해준다. mybatis 안 쓰고 jdbc 쓸 수 있는데, 보안상 문제 때문에 mybatis 한다. 
  - 연동 준비 : pom.xml 에다가 dependencies 세개 추가하는거 (이미 함)
  - 실제 연동 : mybatis-config.xml 에서 해준다. sqlSessionFactory를 통해서(이제 함)

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

## root-context.xml

- src main webapp web-inf spring 의 root-context.xml 

- db.properties 파일을 읽어들인다.

  ```
  <property name="location">
  	<value>classpath:db.properties</value>
  </property>
  ```

- 이건 선생님이 주신 코드 그대로

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

## guestbook.xml

- 실제 쿼리문이 들어가는 것이 매퍼이다. 

- &lt;mapper 이렇게 되어있고, select문이 있다.(사진으로 대체해보도록?)

- 매퍼에다가 java interface 클래스명을 namespace에 넣는다.

- 매퍼 안에는 태그가 있다. insert, select, update, delete. .

- insert가하는 일은, vo값을 전달받아 처리하고 int를 리턴해준다.

- insert id에는 interface에 있는 메소드명을 적어주고, resultType에는 처리하는 데이터의 타입명을 써준다(풀네임).

- #{}는 게터 호출하는 것이다.

- 매퍼파일 설정 : xml (실제 쿼리문들어가는 애들을 매퍼라고 부른다. xml파일) 이건 설정 파일이지 실제로 쿼리문이 실행되는 것이 아니다.

- 매퍼에서 받을 수 있는 이유가, 우리가 guestbook.xml에서

  ```
  <mapper namespace="sesoc.intern.guestbook2.dao.GuestbookDao">
  </mapper>
  ```

  ​																						이거를 넣어주기 때문이다.

  **전체 코드**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="sesoc.intern.guestbook2.dao.GuestbookDao">
    <insert id="insertGuest" resultType="sesoc.intern.guestbook2.vo.GuestBookVO">
        INSERT INTO GUESTBOOK
        (seqno, username, password, content)
        VALUES
        (guestbook_seq.nextval,#{username},#{password},#{content})
        </select>
</mapper>
```


