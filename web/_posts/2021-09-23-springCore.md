---
layout: post
category: web
tags: spring
---
# Spring Core

## IoC/DI 컨테이너

new - Maven Project - apache maven archetypes - quickstart 로 프로젝트 만들어준다.

**pom.xml 파일**

- properties 안에 변수를 다음과 같이 설정할 수 있다.

  ```xml
  <properties>
      <spring.version>4.3.30.RELEASE</spring.version>
  </properties>
  ```

- 위 코드에 있는 spring.version에 들은 값은 xml 파일에서 ${spring.version}로 꺼내 쓸 수 있다.

  ```xml
  <properties>
      <spring.version>4.3.30.RELEASE</spring.version>
  </properties>

  <!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
  <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>${spring.version}</version>
  </dependency>
  ```



# IoC/DI 실습

- 보통 자바 코드를 짤 때 객체를 메모리에 올릴 때 다음과 같은 코드를 쓴다.

```java
Car car = new Car();
```

- 그러나 **spring 에서는 컨테이너가 객체를 대신 생성해준다**.  여러가지 방법이 있는데, xml 파일로 설정하는 두가지 방법과 config 파일로 하는 한가지 방법을 알아볼 것이다.

src main 안에 resource를 저장할 폴더를 만든다. 여기에, applicationContext.xml 파일로 어떤 파일을DI시켜야하는지에 정보를 넣어준다.

## 1. xml파일을 이용한 설정 1

- UserBean 을 xml을 통해 객체화 시키기.

  <img src= "https://user-images.githubusercontent.com/37058233/134593007-ca24aecb-cac8-40c0-878f-ccac8b47ebca.png" width= 300px;><img src="https://user-images.githubusercontent.com/37058233/134591753-90a896a5-638d-4158-b2bf-25fd228db979.png" width=250px>

  1. UserBean.java 정의 하기

     - bean은 자바 클래스를 의미하는데, 다음과 같은 특징을 가져야한다.
       1. 기본 생성자를 가지고 있다.
       2. 필드는 private하게 선언한다.
       3. getter, setter 메소드를 가진다. getName() , setName() 메소드를 name 프로퍼티라고 한다.

     ```java
     package kr.or.connect.diexam01;
     public class UserBean {
         private String name;
         public UserBean() {}
         public  UserBean(String name) {
             this.name=name;
         }
         public String getName() {
             return name;
         }
         public void setName(String name) {
             this.name = name;
         }
     }
     ```

  2. src/main/resources/applicationContext.xml 에 UserBean을 메모리에 알아서 올리게끔 적어주기

     - kr.orconnect.diexam01패키지에 있는 UserBean 자바파일을 클래스로 만들고, userBean에 할당

     ```xml
     <bean id="userBean" class="kr.or.connect.diexam01.UserBean"></bean>
     ```

     - 전체 코드

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

         <bean id="userBean" class="kr.or.connect.diexam01.UserBean"></bean>

     </beans>
     ```

  3. ApplicationContextExam01.java에서 src/main/resources/applicationContext.xml를 가져와 실행해 컨테이너가 UserBean의 메모리를 할당할 수 있게 하기.

     - applicationContext.xml이  들어있는 src/main/resources/는, 자동으로 클래스패스에 등록된다.

     ```java
     public class ApplicationContextExam01 {
         public static void main(String[] args) {
             ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
             System.out.println("DONE!");
             UserBean userBean = (UserBean)ac.getBean("userBean");
             userBean.setName("park");
         }
     }
     ```

     - 스프링 어플리케이션 컨텍스트, 객체 생성시 싱글톤 패턴을 이용한다. 사용자가 getBean 으로 클래스를 반복해서 요청한대도, 개체를 새로 만들어수 주기보다는, 하나 만들어 놓은 걸 계속 준다.

     ```java
     import org.springframework.context.ApplicationContext;
     import org.springframework.context.support.ClassPathXmlApplicationContext;
     public class ApplicationContextExam01 {
         public static void main(String[] args) {
             ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
             System.out.println("DONE!");

             UserBean userBean = (UserBean)ac.getBean("userBean");
             userBean.setName("park");
             System.out.println(userBean.getName()); //park 출력

             UserBean userBean2 = (UserBean)ac.getBean("userBean");
             if(userBean == userBean2) {
                 System.out.println("It is the same instance"); //출력됨.
             }

             userBean2.setName("asdf"); //getBean 명령어를 또 이용해 객체를 받음.
             System.out.println(userBean2.getName()) //asdf 출력
             System.out.println(userBean.getName()); //!!! 얘도 asdf출력
         }
     }
     ```

## 2. xml파일을 이용한 설정 2 - 의존성 주입

1. Car.java , Engine.java 파일 먼저 만들기

2. src/main/resources/applicationContext.xml 에 car, engine 알아서 메모리에 올리게 정보 입력해주고, 의존성도 입력해준다.

   ```xml
   <!--의존성 표현은 다음과같이 해준다. car 클래스 안에 e를 리퍼런스하는 engine 이라는 변수 생성.-->
   <bean id="c" class="kr.or.connect.diexam01.Car">
           <property name="engine" ref="e"></property>
       </bean>
   ```

   - 전체

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
       <bean id="userBean" class="kr.or.connect.diexam01.UserBean"></bean>

       <bean id="e" class="kr.or.connect.diexam01.Engine"></bean>
       <bean id="c" class="kr.or.connect.diexam01.Car">
           <property name="engine" ref="e"></property>
       </bean>
   </beans>
   ```

