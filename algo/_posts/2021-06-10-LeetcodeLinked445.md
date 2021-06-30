# Leetcode 445) Add Two Numbers II

![image](https://user-images.githubusercontent.com/37058233/121616934-bd5dd080-ca18-11eb-83b3-0b8d4740d27f.png)

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
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        Stack<Integer> r1=new Stack<>();
        Stack<Integer> r2 = new Stack<>();
        Stack<Integer> sum = new Stack<>();
        sum.push(0);

        ListNode tmp1=l1;
        ListNode tmp2=l2;
        while(tmp1!=null){
            r1.push(tmp1.val);
            tmp1= tmp1.next;   
        }
        while(tmp2!=null){
            r2.push(tmp2.val); 
            tmp2= tmp2.next;   
        }
        //아래 코드 보니까, 이 부분에서 굳이 &&을 안해도 됐었다. ||으로 해서 한번에 처리 가능
        while(!r1.empty() && !r2.empty()){
            int val=r1.pop()+r2.pop()+sum.pop();
            int up=0;
            if(val/10>0){
                up++;
            }
            sum.push(val%10);
            sum.push(up);
        }
        while(!r1.empty()){
            int val=sum.pop() + r1.pop();
            int up=0;
            if(val/10>0){
                up++;
            }
            sum.push(val%10);
            sum.push(up);
        }
        while(!r2.empty()){
            int val=sum.pop() + r2.pop();
            int up=0;
            if(val/10>0){
                up++;
            }
            sum.push(val%10);
            sum.push(up);
        }
        if(sum.peek()==0)sum.pop();
        ListNode res=new ListNode(sum.pop());
        ListNode tmp = res;
        while(!sum.empty()){
            tmp.next=new ListNode(sum.pop());
            tmp=tmp.next;
        }


        return res;
    }
}
```

# 다른 답안

- 스택 사용해서

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
        Stack<Integer> s1= new Stack<>();
        Stack<Integer> s2= new Stack<>();
        while(l1 !=null){
            s1.push(l1.val);
            l1=l1.next
        }
        while(l2 !=null){
            s2.push(l2.val);
            l2=l2.next
        }
        int carry=0;
        ListNode newHead=null;
        while(!s1.isEmpty() || s2.isEmpty() || carry !=0){
            //헐 대박 멋진 코드부분. empty 면 0을
            int n1= s1.isEmpty() ? 0 : s1.pop();
            int n2 = s2.isEmpty() ? 0 : s2.pop();
            int tmp = n1 +n2 + carry;
            ListNode newNode = new ListNode(tmp%10);
            newNode.next = newHead;
            newHead = newNode;
            carry=tmp/10;
        }
        return  newHead;
    }
}
```

- 공간 더 사용하지 말라면, 아마 이렇게 reverse해서 계산하면 좋을 듯

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
    public ListNode reverse(ListNode node) {
        ListNode pre = null;
        while(node != null) {
            ListNode next = node.next;
            node.next = pre;
            pre = node;
            node = next;
        }
        return pre;
    }

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        l1 = reverse(l1);
        l2 = reverse(l2);
        ListNode res = new ListNode(0);
        ListNode pre = res;
        int carry = 0;

        while(l1 != null || l2 != null) {
            int sum = carry;
            if(l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }

            if(l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }

            res.next = new ListNode(sum%10);
            res = res.next;
            carry = sum/10;

        }

        if(carry != 0) {
            res.next = new ListNode(carry);    
        }

        return reverse(pre.next);
    }
}
```



# 오답노트

- tmpl1 을 res.next로 가리킨 다음에 다시 새로운 객체를 할당했으니까 res와 연결이 끊겼다

```java
ListNode tmpl1=res.next;
//l1은 포인터로 안 가리켜도 된다. 사라져도 어차피 값을 저장한 후기때문에 상관없음
l1=l1.next;
i--;
while(i>j){
    tmpl1=new ListNode(l1.val);
    l1=l1.next;
    i--;
    tmpl1=tmpl1.next;
}
```

