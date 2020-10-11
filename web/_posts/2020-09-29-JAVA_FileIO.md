# File I/O

**스트림 :** 파일로 부터 데이터를 입력받고 출력받는 동작.



입력버퍼(stdin)는 어떻게 동작는가?

```java
import java.io.IOException;
public class input {
	public static void main(String[] args) throws IOException {
		int ch;
		System.out.println("문자 입력: ");
		while(true) {
            
            //입력버퍼 메모리에 저장된다. 입력버퍼가 비기 전까지 입력 요청x
			ch = System.in.read();  
            
            //java에서 엔터키는 \r\n 을 사용한다.
			if(ch=='\r')break;
            
            // unicode라서 숫자로 반환. (char) 이용시 숫자에 대응되는 char로 나옴	
			System.out.println("입력문자 : " + (char)ch);
		}
		System.out.println("The end");
	}
}	
```





# 바이트 기반 스트림

## FileInputStream

- 글자로 읽을 수 없는 데이터 (소리, 그림)

- FileInputStream 객체 생성 시 안에 argument 로 읽을 파일 넣어준다.

- FileInputStream객체.read() 하면 입력버퍼에서 한 글자를 가져와 읽는다.

- 그래서 while(true)문 안에 있는 것이고, 만약 입력 버퍼 안에 글자가 없다면 -1 을 리턴한다.

-  read() => int 리턴함. 그래서 (char)를 붙여주는건 국룰이니 잊지말자.
- 객체 생성이 완료 => 파일이 open 되었다.
- close() => 뒷처리 작업 => Exception 처리를 해야함

```java
import java.io.FileInputStream;
== main ==
FileInputStream fis = null;
try{
	int i =0;
	fis = new FileInputStream("song.txt");
	while(true){
		i = fis.read();
		if(i==-1)break;
		System.out.print((char)i);
		}
	}catch(Exception e){
	e.printStackTrace();
} finally{
			//Exception 이 발생 하건 안하건 꼭 돌아가는 코드
		try{ 
 			if(fis!=null)fis.close();
			}catch(IOException e){
			e.printStackTrace();}
}
```



## FileOutputStream

- 파일이 존재하지 않으면 생성 / 존재하면 Overwritting
- 메모리의 데이터를 파일에 저장 : write()
- close() => Exception 처리를 해야함. 꼭 닫아줘야한다.
- outputStream 에서는 close()를 안하면 파일에 손상이 생김

그래서,  try catch **finally** 구문을 사용해서, close 하는 부분은 finally에 넣고 또 다른 try catch 로 감싸준다.

null check도 해야한다. 안 열려있는데 닫을 수는 없으니까...

java.io 패키지에 있다.

```JAVA
try{
	fis = new FileInputStream("source.txt");
	fos = new FileOutputStream("target.txt");
	System.out.println("복사 시작!");
	int data = 0;
	while(true){	
		data = fis.read();
		//EOF(End Of File)에 도달하면 -1로하자
		if(data==-1)break;
		fos.write(data);
	}
	System.out.println("복사 완료!");
	} catch (Exception e){
	e.printStackTrace();
	}finally {
		try{
			if(fis!=null)fis.close();
			if(fos!=null)fos.close();
		}catch(IOException e){
			e.printStackTrace();
		}
	}

```

FileInputStream는 한글처리 안된다. 바이트 단위로 처리하는데, '홍'이라는 글자는 두바이트로 되어있기 때문이다.

그래서 나온게



# 문자 기반 스트림

## InputStreamReader/ OutputStreamWrtier

```JAVA
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;
public class ZooCharge {
	public static void main(String[] args) throws IOException {
		InputStreamReader isr = new InputStreamReader(System.in);
		System.out.println("객체생성완료");

		try {
			while(true) {
				char ch = (char)isr.read();
				if(ch=='\r')break;
				System.out.println(ch);
			}
			isr.close();


		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}

```

```java
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
public class OutputTest {
	public static void main(String[] args) throws IOException {
		InputStreamReader isr = new InputStreamReader(System.in);
		System.out.println("객체생성완료");

		try {
			String a = "작은 것들이 큰 변화를 불러온다";
            //FileOutputStream 은 문자를 저장하는 메소드가 존재하지 않기 때문에, 이렇게 outputStreamWriter 안에 넣어줘야한다. 
			OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("Poem.dat"));
			osw.write(a,3,4);
			osw.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
```



## FileReader / FileWriter 

- 문자 기반 스트림이다. 입출력 단위가 문자임.

