# Leetcode 203) Remove Linked List Elements

![image](https://user-images.githubusercontent.com/37058233/125386204-bcd69380-e350-11eb-89fe-721d71ae9da9.png)

# 내 답안

- 삭제하고 나서는 next하면 안되는데 계속 next해서 오답됐다.

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
//아 !!! head, tail dummy 만들어주기로했지!!
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        if(head==null){return null;}
        
        ListNode h_dummy  = new ListNode();
        h_dummy.next=head;
        ListNode dummy=h_dummy;
        //맨 첫 원소가 val과 같을 때의 예외처리 코드
        while(dummy.next!=null){
            if(dummy.next.val==val){
                dummy.next=dummy.next.next;
            }else{
                dummy= dummy.next;
            }
            //if문에서 dummy.next.next 할당해준 것, 이것을 
        }
        //while문 나왔을 때, 마지막 dummy 이미 확인 된거구나
        return h_dummy.next;
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
    public ListNode removeElements(ListNode head, int val) {
        if(head == null){
            return head;
        }
        ListNode temp = removeElements(head.next, val);
        if(head.val == val){
            return temp;
        }
        head.next = temp;
        return head;
    }
}
```

# 오답

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
//아 !!! head, tail dummy 만들어주기로했지!!
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        if(head==null){return null;}
        
        ListNode h_dummy  = new ListNode();
        h_dummy.next=head;
        ListNode dummy=h_dummy;
        //맨 첫 원소가 val과 같을 때의 예외처리 코드
        while(dummy.next!=null){
            if(dummy.next.val==val){
                dummy.next=dummy.next.next;
            }
            dummy= dummy.next;
            //if문에서 dummy.next.next 할당해준 것, 이것을 
        }
        //while문 나왔을 때, 마지막 dummy 이미 확인 된거구나
        return h_dummy;
    }
}
```

