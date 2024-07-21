# Leetcode 25)  Reverse Nodes in k-Group

![image](https://user-images.githubusercontent.com/37058233/123596752-69d4dc00-d7a7-11eb-90a9-fa4fc6305f17.png)

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

    ListNode link=null;
    public ListNode swap(ListNode cur, int k){
        int cnt =1;
        ListNode tmp = null;
        ListNode newLink =cur;
        ListNode next=cur.next;
        while(cnt<k && next!=null){ 
            tmp = next.next;
            next.next=cur;
            cur=next;
            next=tmp;
            cnt++;
        }
        if(link!=null){
            link.next=cur;
        }
        newLink.next=next;
        link=newLink;
        return link.next;
    }

    public ListNode reverseKGroup(ListNode head, int k){
        ListNode start=head;
        ListNode newStart=null;
        ListNode dummy=head;
        ListNode res=null;
        ListNode next=null;
        int ind=0;boolean first=true;
        boolean end=false;
        while(start!=null && !end){
            ind++;
            if((ind)%k==0){
                if(first){
                    res=dummy;
                    first=false;
                }
                newStart = swap(start,k);
                start=newStart;
                dummy=start;
            }
            if(dummy!=null){
                dummy=dummy.next;
            }else{
                end=true;
            }
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
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        ListNode pre = dummy;
        ListNode end = dummy;

        while (end.next != null) {
            for (int i = 0; i < k && end != null; i++) end = end.next;
            if (end == null) break;
            ListNode start = pre.next;
            ListNode next = end.next;
            end.next = null;
            pre.next = reverse(start);
            start.next = next;
            pre = start;

            end = pre;
        }
        return dummy.next;
    }

    private ListNode reverse(ListNode head) {
        ListNode pre = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = pre;
            pre = curr;
            curr = next;
        }
        return pre;
    }

}
```

