# Leetcode 142)  Linked List Cycle II

![image](https://user-images.githubusercontent.com/37058233/121791309-7b11cc00-cb9d-11eb-87e3-b1f2ed8c6c8a.png)

# 내 풀이

- arraylist에 저장해서 contains, indexOf 사용. 객체저장해서 그 객체를 이미 가지고 있으면 return true 아니면 pointer가 null될때까지도 겹치는 게 없으면 fasle

```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if(head==null){return null;}
        List<ListNode> res = new ArrayList<>();
        res.add(head);
        while(head.next!=null){
            if(res.contains(head.next)){
                return head.next;
            }else{
                res.add(head.next);
            }
            head=head.next;
        }

        return null;

    }


}
```

# 다른 답안

![Presentation1](https://user-images.githubusercontent.com/37058233/121791548-c0cf9400-cb9f-11eb-9dfb-5be86bcd017c.gif)

```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if(head==null)
            return null;
        ListNode slow = head;
        ListNode fast = head.next;
        while(slow!=fast && fast!=null && fast.next!=null){
            slow = slow.next;
            fast = fast.next.next;
        }
        if(slow==fast){
            slow=head;
            while(fast.next!=slow){
                slow=slow.next;
                fast=fast.next;
            }
            return slow;
        }
        
        return null;
        
    }
}
```

