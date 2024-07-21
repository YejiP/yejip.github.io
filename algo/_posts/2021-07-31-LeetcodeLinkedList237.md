# Leetcode 237) Delete Node in a Linked List

![image](https://user-images.githubusercontent.com/37058233/127905173-22e7b046-d514-498f-8f87-3597131a27f8.png)

# 내 답안

- .. 전 노드가 없으니까 못바꿈. 그냥 value를 옮겨준다.

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public void deleteNode(ListNode node) {
        ListNode prev=null;
        while(node.next!=null){
            node.val= node.next.val;
            prev=node;
            node=node.next;
            
        }
        prev.next=null;
    }
}
```



