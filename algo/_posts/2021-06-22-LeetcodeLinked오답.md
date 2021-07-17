# LinkedList 오답과 테크닉

## **오답**

1. **조건 두개의 차이점과 각각 언제 쓰는게 좋은지** (맨 끝값을 생각해보면서 정하기)

   1. **while(head.next!=null)**

      - while문 안에 .next.next가 들어갈 경우는 조건에서 무조건 fast.next!=null 줘야한다.
      - while문을 빠져나간 후에 변수에 null값이 들어가있다.
      - 조건은 fast에 맞춰있다. (당연) fast!=null && fast.next!=null
      - slow는 대충 중간으로나오는데, 만약에 palindrome 문제라면, 중앙 값을 한번 뛰어 넘어주고싶다. 

      ![image](https://user-images.githubusercontent.com/37058233/126019068-06086997-abd8-41ab-8e49-046d8e777086.png)

      1. fast가 null이면 짝수, fast.next가 null이면 홀수

      ```java
      while(fast!=null && fast.next!=null){
          slow = slow.next;
          fast= fast.next.next;
      }
      //여기서 fast가 null : 짝수
      //fast.next 가 null : 홀수
      ```

   2. **while(head!=null)**

      - while문 빠져나간 후, 변수에 linkedlist의 끝 값이 들어가있다.

2. 알고리즘 생각해서 시뮬레이션 해볼 때, 처음값이 아닌 중간부터 적용해보고 양 끝 처리는 그 다음에 해준다.

3. 문제가 필요이상으로 풀기가 어렵다면 아마 pointer를 추가하거나 다른 방식으로 사용해보기도 해야겠다.
   1. 정답을 반환하는 헤드 res 를 생각해보기
   2. dummy 포인터를 생각해보기
   3. 최소의 반복단위인지 생각해보기. 예를들어, 한번 반복할 때 1번 노드의 방향만 바꾸면 되는데 1번,2번 노드의 방향을 바꿨다든지 (2번 노드의 방향은 반복문 돌 때 자연스레 바뀌므로 굳이 처리해줄 필요가 없을 수 있음)

4. 노드가 너무 적게 나올 때

   1. dummy 로 안해서 잘못 됐을 수도 있다.

   2. 두개만 나올때는 

      ```java
      while(head.next=null){
          head= head.next; //이거를 빼먹었을 수도 있다.
      }
      ```

      while문 안, head= head.next 이렇게 ptr 업뎃 안해주면 두개만 나옴.

5. 어떤 노드를 다른 노드에 끝에 연결할 때, while문으로 null 될 때 까지 체크해서 연결하지 않아도 된다. 그냥 head.next= tail; 이렇게 하면 바로 연결된다.

6. input이 null 일 경우 항상 생각해서 맨 앞에 예외로 처리해주는 코드 만든다.

7. doubly linked list일 경우, head와 tail을 더미로 만들어준다. 그래서 진짜 첫번째 원소는 head.next에 들어갈 수 있게. 그리고 꼭 양방향으로 연결되었는지 확인해준다.

## **테크닉**

1. 중앙값 찾는 테크닉

   ```java
   fast = dummy.next.next;
   slow = dummy.next;
   ```

2. reverse하는 테크닉

   1. 한방향 linked list를 reverse할 때, 뭐를 잃는지 생각하면쉽다. 

   ```
   while문 {
   	temp = cur.next;
   	cur.next=prev;//역방향 화살표 하나 만들어짐.
   	prev = cur;
   	cur = temp;
   	//요런식으로
   }
   ```

3. linkedlist안 원 찾는 테크닉

   ```java
   fast = dummy.next.next;
   slow = dummy.next;
   //둘이 언젠가 만난다.
   ```

   