3. ApplicationContextExam01.java에서 src/main/resources/applicationContext.xml를 가져와 실행해 컨테이너가 UserBean의 메모리를 할당할 수 있게 하기.

   ```java
   package kr.or.connect.diexam01;
   import org.springframework.context.ApplicationContext;
   import org.springframework.context.support.ClassPathXmlApplicationContext;
   public class ApplicationContextExam02 {
       public static void main(String[] args) {
           // TODO Auto-generated method stub
           ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
           //object 타입으로 반환되기 때문에, type cast를 꼭 해줘야한다.
           Car car = (Car) ac.getBean("c");
           car.run();
       }
   }
   ```

## 3. Java Config를 이용한 설정

- 자바 파일 두개가 사용된다. (car, engine 제외하고)

  1. **ApplicationConfig.java**

     - @Configuration 클래스 위에 붙으면, config 파일.
     - @Bean 이 메소드 위에 붙으면, 자바 객체라는걸 알려줌

     ```java
     package kr.or.connect.diexam01;
     import org.springframework.context.annotation.Bean;
     import org.springframework.context.annotation.Configuration;
     @Configuration
     public class ApplicationConfig {
         @Bean
         public Car car(Engine e){
             Car c = new Car();
             return c;
         }

         @Bean
         public Engine engine() {
             return new Engine();
         }
     }
     ```

  2. ApplicationContextExam03.java

     ```java
     package kr.or.connect.diexam01;
     import org.springframework.context.ApplicationContext;
     import org.springframework.context.annotation.AnnotationConfigApplicationContext;
     import org.springframework.context.support.ClassPathXmlApplicationContext;
     public class ApplicationContextExam03 {
         public static void main(String[] args) {
             // TODO Auto-generated method stub
             //ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
             ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class);
             //Car car = (Car) ac.getBean("car");
             Car car = (Car) ac.getBean(Car.class);//이렇게 해도 된다. 타입이 car인애를 찾아옴. 이름에 구애받지 않아서 좋다.
             car.run();
         }
     }
     ```

- 위와 같이 안하고, 어노테이션을 조금 더 써서 코드를 최소화 할 수 있다.

  - car, engine 클래스에도 Component 어노테이션을 더해준다.

    ```java
    package kr.or.connect.diexam01;
    import org.springframework.stereotype.Component;
    @Component
    public class Engine {
    	public Engine() {
    		System.out.println("Engine 생성자");
    	}

    	public void exec() {
    		System.out.println("엔진이 동작합니다.");
    	}
    }
    ```

    - 다른 class를 초기화 할때, 직접하지 않고, @Autowired 를 사용해서 컨테이너가 메모리에 올릴 수 있도록 한다.

    ```java
    package kr.or.connect.diexam01;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Component;
    @Component
    public class Car {
        @Autowired
        private Engine v8;

        public Car() {
            System.out.println("Car 생성자");
        }

        public void run() {
            System.out.println("엔진을 이용하여 달립니다.");
            v8.exec();
        }
    }

    ```

  1. **ApplicationConfig02.java**

     ```java
     package kr.or.connect.diexam01;
     import org.springframework.context.annotation.Bean;
     import org.springframework.context.annotation.Configuration;
     @Configuration
     @ComponentScan("kr.or.connect.diexam01")
     public class ApplicationConfig {
         //이렇게 아무 코드도 안쓰는 대신에, componentscan 이라는 어노테이션을 위에 붙여준다.
     }

  2. **ApplicationContextExam04.java** (03코드랑 거의 똑같다.)

     ```java
     package kr.or.connect.diexam01;
     import org.springframework.context.ApplicationContext;
     import org.springframework.context.annotation.AnnotationConfigApplicationContext;
     import org.springframework.context.support.ClassPathXmlApplicationContext;
     public class ApplicationContextExam03 {
         public static void main(String[] args) {
             // TODO Auto-generated method stub
             //ApplicationContext ac = new ("applicationContext.xml");
             ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig02.class);
             //Car car = (Car) ac.getBean("car");
             Car car = (Car) ac.getBean(Car.class);//이렇게 해도 된다. 타입이 car인애를 찾아옴. 이름에 구애받지 않아서 좋다.
             car.run();
         }
     }
     ```
