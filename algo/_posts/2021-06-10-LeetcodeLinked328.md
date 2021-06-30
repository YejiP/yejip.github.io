# Leetcode 328) Odd Even Linked List

![image](https://user-images.githubusercontent.com/37058233/121617119-204f6780-ca19-11eb-930d-21326a618311.png)

# 내 풀이

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode oddEvenList(ListNode head) {
        if( head==null||head.next==null||head.next.next==null){
            return head;
        }
        ListNode odd=head;
        head=head.next;
        ListNode even =head;
        head=head.next;
        ListNode otmp = odd;
        ListNode etmp = even;


        int cnt=1;
        while(head.next!=null){
            if(cnt%2==1){
                otmp.next=head;
                otmp=otmp.next;
            }else{
                etmp.next=head;
                etmp = etmp.next;
            }
            cnt++;
            head=head.next;
        }
        if(cnt%2==1){
            otmp.next=etmp.next;
            etmp.next= null;
            otmp=otmp.next;
        }else{
            etmp.next=null;
            etmp.next=otmp.next;
            otmp.next=null;
        }
        otmp.next=even;
        return odd;
    }
}
```

# 다른 답안

- 포인터를 잘 set해줌. 1의 다음다음을 붙여라. 가 아닌, 1의 다음인 2의 다음을 붙여라 이런 느낌?

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode oddEvenList(ListNode head) {
        if (head == null) return null;
        ListNode odd = head, even = head.next, evenHead = even;
        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }
        odd.next = evenHead;
        return head;
    }
}
```

# 다시 푼 풀이

- 조건을 even.next와 odd.next가 null이 아닐때 + 그 안에 또 체크해서 null값이면 break를 했다. 
- 위에 코드의 조건을 보고 배울 것. 위에 코드는  **even != null && even.next != null** 이렇게 even을 기준으로 줬다. 
  - even이 null일때면, 끝까지 간 것이고, even.next이 null일때면 odd 뒤에 더이상 붙일 것이 없다.

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode oddEvenList(ListNode head) {
        int cnt=0;
        if (head==null)return head;if(head.next==null)return head;
        ListNode odd=head;ListNode even = head.next; ListNode evenHead = even;
        
        while(even.next!=null || odd.next!=null){
            odd.next=even.next;
            odd=odd.next;
            if(odd==null)break;
            even.next=odd.next;
            even=even.next;
            if(even==null)break;
        }
        ListNode hdummy=head;
        while(hdummy.next!=null){
            hdummy=hdummy.next;
        }
        hdummy.next=evenHead;
        return head;
    }
}
```

