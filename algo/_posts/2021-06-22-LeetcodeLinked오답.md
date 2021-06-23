# LinkedList 오답과 테크닉

## **오답**

1. **조건 두개의 차이점과 각각 언제 쓰는게 좋은지**

   1. **while(head.next!=null)**

      - while문 안에 .next.next가 들어갈 경우는 조건에서 무조건 fast.next!=null 줘야한다.
      - while문을 빠져나간 후에 변수에 null값이 들어가있다.

      ```java
      while(slow!=null || fast!=null){
          slow = slow.next;
          fast= fast.next.next;
      }
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

## **테크닉**

1. 중앙값 찾는 테크닉

   ```java
   fast = dummy.next.next;
   slow = dummy.next;
   ```

2. reverse하는 테크닉

   ```
   ```

3. linkedlist안 원 찾는 테크닉

   ```java
   fast = dummy.next.next;
   slow = dummy.next;
   //둘이 언젠가 만난다.
   ```

   