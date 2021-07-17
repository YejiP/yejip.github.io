# Leetcode 206)  Reverse Linked List

![image](https://user-images.githubusercontent.com/37058233/122302599-2af57b00-ceb7-11eb-9612-c2b6061f1e4a.png)

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
    public ListNode reverseList(ListNode head) {
        ListNode curr =head;
        ListNode prev = null;

        while(curr!=null){
            ListNode temp=curr.next;
            curr.next=prev;
            prev=curr;
            //아 이 다음줄 코드! 잘못 생각하고 있었다. 
            // curr= curr.next가 이미 바뀌었는데, curr.next 사용하고 있었음. temp에 저장된 값으로 지정해줘야한다.
            curr=temp;
        }
        return prev;    
    }
}
```

# 다른 답안

- head 앞에 

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
    public ListNode reverseList(ListNode head) {
        if (head == null) {
            return head;
        }
        ListNode currentHead = head;
        while (head.next != null) {
            ListNode p = head.next;
            head.next = p.next;
            p.next = currentHead;
            currentHead = p;
        }
        return currentHead;
    }
}
```

빨간색은 내 풀이

파란색은 다른 풀이

- 뒤에랑 끊기지 않는다. 

![image](https://user-images.githubusercontent.com/37058233/125843045-51be84be-582b-4161-8a89-b8abb67a2153.png)

