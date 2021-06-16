# Leetcode 160)  Intersection of Two Linked Lists

![image](https://user-images.githubusercontent.com/37058233/122302932-a6572c80-ceb7-11eb-89b0-9441a536e42b.png)

# 내 풀이

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        //stack 에 넣어서? linkedlist 풀이법 정리하면서, linkedlist의 한계또한 같이 정리하자.
        Stack<ListNode> a = new Stack<>();
        Stack<ListNode> b = new Stack<>();
        ListNode tmp_a= headA;
        ListNode tmp_b = headB;
        while(tmp_a!=null){
            a.push(tmp_a);
            tmp_a = tmp_a.next;
        }
        //조건을 
        while(tmp_b!=null){
            b.push(tmp_b);
            tmp_b=tmp_b.next;
        }
        if(b.empty() || a.empty()){
            return null;
        }
        ListNode apop=a.pop();
        ListNode bpop =b.pop();

        if(apop!=bpop){
            return null;
        }

        ListNode intersect=apop;
        while(apop==bpop && !a.empty() && !b.empty()){
            intersect=apop;
            apop=a.pop();
            bpop=b.pop();
        }
        if(apop==bpop){intersect=apop;}
        	return intersect;
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
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode dummy_a = headA;
        ListNode dummy_b = headB;
        if(headA==null || headB==null){return null;}
        ListNode res=null;
        //같이 traverse하는겨
        while(dummy_a !=dummy_b){
            //근데 없어서 계속 순회하면? => 아 그래도 두번째 바퀴에서 null 값에 똑같이 도달하니까, while문에서 빠진다.
            dummy_a= dummy_a.next;
            dummy_b= dummy_b.next;
            if(dummy_a==null && dummy_b==null){
                return null;
            }
            if(dummy_a==null){
                dummy_a=headB;
            }
            if(dummy_b==null){
                dummy_b =headA;
            }
        }
        if(dummy_a==dummy_b && dummy_a!=null){
            res= dummy_a;
        }
        return res;
        }
}
```

![image](https://user-images.githubusercontent.com/37058233/122303231-12399500-ceb8-11eb-9ee6-8fc112785777.png)

- 이렇게 연결하면, 원 찾는 문제랑 같아진다.