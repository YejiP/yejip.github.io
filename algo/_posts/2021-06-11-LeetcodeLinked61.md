# Leetcode 61)  Rotate List

![image](https://user-images.githubusercontent.com/37058233/121758799-ccf01e80-cad7-11eb-96ca-906df0945eec.png)

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
    public ListNode rotateRight(ListNode head, int k) {
        //k번째 다음이 null인지 확인,  거기서 null끊고, 처음을 마지막에 연결
        if(head==null || k==0){return head;}
        ListNode tmp = head;
        int cnt=0;
        while(tmp.next!=null){
            cnt++;
            tmp=tmp.next;
        }
        tmp.next=head;
        ListNode tmp2= head;
        int here = cnt-k;
        if(here<0){
            //길이라서
            here= k%(++cnt);
            here=cnt-here;
            here--;//인덱스 개념으로 다시 바꿔준다. 위에서 ++해서 길이 개념으로 바꿔줬으니까...
        }

        for(int i =0;i<here;i++){
            tmp2=tmp2.next;
        }
        ListNode newHead=tmp2.next;
        tmp2.next=null;
        return newHead;
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
    public ListNode rotateRight(ListNode head, int k) {
        if(k==0 || head==null || head.next==null) return head;
        ListNode lastNode = head;
        int length = 1;
        
        while(lastNode.next != null){
            lastNode = lastNode.next;
            length++;
        }
        
        lastNode.next = head;
        lastNode = head;
        k%=length;
        k = length-k;
        for(int i=0;i<k-1;i++){
            lastNode = lastNode.next;
        }
        head = lastNode.next;
        lastNode.next = null;
        
        return head;
    }
}
```

# 오답노트



