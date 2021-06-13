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

