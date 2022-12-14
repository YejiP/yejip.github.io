---
layout: post
title: "JAVA Thread"
tags: java
---
# JAVA Thread

메모리에 로딩된 프로그램은, CPU에 전송돼 실행돼고, 그 결과가 메모리로 이동한 후에 화면에 출력하게 된다.

소스코드 -> 메모리 -> CPU -> 메모리 ->화면출력



**시간분할** : 여러 프로세스가 짧은 시간을 할당 받아 번갈아 처리하는 것.

**멀티 쓰레드** : 하나의 프로세스 내에서 다시 그 역할에 따라 여러 작업을 **동시**에 하는 것을 의미 (짧은 시간 동안 번갈아 하는게 아니다!)

프로세스 내에서 작게 쪼개져서 실행되는 스레드를 경량의 프로세스라고 부른다.



## Thread 클래스의 선언 및 생성

1.**Thread 클래스 상속**

```
class ThreadSub1 extends Thread{
	@Override
	public void run(){
		//스레드가 실행할 코드
	}
}

=======================================
@ main method
Thread th1 = new Threadsub1();
th1.start();
```





2.**Runnable 인터페이스 구현**

```
class ThreadSub2 implements Runnable{
	@Override
	public void run(){
		//스레드가 실행할 코드
	}
}

=======================================
@ main method
Thread th2 = new Threads(new Threadsub2());
th2.start();
```



class 옆에 extends Thread 하거나, implements Runnable 하면 쓰레드를 선언할 수 있다.

Run 메소드 안에서 작성된 코드는 스레드로 다른 코드와 동시에 실행하게 된다.



CPU가 하나의 프로세스를 실행하다가그 프로세서의 주어진 시간이 끝나면 다른 프로세스로 이동하여 그 프로세스가 할당 받은 시간만큼 일을 처리하게 되는데, 이 일을 반복적으로 실행하는 것이다.
