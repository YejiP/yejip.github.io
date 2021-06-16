# Leetcode 21) Merge Two Sorted Lists  

![image](https://user-images.githubusercontent.com/37058233/122302732-6132fa80-ceb7-11eb-80af-129dc3267908.png)

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
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if(l1==null && l2 ==null){
            return l1;
        }else if(l1==null){
            return l2;
        }else if(l2==null){
            return l1;
        }
        ListNode res;
        if(l1.val<l2.val){
            res = l1;
            l1=l1.next;
        }else{
            res=l2;
            l2=l2.next;
        }
        ListNode tmp=res;
        while(l1!=null && l2!=null){
            if(l1.val<l2.val){
                tmp.next=l1;
                l1=l1.next;
            }else{
                tmp.next=l2;
                l2=l2.next;
            }
            tmp=tmp.next;
        }
        while(l1!=null){
            tmp.next=l1;
            l1=l1.next;
            tmp=tmp.next;
        }
        while(l2!=null){
            tmp.next=l2;
            l2=l2.next;
            tmp=tmp.next;
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
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        
        ListNode curr = null, head = null;
        
        if(l1 == null) return l2;
        if(l2 == null) return l1;
        
        if(l1.val < l2.val) {
            curr = l1;
            l1 = l1.next;
        }
        else {
            curr = l2;
            l2 = l2.next;
        }
        head = curr;
        
        while(l1 != null && l2 != null) {
            if(l1.val <= l2.val) {
                curr.next = l1;
                l1 = l1.next;
                curr = curr.next;
            } else {
                curr.next = l2;
                l2 = l2.next;
                curr = curr.next;
            }
        }
        
        if(l1 != null)
            curr.next = l1;
        else
            curr.next = l2;
        
        return head;
    }
}
```

