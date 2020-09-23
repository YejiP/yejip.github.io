# JAVA Collection

collection : 자료구조. (arraylist, hashmap, hashset, stack, deque...)

배열의 단점 : 

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

