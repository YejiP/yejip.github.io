# JAVA class

## 클래스 형식

패키지

임포트

[접근지정자] [keyword] 리턴타입 메소드명(매개변수선언,.....)

public 			static			void		main		String args[] 

keyword: static



## 패키지

**package**: 

- 폴더의 개념, 자바에서 프로그래밍시 파일 관리의 효율을 위해 패키지라는 이름 도입

- file 이름 중 하나로 인식

- 패키지 이름 java로 하면 안된다.
- 패키지 이름은 전세계 유일 하나여야한다. 그래서 회사 도메인 뒤집어서..(ex/ www.naver.com -->com.naver.web)



**구분자** 

- 윈도우 : \가 구분자

- 웹, 리눅스 ,유닉스 : /가 구분자

- JAVA : . 이 구분자



## 클래스의 종류

**PUBLIC ABSTRACT** 

: 상속만을 위한 클래스이다. 생성자가 private 로 되어있기 때문에( privae MyStatic () {} ) new keyword를 사용해 객체를 만드는 것은 불가능하다.  

ex) 아래 캘린더 클래스는 오로지 상속을 위해 만들어졌다.

![캘린더 abstract class](https://user-images.githubusercontent.com/37058233/93461349-9c4fcf80-f91f-11ea-8cc4-a31bf7732175.PNG)





**PUBLIC STATIC**

: 파일이 시작되면서 메모리에 바로 로딩이 되기 때문에 new keyword를 사용해 메모리에 로딩하는 작업이 불필요하다. **클래스명.스태틱메소드명** 형식으로 사용한다.

static 멤버변수, 멤버 메소드 앞에 붙일 수 있다. 지역변수앞에는 사용불가



**PUBLIC STATIC FINAL**

: static 하나만 있는게 별로 없다. static final보통 다 붙이고 이걸 대문자로.

final :지역변수 멤버변수 멤버 메서드 앞에 붙일 수 있다. 



## OOP(Object Oriented Programming)

: Encapsulation, Inheritance, Polymorphism 의 특징을 가진다.



**1. Encapsulation** : 내부 구현을 숨기고 사용자에게 인터페이스만 제공.



**2. Inheritance** : 클래스를 상속받아 만들어지는 것이 자식 클래스. 코드의 재사용성, 확장성을 높여준다. 

- 기존에 만들어진 클래스의 기능을 확장해서 사용하는 개념 (extends 사용)
- 다중 상속이 불가능하다. (extends mother, father)
- 접근 지정자 (private < protected < (default) < public) 
  - public 멤버가 상속된다. 
  - private, 생성자는 상속이 안된다. 
- 항상 최상위 클래스가 상속된다.
- super()은 자식 클래스의 생성자 안에서 사용가능, 반드시 첫줄에
- 클래스 앞 final 키워드가 붙어있으면 상속을 할 수 없다.
- object가 최상위 클래스다
- is-a 관계(extends로 되어있는 것).  자식은 부모다. 자식은 오브젝트다.

```
final class MyClass{
 String name;
}

class MySon extends MyClass{
	//오류 : MyClass가 final이라서 상속할 수 없다.
}
```

막간 final 지식  : 상수(멤버 변수), 상속제한, 지역변수로 쓸 때 값을 못바꾸게.(메소드 안에서) 

**오류 나는 이유,**  JVM이 상속받은 객체 생성시, 내부적으로 부모부터 생성, 그다음에 자식객체를 생성한다. 그래서 JVM 이 super();이라는 메쏘드를 호출하는데, 부모 클래스에는 arg가 없는 생성자가 없어서 오류가 뜬다. 

해결 1) super(x); 이렇게 넣어서 JVM이 기본 생성자를 자동으로 만들지 못하게 한다.

해결 2) 부모클래스에 public Parent(){} 이렇게 기본 생성자를 명시적으로 넣어준다.



**3. Polymorphism** :  부모에서 상속받은 메쏘드를 재정의해 사용.(오버라이딩)









