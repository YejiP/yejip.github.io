# Leetcode 92) Reverse Linked List II

![image](https://user-images.githubusercontent.com/37058233/127763900-572ba420-4819-43bb-8003-ae7dc3052d0b.png)

# 내 답안

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
    public ListNode reverseBetween(ListNode head, int left, int right) {
        if(head==null || head.next==null || left==right){
            return head;
        }
        ListNode n_head = new ListNode();
        n_head.next=head;
        ListNode prevLink= n_head;
        for(int i =0;i<left-1;i++){
            prevLink=head;
            head= head.next;
        }
        ListNode prev = head;
        ListNode cur=prev.next;
        ListNode next=cur.next;
        ListNode start= prev;

        while(left<right){
            left++;
            //null처리 생각해주기 => 조건에서 범위 내에 하겠다고 했으니까 믿자?
            cur.next= prev;
            prev= cur;
            cur=next;
            if(cur!=null){
                next=cur.next;
            }
            
        }
        prevLink.next= prev;
        start.next= cur;
        
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
    public ListNode reverseBetween(ListNode head, int left, int right) {
        if(head == null)
            return null;

        ListNode prev = null, curr = head;
        int count = 1;

        while(count < left && curr != null) {
            prev = curr;
            curr = curr.next;
            count++;
        }

        ListNode beforeLeft = prev, actualLeft = curr;

        while(count >= left && count <= right && curr != null) {
            ListNode temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
            count++;
        }
        if(left == 1)
            head = prev; //is left is 1 then head has to refer to right node
        else
            beforeLeft.next = prev; //at end prev is the actualRight node
        actualLeft.next = curr;     //at end curr is afterRight node.

        return head;
    }
}
```

