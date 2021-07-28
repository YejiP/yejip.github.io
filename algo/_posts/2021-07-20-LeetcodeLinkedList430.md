# Leetcode 430) Numbers of Islands

![image](https://user-images.githubusercontent.com/37058233/126377567-78b7a2d1-2560-4b3c-b14f-a0bbea8bc365.png)

![image](https://user-images.githubusercontent.com/37058233/126377633-8204533e-7379-4a1a-88a9-e1ef0b2fddd1.png)

# 내 답안

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node prev;
    public Node next;
    public Node child;
};
*/

class Solution {
    public Node flatten(Node head) {
        if(head==null)return head;

        Node answer=head;  
        flat(head);
        return answer;
    }

    public Node flat(Node cur){
        while(cur.child==null){
            if(cur.next==null){
                return cur; //break해도 될 거 같은데, 좀 더 확실하게 하기 위해서
            }
            cur = cur.next;
        }

        Node tmp=cur.next;
        cur.next=cur.child;
        cur.child.prev=cur;
        cur.child=null;
        //cur child가 cur next된 후
        // Node res=flatten(cur.child); cur.child는 null이자낭..
        Node res=flat(cur);
        res.next=tmp;
        if(tmp!=null){
            tmp.prev=res;
            cur=tmp;
        }
        //여기서 return 값이 잘못됨!
        // return cur;
        while(cur.child==null){
            if(cur.next==null){
                break; //break해도 될 거 같은데, 좀 더 확실하게 하기 위해서
            }
            cur = cur.next;
        }
        return cur;
    }
}
```

#  다른 답안

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node prev;
    public Node next;
    public Node child;
};
*/

class Solution {
    public Node flatten(Node head) {
        Node dummy = new Node(0);
        myFlatten(dummy, head);
        if (dummy.next != null) {
            dummy.next.prev = null;
        }
        return dummy.next;
    }
    
    public Node myFlatten(Node prev, Node crt) {
        if (crt == null) {
            return prev;
        }
        prev.next = crt;
        crt.prev = prev;
        Node next = crt.next;
        Node tail = myFlatten(crt, crt.child);
        crt.child = null;
        return myFlatten(tail, next);
    }
}
```



