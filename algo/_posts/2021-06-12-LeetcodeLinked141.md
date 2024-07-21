# Leetcode 141)  Linked List Cycle

![image](https://user-images.githubusercontent.com/37058233/121790557-7cd79180-cb95-11eb-819c-2727c5955701.png)

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
    public boolean hasCycle(ListNode head) {
        int pos=-1;
        if(head==null){return false;}
        List<ListNode> res = new ArrayList<>();

        while(head.next!=null){
            if(res.contains(head)){
                pos=res.indexOf(head);
                return true;
            }else{
                res.add(head);
            }
            head=head.next;
        }

        return false;

    }
}
```

# 다른 답안

- 포인터를 두개 쓴다. 
- 원형에서는 속도가 다르더라도, 언젠가는 만나기 때문에 한 포인터는 하나 앞으로, 다른 한 포인터는 두개 앞으로 가다가 서로 만나면 return true, 안 만나고 null을 만나면 return false!

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
    public boolean hasCycle(ListNode head) {
        if(head == null)
            return false;
        ListNode slow = head;
        ListNode fast = head;
        while(fast.next != null && fast.next.next != null){
            slow = slow.next;
            fast = fast.next.next;
            if(slow == fast)
                return true;
        }
        return false;
    }
}
```

