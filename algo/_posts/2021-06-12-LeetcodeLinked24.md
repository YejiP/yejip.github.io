# Leetcode 24) Swap Nodes in Pairs

![image](https://user-images.githubusercontent.com/37058233/121790262-6ed44180-cb92-11eb-9ac3-674f8398bbe1.png)

# 내 풀이

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next){ this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode swapPairs(ListNode head){
        if(head==null || head.next==null){
            return head;
        }
        ListNode  odd=head;
        ListNode even=head.next;
        ListNode res= even;
        ListNode prev=null;
        while(odd.next!=null){
            ListNode tmp=even.next;
            even.next= odd;
            odd.next=tmp;
            //System.out.println(even.next);
            if(prev!=null){
                prev.next=even;
            }
            prev=odd;
            odd=prev.next;
            if(odd==null){
                break;
            }
            even=odd.next;
        }
        return res;
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
    public ListNode swapPairs(ListNode head) {
        if(head == null) return head;

        ListNode tmp = new ListNode(-1, head);

        ListNode prev = tmp;
        ListNode left = tmp.next;
        ListNode right = left. next;

        while(right!=null){
            left.next = right.next;
            right.next = left;
            prev.next = right;

            prev = left;
            left = left.next;
            if(left == null)
                break;
            right = left.next;
        }

        return tmp.next;
    }
}
```

# 오답노트

- 왜 이렇게 하면 앞에 두 원소가 안 나오지?

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next){ this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode swapPairs(ListNode head){
        ListNode  odd=head;
        ListNode even=head.next;
        ListNode prev=null;
        while(odd.next!=null){
            ListNode tmp=even.next;
            even.next= odd;
            odd.next=tmp;
            //System.out.println(even.next);
            if(prev!=null){
                prev.next=even;
            }
            prev=odd;
            odd=prev.next;
            if(odd==null){
                break;
            }
            even=odd.next;
        }
        return head.next;
    }
}
```

- 맞는 코드랑 res 차이밖에 없다. 왜 이코드는 안되는지 생각해보기