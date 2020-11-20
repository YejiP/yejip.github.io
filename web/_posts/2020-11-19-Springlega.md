JSTL 

Java

Tag 

library





1. project java 버전 바꾸기

2. Project facet에서 자바 버전 수정

3. pom.xml 에서 

   1. java 버전이랑 spring-context 버전 수정

   2. servelt-api, jsp-api 버전 수정 (mvnrepository) 에서

   3. ```
      <dependency>
          <groupId>javax.servlet</groupId>
          <artifactId>javax.servlet-api</artifactId>
          <version>4.0.1</version>
          <scope>provided</scope>
      </dependency>
      
      <!-- https://mvnrepository.com/artifact/javax.servlet.jsp/javax.servlet.jsp-api -->
      <dependency>
          <groupId>javax.servlet.jsp</groupId>
          <artifactId>javax.servlet.jsp-api</artifactId>
          <version>2.3.3</version>
          <scope>provided</scope>
      </dependency>
      ```

   4. 

```
<%@ %>
--> 페이지 지시자

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
```

@noargscons @ all args

@setter, @getter, @ tostring lombok에 있따. 

이걸 한번에 다 해주는게 @Data다.

서버쪽에서 가져온 데이터는 js와 연동하기 어렵다. 그래서 jstl 사용