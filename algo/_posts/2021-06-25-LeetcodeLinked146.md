# Leetcode 146) LRU Cache

![image](https://user-images.githubusercontent.com/37058233/123464565-d67e8980-d5a1-11eb-9954-bfe7ab73a5e2.png)

# 내 풀이

- LinkedHashMap 사용했다.. 성능 쓰레기임. Hashmap은 순서가 딱히 없고, LinkedHashMap은 들어온 순서가 있다.
- 아무래도 이 문제의 의도는 LinkedHashMap을 쓰는건 아니었던듯 싶다... 
- 다시 풀기. 이번엔 Doubly Linkedlist로 

```java
class LRUCache {
    int cnt=0;
    Map<Integer,Integer> source = new LinkedHashMap<>();

    public LRUCache(int capacity) {
        cnt=capacity;
    }

    public int get(int key) {
        int i=0;
        if(source.get(key)!=null){
            int val=source.get(key); 
            source.remove(key);
            source.put(key,val);
            return val;}
        return -1;
    }

    public void put(int key, int value) {
        if(source.get(key)!=null){
            source.remove(key);
            source.put(key,value);
            return;
        }       

        if(cnt==0){
            int a = source.keySet().stream().findFirst().get();
            System.out.println(a);
            System.out.println(key);

            source.remove(a);
            cnt++;
        }
        source.put(key,value);
        cnt--;
    }

}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */
```

#  다른 답안

```java
class LRUCache {
    class Node{
        int value;
        int key;
        Node next = null;
        Node prev = null;
        Node(int v, int k){
            value = v;
            key = k;
        }
    }
    
    Node head = null, tail = null;
    HashMap<Integer, Node> map = new HashMap<>();
    int capacity = 0;
    int size = 0;
    public LRUCache(int capacity) {
        this.capacity = capacity;
    }
    
    public int get(int key) {
        if(!map.containsKey(key))
            return -1;
        Node n = map.get(key);
        moveNodeToFront(n);
        return n.value;
    }
    
    private void moveNodeToFront(Node n){
        if(n == head)
            return;
        if(n == tail){
            n.prev.next = null;
            tail = n.prev;
            n.next = head;
            head.prev = n;
            n.prev = null;
            head = n;
        }else{
            n.prev.next = n.next;
            n.next.prev = n.prev;
            n.next = head;
            head.prev = n;
            n.prev = null;
            head = n;
        }
    }
    public void put(int key, int value) {
        if(map.containsKey(key)){
            Node n = map.get(key);
            n.value = value;
            moveNodeToFront(n);
            return;
        }
        if(size == capacity){
            size--;
            map.remove(tail.key);
            if(tail == head){
                tail = head = null;
            }else{
                tail = tail.prev;
                tail.next = null;
            }
        }
        
        Node n = new Node(value, key);
        map.put(key, n);
        size++;
        if(head == null){
            head = tail = n;
        }else{
            n.next = head;
            head.prev = n;
            head = n;
        }        
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */
```

# 오답노트

- head랑 tail을 dummy로 해서 위치를 지켜주면 exception 신경쓸게준다...!! 

  ```java
  //이렇게 head인 노드를 직접 가리키기보다는
  Node head; Node tail;
  //head,tail을 할당하고 head.next에 진짜 head를 넣는다. 
  Node head= new Node();
  Node tail = new Node();
  ```

- .......... 흠.. 푸느라 ㅈㄴ 오래걸렸다. 링크 하나를 안했는데 모르고 있었음. 양방향인지 확인 안한 내 잘못...

```java
class LRUCache {
    class Node{
        int key;int value;
        Node next=null;
        Node prev =null;
        Node(){
        }
        Node(int k, int v){
            key=k;value=v;
        }
    }

    int max; 
    Node head = new Node(); 
    Node tail = new Node();
    Map<Integer,Node> m = new HashMap<>();

    public LRUCache(int capacity) {
        max=capacity;
        head.next= tail;
        tail.prev= head;
    }

    public int get(int key){
        if(m.containsKey(key)){
            changePosition(m.get(key));
            return m.get(key).value;
        }

        return -1;

    }
    public void changePosition(Node cur){
        Node a = cur.prev;
        Node b= cur.next;
        a.next=b;
        b.prev = a;
        cur.prev= tail.prev;
        tail.prev.next=cur;
        cur.next=tail;
        tail.prev=cur;
    }

    public void put(int key, int value) {
        if(!m.containsKey(key)){
            if(max==m.size()){
                Node old = head.next;
                head.next=old.next;
                old.next.prev=head;
                m.remove(old.key);
            }
            Node newNode= new Node(key,value);
            m.put(key,newNode);
            tail.prev.next=newNode;
            newNode.prev=tail.prev;
            newNode.next=tail;
            tail.prev=newNode;        

        }else{
            //key 이미 있는 경우
            changePosition(m.get(key));
            m.get(key).value= value;
        }
    }


}
/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */
```

