# JAVA class

## 클래스 형식

[접근지정자] [keyword] 리턴타입 메소드명(매개변수선언,.....)

public 			static			void		main		String args[] 

keyword: static



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

**Encapsulation** : 내부 구현을 숨기고 사용자에게 인터페이스만 제공.

**Inheritance** : 클래스를 상속받아 만들어지는 것이 자식 클래스. 코드의 재사용성, 확장성을 높여준다. 

**Polymorphism** :  부모에서 상속받은 메쏘드를 재정의해 사용.(오버라이딩)









