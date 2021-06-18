# Leetcode 138) Copy LIst with Random Pointer

![image](https://user-images.githubusercontent.com/37058233/122441662-9b050f00-cf52-11eb-84df-e3db5eb20b68.png)

# 내 풀이

```java
/*
// Definition for a Node.
class Node {
    int val;
    Node next;
    Node random;

    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}
*/
class Solution {
    public Node copyRandomList(Node head){
        if(head==null){
            return null;
        }
        Node res = new Node(head.val);
        res.random=head.random;
        Node dummy =res;
        Node hdummy = head;
        while(hdummy.next!=null){
            hdummy = hdummy.next;
            dummy.next = new Node(hdummy.val);
            dummy=dummy.next;
        }

        dummy =res;
        hdummy = head;
        while(hdummy!=null){
            if(hdummy.random!=null){
                Node htemp = head;
                Node temp = res;
                while(htemp != hdummy.random){
                    htemp=htemp.next;
                    temp=temp.next;
                }
                dummy.random=temp;
            }else{
            }
            hdummy=hdummy.next;
            dummy=dummy.next;
        }
        return res;
    }
}
```

# 다른 답안

```java
/*
// Definition for a Node.
class Node {
    int val;
    Node next;
    Node random;

    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}
*/

class Solution {
    public Node copyRandomList(Node head) {
        if(head == null)return null;

        Map<Node,Node> map = new HashMap<>();

        Node iter = head;
        while (iter !=null){
            map.put(iter, new Node(iter.val));
            iter =iter.next;
        }

        iter = head;

        while(iter != null){
            map.get(iter).next = map.get(iter.next);
            map.get(iter).random =  map.get(iter.random);
            iter =iter.next;
        }
        return map.get(head);
    }
}
```

