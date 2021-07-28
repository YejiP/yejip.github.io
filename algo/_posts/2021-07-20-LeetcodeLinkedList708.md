# Leetcode 708)  Insert into a Sorted Circular Linked List

![image](https://user-images.githubusercontent.com/37058233/126407735-835a3f04-5fcf-4631-b040-c7e03dccb4f7.png)

# 내 답안

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _next) {
        val = _val;
        next = _next;
    }
};
*/

class Solution {
    public Node insert(Node head, int insertVal) {
        if(head==null){
            Node a = new Node(insertVal);
            a.next=a;
            return a;
        }


        //head가 null일 수가 없다. head next도 null일 수 없음
        //fast slow 테크닉으로, 원 다 돌았는지도 체크
        Node res= head;
        Node fast= head;
        Node highest = head;
        while(true){
            if(head.val >= highest.val){
                highest= head;
            }
            if(head.val<=insertVal && insertVal <=head.next.val){
                Node tmp= head.next;
                Node a = new Node(insertVal);
                head.next= a;
                a.next=tmp;
                return res;
            }
            head=head.next;
            fast= fast.next.next;
            if(fast==head){
                Node tmp=highest.next;
                highest.next= new Node(insertVal);
                highest.next.next= tmp;
                return res;
            }
        }


    }
}
```

#  다른 답안

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _next) {
        val = _val;
        next = _next;
    }
};
*/

class Solution {
    public Node insert(Node head, int insertVal) {
        if (head == null) {
            Node node = new Node(insertVal);
            node.next = node;
            return node;
        }
        Node current = head;
        while (true) {
            if (current.val < current.next.val) {
                if (insertVal >= current.val && insertVal <= current.next.val) {
                    insertAfter(current, insertVal);
                    break;
                }
            } else if (current.val > current.next.val) {
                if (insertVal >= current.val || insertVal <= current.next.val) {
                    insertAfter(current, insertVal);
                    break;
                }
            } else {
                if (current.next == head) {
                    insertAfter(current, insertVal);
                    break;
                }
            }
            current = current.next;
        }
        return head;
    }
    
    private void insertAfter(Node node, int insertVal) {
        Node next = new Node(insertVal, node.next);
        node.next = next;
    }
}
```

# 오답

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _next) {
        val = _val;
        next = _next;
    }
};
*/

class Solution {
    public Node insert(Node head, int insertVal) {
        if(head==null)return new Node(insertVal);

        //head가 null일 수가 없다. head next도 null일 수 없음

        /*
        오답, 조건을 이렇게 주면 안된다. 왜냐면 문제가 순차적으로 정렬돼있는게 아니라서..
        먼저 최솟값으로 헤드를 돌려놔야할듯?
        while(head.next.val <= insertVal){
            head=head.next;
        }*/
        Node prev = null;

        if(head.val >= insertVal){
            System.out.println(head.val);
            //조건 또 잘못됨 
            while(head.val >= head.next.val){
                prev=head;
                head=head.next;
            }
        }

        while(head.val <= insertVal){
            prev=head;
            head=head.next;}

        Node tmp = head;
        prev.next= new Node(insertVal);
        prev.next.next=tmp;
        return head;
    }
}
```