```java
//main 
FileReader fr = null;
FileWriter fw = null;
try{
	fr = new FileReader("score.txt");
	
	System.out.println("복사시작!!");
	
	int data =0;
	while(true){
		data = fr.read();
		if(data==-1)break;
        fw.write((char)data);
		
	}
	System.out.print("복사완료!");
	} catch (Exception e){
	e.printStackTrace();
	}finally {
		try{
			if(fr!=null)fr.close();
			if(fr!=null)fr.close();
		}catch(IOException e){
			e.printStackTrace();
		}
	}

```



## BufferedInputStream/ BufferedOutputStream

- 이전까지는 기계장치인 디스크에 접근해서 데이터를 처리했다. 그런데 하드 디스크는 기계적인 동작을 하므로, 전기적인 처리를 하는 메모리보다 처리 속도가 느리다. 그래서 디스크에 저장된 파일의 크기가 크면 클수록 하드 디스크에 접근하는 횟수가 많아지고, 그래서 오버해드가 발생하게 된다. 
- 버퍼를 사용하면 버퍼라는 이름의 메모리 영역에서 데이터를 찾아 처리하고 버퍼에 데이터가 없을 경우에만 기계장치에 접근해 데이터를 버퍼에 다시 채우는 형식으로 동작한다.
- 기본생성자는 제공하지 않고, 다른 스트림 클래스와 연결하여 기능을 확장하는 방식으로 이용.

```java
//코드는 위와 크게 다르지 않다. 그저 성능을 개선한 코드일 뿐...

BufferedInputStream bis = null;
BUfferedOutputStream bos = null;
int data = 0;
try{
    bis = new BufferedInputStream(new FileInputSteram("I'am yours.txt"));
    bos = new BufferedOutputStream(new FileOutputStream("copy.txt"));
    while(true){
        data = bis.read();
        if(data==-1){break;}
        bos.write(data);
    }
}catch(Exception e){
		e.printStacTrace();   
}finally{
    try{
    	if(bis!=null){bis.close();}
    	if(bos!=null){bos.close();}
    }catch(Exception e){
		e.printStacTrace();
    }

}

```



```java
BufferedReader br = null;
BufferedWriter bw = null;
try{
	br = new BufferedReader(new FileReader("score.txt"));
	bw = new BufferedWriter(new FileWriter("result.txt"));
	System.out.println("복사시작!!");
	
	String data ="";
	while(true){
		data = br.readLine();
        StringTokenizer stk = new StringTokenizer(data); //기본 구분자는 띄어쓰기
		if(data==null)break;
        while(stk.hasMoreTokens()){
            String name = stk.nextToken();
			int kor = Integer.parseInt(stk.nextToken());
			int eng = Integer.parseInt(stk.nextToken());
			int mat = Integer.parseInt(stk.nextToken());
			int total = kor + eng + mat;				
			double avg = total/3.0;
			String w=String.format("%s %d %d %d %d %.2f\n",name,kor,eng,total,avg);
			bw.write(w);
        }
	}
	System.out.print("처리 완료!");
	} catch (Exception e){
	e.printStackTrace();
	}finally {
		try{
			if(br!=null)br.close();
			if(bw!=null)bw.close();
		}catch(IOException e){
			e.printStackTrace();
		}
	}

```



# 객체 직렬화

- 객체를 읽거나 쓰는 것은 byte 기반의 stream 클래스이다. 

```java
ObjectOutputStream oos = null;
try{
	oos = new ObjectOutputStream(new FileOutputStream("object.dat"));
	oos.writeObject("Hello, Hello?");
	oos.writeObject("Do you know me?");
}catch(Exception e){
	e.printStackTrace();
}fianlly{
	try{
		if(oos!=null)oos.close();
	}catch(Exception e){
		e.printStacTrace();
	}
}
```



```java
ObjectInputStream ois= null;
try{
	ois = new ObjectInputStream(new FileInputStream("object.dat"));
	String obj=null;
	
	while(true){
		try{
			obj = (String) ois.readObject();
			System.out.println(obj);
            }catch(Exception e){
            	e.printStackTrace();
            }
	}catch(Exception e){
		e.printStackTrace();
	}finally{
		try{
		if(ois!=null)ois.close();}
		catch(Exception e){
			e.printStackTrace();
		}
	}
}
```



- 객체를 파일에 저장시, 객체의 멤버데이터를 파일로 내보낼 수 있도록 순차적인 데이터로 바꾸는 작업, 직렬화라고 한다.  그냥 클래스를 정의할 때 implements Serializable 을 해주면 된다. 

```java
public class Friend implements Serializable{

}
```

- 

```java
ObjectOutputStream oos = null;
Friend f1 = new Friend();
try{
	oos = new ObjectOutputStream(new FileOutputStream("object.dat"));
	oos.writeObject(f1);
}catch(Exception e){
	e.printStackTrace();
}fianlly{
	try{
		if(oos!=null)oos.close();
	}catch(Exception e){
		e.printStacTrace();
	}
}
```





