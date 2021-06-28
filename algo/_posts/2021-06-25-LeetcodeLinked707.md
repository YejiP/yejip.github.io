# Leetcode 707) Design Linked List

![image](https://user-images.githubusercontent.com/37058233/123596267-cbe11180-d7a6-11eb-90b7-1d74045513c2.png)

# 내 풀이 

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
        Node dummy=head.next;
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
        Node dummy=head;
        while(dummy.next!=null){
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
        while(dummy.next.next!=null){
            if(cnt==index){
                System.out.println("d" +dummy.next.val );
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

