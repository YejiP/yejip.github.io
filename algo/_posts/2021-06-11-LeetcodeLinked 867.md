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



