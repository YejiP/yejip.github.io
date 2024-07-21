# Leetcode 707) Design Linked List

![image](https://user-images.githubusercontent.com/37058233/123596267-cbe11180-d7a6-11eb-90b7-1d74045513c2.png)

# 내 풀이

- single linked list 로 구현

```java
class MyLinkedList {
    class Node{
        int val;
        Node(){}
        Node(int val){
            this.val=val;
        }
        Node next= null;
    }

    /** Initialize your data structure here. */
    /* Node head=null;
    Node tail=null;
    head랑 tail을 직접 노드 바뀔때마다 가리키지 말고, head tail둘 다 dummy로 만들자!
    */
    Node head=new Node();
    Node tail = new Node();

    public MyLinkedList() {
        head.next= tail;
    }

    /** Get the value of the index-th node in the linked list. If the index is invalid, return -1. */
    public int get(int index) {        
        int cnt=0;
        //헤드 다음부터가 index 0에 들어가는 값 시작이니까
        Node dummy=head.next;
        //테일까지 전까지 dummy에 넣는다. tail.next 는 null이니까, 그 때 이 whlie문을 돌지 않는다.
        while(dummy.next!=null){
            if(cnt==index){
                return dummy.val;
            }
            cnt++;
            dummy=dummy.next;
        }        
        return -1;
    }
    
    /** Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. */
    public void addAtHead(int val) {
        Node newhead = new Node(val);
        newhead.next= head.next;
        head.next=newhead;
    }

    /** Append a node of value val to the last element of the linked list. */
    public void addAtTail(int val) {
        Node dummy=head;
        //tail 직전 값에서 while문 빠져나옴.
        while(dummy.next!=tail){
            dummy=dummy.next;
        }
        Node newTail = new Node(val);
        dummy.next = newTail;
        newTail.next= tail;
    }

    /** Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. */
    public void addAtIndex(int index, int val){
        int cnt=0;
        //dummy를 head.next로 주면 안된다. 그러면 0번째 원소 추가를 못함.
        Node dummy=head;
        //tail일 때 빠져나옴. tail 직전값 까지는 while문 안에 명령들이 수행된다.
        while(dummy.next!=null){
            //index=0으로 주어졌다고 가정하고 cnt 올려가면서 해보면 생각하기 더 쉽다.
            if(index==cnt){
                Node tmp = dummy.next;
                dummy.next=new Node(val);
                dummy.next.next=tmp;
                return;
            }
            dummy=dummy.next;
            cnt++;
        }
        return;
    }

    /** Delete the index-th node in the linked list, if the index is valid. */
    public void deleteAtIndex(int index) {
        int cnt=0;
        Node dummy=head;
        /*
        여기서 조건을 잘못줘서 계속 헤맸다. dummy.next를 dummy.next.next로 바꾸는 것.
        끝 값의 예외를 생각해주면서 조건을 생각하면 된다.
        가장 끝값을 생각해보면 어떻게 지울까 생각해보면, 마지막 값 앞 + tail 이렇게 붙여주면 된다. 
        그니까 dummy가 마지막 값이 될 일은 없는것이다.! dummy는 마지막 값의 앞에서 멈춤.
        */
        while(dummy.next.next!=null){
            //dummy.next!=tail 이 조건 줘도 똑같다.
            if(cnt==index){
                dummy.next=dummy.next.next;
                return;
            }
            dummy=dummy.next;
            cnt++;
        }

        return; 
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList obj = new MyLinkedList();
 * int param_1 = obj.get(index);
 * obj.addAtHead(val);
 * obj.addAtTail(val);
 * obj.addAtIndex(index,val);
 * obj.deleteAtIndex(index);
 */
```

#  다른 답안

- ?? arraylist 쓰는거 인간적으로 반칙 아님? ㅇㅁㅇ... 누가 쓸 줄 몰라서 안쓰나... 
- 하지만, 쓰지말라는 소리가 없었으므로 내 잘못! ㅎㅎ,,

```java
class MyLinkedList {

    List<Integer> list ;
    /** Initialize your data structure here. */
    public MyLinkedList() {
        list = new ArrayList<>();
    }
    
    /** Get the value of the index-th node in the linked list. If the index is invalid, return -1. */
    public int get(int index) {
        if(index < 0 || index >= list.size()){
            return -1;
        }
        return list.get(index);
    }
    
    /** Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. */
    public void addAtHead(int val) {
        list.add(0 , val);
    }
    
    /** Append a node of value val to the last element of the linked list. */
    public void addAtTail(int val) {
        list.add(val);
    }
    
    /** Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. */
    public void addAtIndex(int index, int val) {
        if(index < 0 || index > list.size()){
            return ;
        }
        if(list.size() == index){
            list.add(val);
        }
        else if(list.size() > index){
            list.add(index , val);
        }   
    }
    
    /** Delete the index-th node in the linked list, if the index is valid. */
    public void deleteAtIndex(int index) {
        if(index < 0 || index >= list.size()){
            return ;
        }
        list.remove(index);
        
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList obj = new MyLinkedList();
 * int param_1 = obj.get(index);
 * obj.addAtHead(val);
 * obj.addAtTail(val);
 * obj.addAtIndex(index,val);
 * obj.deleteAtIndex(index);
 */
```

