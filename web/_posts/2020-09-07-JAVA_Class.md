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



**concrete class : **객체를 생성할 수 있는 클래스를 의미.



**PUBLIC STATIC**

: 파일이 시작되면서 메모리에 바로 로딩이 되기 때문에 new keyword를 사용해 메모리에 로딩하는 작업이 불필요하다. **클래스명.스태틱메소드명** 형식으로 사용한다.

static 멤버변수, 멤버 메소드 앞에 붙일 수 있다. 지역변수앞에는 사용불가



**PUBLIC STATIC FINAL**

: static 하나만 있는게 별로 없다. static final보통 다 붙이고 이걸 대문자로.

final :지역변수 멤버변수 멤버 메서드 앞에 붙일 수 있다. 



## 클래스 다이어그램

클래스 명

변수

메소드

