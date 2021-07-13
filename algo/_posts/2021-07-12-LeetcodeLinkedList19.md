# Leetcode 19) Remove Nth Node From End of List

![image](https://user-images.githubusercontent.com/37058233/125331591-085f5200-e2fd-11eb-9192-18ff2d9dc8df.png)

# 내 답안

- 뒤에서 부터 해야하니까 stack에 넣어주고 주어진 수 만큼 pop하면서 
- 끝값이 pop할 때, 마지막 값이 pop할 때의 예외 처리를 해준다.

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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        Stack<ListNode> s = new Stack<>();
        ListNode dummy = head;
        //stack에 담고
        while(dummy!=null){
            s.add(dummy);
            dummy=dummy.next;
        }
        ListNode res=head;
        //pop하기
        ListNode target=null;
        for(int i =0;i<n;i++){
            s.pop();
        }
        //head를 팝한다는 소리
        if(s.isEmpty()){
            return head.next;
        }
        target=s.pop();
        target.next= target.next.next;
        return head;
    }
}
```

#  다른 답안

- 6개의 원소 중 끝에서 두번째를 6-4 이런 느낌에서 -2+6 로 바꿈!!!
- pointer을 두개 사용했다. 
  - 하나는 cur해서 멈춤없이 수정없이 끝까지 순회하는 애, 
  - 다른 하나는 **cur에 대해서 n전**을 가리키는 포인터 (목적 노드 바로 전 노드를 가리켜야지 다음거랑 붙일 수 있으니까)
    - cur에서 n전인 노드를 만드는게 핵심!!

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
 class Solution { // Zuo 100%
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode cur = head;
        ListNode pre = null;
        while (cur != null) {
            n--;
            //오 수학 좀 하는디..
            if (n == -1) {
                pre = head;
            }
            if (n < -1) {
                pre = pre.next;
            }
            cur = cur.next;
        }

        if (pre == null) {
            return head.next;
        }
        pre.next = pre.next.next;
        return head;
    }
}
```

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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode cur = head;
        ListNode target =head;
        if(head.next==null){
            return null;   
        }
        if(n==1){
            while(cur.next.next!=null){
                cur=cur.next;
            }
            cur.next=null;
            return head;
        }
        
        while(cur!=null){
            n--;
            cur=cur.next;
            target=target.next;
            if(n==-1){
                target=head;
            }
        }
        if(target==null){return head.next;}
        target.next = target.next.next;
        return head;
    }
}
```



# 오답

- head가 pop되서 사라지면 head가 null이된다! 그러면 return 값이 null이 돼서, 이거를 체크해줘야한다.

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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        Stack<ListNode> s = new Stack<>();
        ListNode dummy = head;

        //stack에 담고
        while(dummy!=null){
            s.add(dummy);
            dummy=dummy.next;
        }

        //pop하기
        ListNode target=null;
        for(int i =0;i<n;i++){
            s.pop();
        }
        //head를 팝해야할 떄면 여기서 문제가 됐다! 
        if(s.isEmpty())return null;
        target=s.pop();
        target.next= target.next.next;
        return head;
    }
}
```



