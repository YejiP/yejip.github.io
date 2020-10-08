# 	JAVA Collection

Collection :** 자료구조. (**arraylist, hashmap**, hashset, stack, deque...)

**배열의 단점 : **

처음 선언시에 배열의 크기를 알려줘야해서 불편, 

중간 삭제 삽입이 어려움.

## ArrayList

- 크기를 정하지 않고 사용하는 배열

```
ArrayList<BankvO> list = new ArrayList<>(); //제네릭

//제네릭 표기법 : <데이터 타입> --> 이런 표기법을 의미
list.add(new BankVO("1234","임꺽정",60000));
list.add(new BankVO("1234","임하늘",6000));

list.remove(1);

BankVO bv = list.get(0);

System.out.println(list.size());

list.indexOf(A); //A객체의 인덱스를 리턴한다. (근데 클래스에 hashcod와 equals 가 implement되어 있어야지만 사용할 수 있다.)

list.clear();
```

- 데이터 조회하기

1) 데이터 순서대로 다 조회

```
for(int i=0;i<list.size();i++){
	System.out.println(list.get(i));
}
```



2) 확장된 for문 (이게 더 좋다.)

```
for(BankVO b : list){
	System.out.println(b);
}
```



3) Iterator를 이용한 순회 (데이터가 많으면 속도가 빨라진다.)

Iterator<BankVO> iter은 순회 전용 객체이다. 큐처럼 데이터 조회된 데이터는 삭제된다.

```
Iterator<BankVO> iter = list.iterator();
while(iter.hasNext()){
	System.out.println(iter.next());

}
```



## HashMap

- 데이터를 키와 값의 쌍으로 넣는다. 그래서 키가 중복되면 안된다.
- 키를 가지고 검색을 하기 때문에 검색 속도가 빠르다.
- 데이터 쌓아놓고 중복되어도 될때는 어레이리스트, 검색할때는 해쉬맵
- 독특하게, remove(), put 할 때 값을 리턴해준다. 그래서 null 체크해서 null이 아니면 작업이 수행된걸로 생각할 수 있다.

```
containsKey(Object key)
: 특정 키가 있는지 없는지 확인해준다. (boolean 값 리턴)

entrySet()

get(object key) : key에 해당하는 value를 넣는다.

isEmpty(): hashmap 안에 데이터가 있냐 없냐

keySet()

put(K key, V value) : return 값 value값이다. (들어갔는지 확인)

remove()

size() :

```



```
		Map<String,String> map = new HashMap<String,String>();
		map.put("1","one");
		map.put("2","two");
		map.put("3","three");
		map.put("4","four");
		System.out.println(map);


결과)
{1=one, 2=two, 3=three, 4=four}

```



중복되지 않게 키를 집어넣어야한다. 오류는 안나지만 데이터가 덮어쓰여진다.

```
if(map.keyContains())를 해줘야한다.
```



key 만 뽑고 싶을 때

```
Set<String> set = map.keySet();

```



## Set

- set은 중복없이 순서없이 데이터를 넣어두는 집합.

  ```e
  Set<String> set = new HashSet<>();
  set.add("hello");
  set.add("bye");
  System.out.println(set.add("good morning");) //잘 들어갔으면 true 반환, 아니면 false 반환
  set.clear();
  set.cotains(object O);
  set.isEmpty();
  
  Iterator<String> iter = set.iterator();
  
  ```

- 조회

  ```
  	Iterator<String> iter= set.iterator();
  		
  		while(iter.hasNext()) {
  			System.out.println(iter.next());
  		}
  ```


