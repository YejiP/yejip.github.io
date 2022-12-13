---
layout: post
title: "JAVA Exception"
category: web
tags: java
---

# 	JAVA Exception

**Error :**  사용자가 프로그램으로 처리 할 수 없는 오류

**Exception :** 프로그램 상에서 처리 가능한 오류  (Runtime exception, IOException)



## Runtime Exception

```
String[] str = {"0","asdf","123"};
int value = 10;
int num = Integer.parseInt(str[0]);
int result = value/num;
```

문법적으로 오류가 없지만, 의미적으로 0으로 나눌 수 없기 때문에 에러. run 하기 전에는 모르는 에러다.

처리 안해도 되는 익셉션



## IOException

꼭 처리해야하는 익셉션

```
try{

	오류가 날 수 있는 코드 ==> JVM ==> Exception 객체로 만들어서 우리 쪽으로 던진다. 그래서 아래서 catch

} catch (ArithmeticException e) {

	익셉션을 잡아내겠다.

} catch (익센션 종류 e) {

} ...
프로그램 멈추지 않고 이 코드 실행됨.


```

이렇게 보다는

```
try{

	오류가 날 수 있는 코드 ==> JVM ==> Exception 객체로 만들어서 우리 쪽으로 던진다. 그래서 아래서 catch

} catch (ArithmeticException e) {

	e.printStackTrace();

} catch (익셉션 종류 e) {

	e.printStackTrace();

} catch (익센션 종류 e) {

} ...


```



다형성을 사용해서 보통 아래와 같이 사용한다.

```
try{

	오류가 날 수 있는 코드 ==> JVM ==> Exception 객체로 만들어서 우리 쪽으로 던진다. 그래서 아래서 catch
//ArithmeticException 이 부분에 ArithmeticException의 상위 클래스를 넣어도 된다.
} catch ( Exception e) {

	e.printStackTrace();

}
```



```
for(int i=0;i<5;i++){
try{
	System.out.print((i+1)+"번 째 입력");
	input = scanner.nextInt();
} catch ( Exception e) {

	e.printStackTrace();

}
}
```



input = scanner.nextInt();

여기서 "ABC"를 치면, 이 정보가 stdin이라는 메모리 공간에 쌓인다.일종의 queue같은 개념. 엔터를 치면 이게 변수에 넣으려고한다.

예를들어 1223 쳣으면 1 다음 2 다음 3... 이렇게 옮긴다.

근데 int 변수에 a 못들어간다. 문자니까.

그래서 catch 블록으로 넘어가는데, 다음 루프 돌 때 stdin 공간에 a가 사라지지 않아서 계속 계속 오류가 나게된다.

stdin 에 있는데이터에서 nextLine 은 문장을 (엔터), next는 단어를.

```
for(int i=0;i<5;i++){
try{
	System.out.print((i+1)+"번 째 입력");
	input = scanner.nextInt();
} catch ( Exception e) {
	i--;
	scanner.nextLine(); //오류난 문장을 stdin에서 빼준다.
	e.printStackTrace();

}
}
```



a가 양수면 안된다는 조건일 때, 아래와 같이 직접 exception 객체를 만들어 JVM에 던져준다.

```
try{
if(a>0){
	throw new Exception("전달 되는 값은 양수여야합니다.")
 } catch(Exception e){
 e.printStackTrace();
 }
}
```



익셉션 전가
