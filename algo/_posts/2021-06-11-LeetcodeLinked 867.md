# Leetcode 876) Middle of the Linked List

![image](https://user-images.githubusercontent.com/37058233/121763495-814a6e80-caf1-11eb-82e9-518133dc5bc6.png)

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
    public ListNode middleNode(ListNode head){
        ListNode a = head;
        int cnt=0;
        while(a.next!=null){
            cnt++;
            a=a.next;
        }
        cnt= cnt%2+cnt/2;
        while(cnt>0){
            head=head.next;
            cnt--;
        }
        return head;
    }
}
```

# 다른 풀이

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
    public ListNode middleNode(ListNode head){
        ListNode fast = head;
        ListNode slow = head;
        while(fast!=null && fast.next!=null ){
            fast=fast.next.next;
            slow=slow.next;
        }
        return slow;

    }
}
```

# 새로 안 것

- 둘이 순서만 다르지만 결과가 다르게 나온다!!!

```java
while(fast!=null && fast.next!=null ){} // fast가 null일 때 에러 안뜸
while(fast.next!=null && fast!=null ){} //fast가 null일 때 에러뜸
```

- && 연산자는 앞에것이 false일때 뒤에꺼를 실행을 안하는가보다!!