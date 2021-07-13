# Leetcode 2) Add Two Numbers

![image](https://user-images.githubusercontent.com/37058233/125367072-4d4ead00-e32c-11eb-98a8-5108c6beca58.png)

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
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode d1 = l1;
        ListNode d2=l2;
        //header느낌으로 해주자. 나중에 반환할 때 res=res.next한 후에 반환하면 되니까?
        ListNode res=new ListNode(0);
        ListNode dr =res;
        int carry=0;
        while(d1!=null && d2!=null){
            int sum=d1.val+d2.val +carry;
            carry=sum/10;
            sum = sum%10;
            dr.next = new ListNode(sum);
            dr=dr.next;
            d1=d1.next;
            d2=d2.next;
        }
        while(d1!=null){
            int sum = d1.val+carry;
            carry= sum/10;
            sum = sum%10;
            dr.next = new ListNode(sum);
            dr=dr.next;
            d1=d1.next;
        }
        while(d2!=null){
            int sum = d2.val+carry;
            carry=sum/10;
            sum = sum%10;
            dr.next=new ListNode(sum);
            dr=dr.next;
            d2=d2.next;
        }
        if(carry==1){
            dr.next=new ListNode(1);
        }
        return res.next;
    }
}
```

#  다른 답안

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
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        if (l1 == null) return l2;
        if (l2 == null) return l1;
        int c = 0;
        int s = 0;
        ListNode prehead = new ListNode(-1);
        ListNode prev = prehead;
        while (l1 != null || l2 != null) {
            int a = (l1 == null) ? 0 : l1.val;
            int b = (l2 == null) ? 0 : l2.val;
            s = a + b + c;
            prev.next = new ListNode(s%10);
            c = s / 10;
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
            prev = prev.next;
        }
        if (c == 1) {
            prev.next = new ListNode(c);
        }
        return prehead.next;
    }
}
```