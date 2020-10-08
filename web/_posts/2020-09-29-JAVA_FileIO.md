# File I/O

시리얼 : 한줄로 데이터를 들어오게 하는것 

파일로 부터 데이터를 입력받고 출력받는 동작을 스트림이라고 한다.

I/O : catched Exception

# 바이트 기반 스트림

## FileInputStream

글자로 읽을 수 없는 데이터 (소리, 그림)

```
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
}


```



```
import java.io.FileOutputStream;

== main ==
FileOutputStream fis = null;
try{
	fis = new FileOutputStream("text.txt");
	fis.write(72);
	fis.close(); //이거 중요하다. 이거 안하면 데이터가 저장을 안 한다.
	}catch(Exception e){
	e.printStackTrace();
}

```

- Byte 데이터 처리
- 파일이 존재하지 않으면 오류
- 객체 생성이 완료 --> 파일이 open 되었다.
- 파일로부터 데이터를 읽어들임 : read() => int 리턴함 => char로 변환해서 사용. 
- -1이 리턴되면, 파일로 부터 데이터를 읽을 수 없다 라는게 리턴됨. ==> 루프에서 벗어나면 된다.
- close() => 뒷처리 작업 => Exception 처리를 해야함





## FileOutputStream

- 파일이 존재하지 않으면 생성 / 존재하면 Overwritting
- 객체 생성이 완료 => 파일이 open 되었다.
- 메모리의 데이터를 파일에 저장 : write()
- close() => Exception 처리를 해야함. 꼭 닫아줘야한다.
- outputStream 에서는 close()를 안하면 파일에 손상이 생김

그래서, 

```
try{

		}catch(Exception e){

		} finally{

			"Exception 이 발생 하건 안하건 꼭 돌아가는 코드"

		try{ 
			//fis가 생성이 안돼서 오류가 났을 수 도 있어서 try catch 블록에 넣어준다.

			fis.close();}catch(IOException e){

			e.printStackTrace();}

}
```





java.io 패키지에 있다.

```
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



FileInputStream : 한글처리 안된다. 바이트 단위로 처리하는데, '홍'이라는 글자는 두바이트로 되어있다.

그래서 나온게

# 문자 기반 스트림



## FileReader / FileWriter 

```
FileReader fr = null;
FileWriter fw = null;
try{
	fr = new FileReader("score.txt");
	
	System.out.println("복사시작!!");
	
	int data =0;
	while(true){
		data = fr.read();
		if(data==-1)break;
		System.out.print((char)data);
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

```
BufferedInputStream br = null;
try{
	br = new BufferedReader(new FileReader("score.txt"));
	bw = new BufferedWriter(new FileWriter("result.txt"));
	System.out.println("복사시작!!");
	
	String data ="";
	while(true){
		data = br.read();
		if(data==null)break;
		String[] temp = str.split(" ");
		String name = temp[0];
		int kor = Integer.parseInt(temp[1]);
		int eng = Integer.parseInt(temp[2]);
		int mat = Integer.parseInt(temp[3]);
		int total = kor + eng + mat;
		double avg = total/3.0;
		String w=String.format("%s %d %d %d %d %.2f\n",name,kor,eng,total,avg);
		bw.write(w);

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



# Object

```
public class FriendOutput{
	public static void main(ST)
}
```











