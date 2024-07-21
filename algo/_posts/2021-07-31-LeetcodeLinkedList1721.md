# Leetcode 1721) Swapping Nodes in a Linked List

![image](https://user-images.githubusercontent.com/37058233/127763956-b6f7a7b8-8b8f-41ff-b60c-41ec3259d899.png)

# 내 답안

- ...노드를 바꾸는 건줄 알았는데 value만 바꾸면 되는거였다...
- 뻘찟 미팀..

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
    public ListNode swapNodes(ListNode head, int k) {
        if(head==null || head.next==null || k==0){
            return head;
        }

        ListNode n_head = new ListNode();
        n_head.next=head;
        for(int i=0;i<k-1;i++){
            head=head.next;
        }       
        ListNode start = head;
        ListNode a= n_head.next;
        while(head.next!=null){
            head=head.next;
            a=a.next;
        }

        int tmp = a.val;
        a.val = start.val;
        start.val=tmp;

        return n_head.next;
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
    public ListNode swapNodes(ListNode head, int k) {
          ListNode start = head;
        ListNode end = head;
        
        for(int i=1; i<k; i++){
            start = start.next;
        }
        ListNode temp = start;
        while(temp.next != null){
            temp = temp.next;
            end = end.next;
        }
        int ans = start.val;
        start.val = end.val;
        end.val = ans;
        
        return head;
    }
}
```

