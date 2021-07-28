# Leetcode 133) Clone Graph

![image](https://user-images.githubusercontent.com/37058233/126378087-965d9cb3-2af4-4a7f-9dc6-dbd6d56adbc2.png)![image](https://user-images.githubusercontent.com/37058233/126378132-4225862f-f863-4d7f-9083-8f70b1b5931d.png)



# 내 답안

- 자료 구조 두개를 사용하려고 한다. Dictionary, ArrayList
  - Dictionary는 그래프 노드가 이전에 등장했는지를 체크해준다. 그리고 node 이웃 연결시 편하게
  - ArrayList는 아직 처리 안된 노드를 담는다. 만약 ArrayList가 비었으면 그럼 다 순회한 것이므로 끝.
    - 이걸 한번에 할 수 있는 방법이 있을까?

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/

class Solution {
    public Node cloneGraph(Node node) {
        if(node == null)return null;
        Map <Integer,Node> map = new HashMap<>();
        Map<Integer,Node> nmap =  new HashMap<>();
        List<Node> unvisited = new ArrayList<>();
        map.put(node.val,node);
        unvisited.add(node);


        Node res= new Node(node.val);
        nmap.put(res.val,res);


        while(!unvisited.isEmpty()){

            Node cur = unvisited.get(0);
            unvisited.remove(0); // queue처럼 .. 그냥 queue를 사용해라..

            Node nCur = nmap.get(cur.val);

            List<Node> nei = cur.neighbors;
            List<Node> nnei = new ArrayList<>();

            for(Node a : nei){
                //System.out.print(na.val +",");
                if(!map.containsKey(a.val)){
                    map.put(a.val,a);
                    unvisited.add(a);    
                    Node na= new Node(a.val);
                    nmap.put(na.val,na);
                    nnei.add(na);
                }else{
                    nnei.add(nmap.get(a.val));
                }              
            }
            nCur.neighbors =nnei;
        }
        return res;
    }
}
```

#  다른 답안

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/

class Solution {
    Map<Node, Node> originalToClonedNodeMap = new HashMap<>();
    public Node cloneGraph(Node node) {
        if (node == null) {
            return node;
        }

        if (originalToClonedNodeMap.containsKey(node)) {
            return originalToClonedNodeMap.get(node);
        }

        Node clonedNode = new Node(node.val, new ArrayList<Node>());
        originalToClonedNodeMap.put(node, clonedNode);
        for (Node neighbor : node.neighbors) {
            clonedNode.neighbors.add(cloneGraph(neighbor));
        }

        return clonedNode;
    }
}
```

# 오답

- 아.. 기존에 있는 답이면 새로 만들면 안되네.. nnei에서
- 여기서 잘못함. (nnei.add(na) 이렇게 하면, 있는 노드들이랑 연결이 안되고 새로 만들어지니까 안된다.)

```java

for(Node a : nei){

    Node na= new Node(a.val);
    nnei.add(na);
    //System.out.print(na.val +",");

    if(!map.containsKey(a.val)){
        map.put(a.val,a);
        unvisited.add(a);    
        newGraph.add(na);
    }              
}
```



```java
/*
// Definition for a Node.
class Node {
public int val;
public List<Node> neighbors;
public Node() {
val = 0;
neighbors = new ArrayList<Node>();
}
public Node(int _val) {
val = _val;
neighbors = new ArrayList<Node>();
}
public Node(int _val, ArrayList<Node> _neighbors) {
val = _val;
neighbors = _neighbors;
}
}
*/

class Solution {
    public Node cloneGraph(Node node) {
        Map <Integer,Node> map = new HashMap<>();
        List<Node> unvisited = new ArrayList<>();
        List<Node> newGraph = new ArrayList<>();

        map.put(node.val,node);
        unvisited.add(node);

        Node res= new Node(node.val);
        newGraph.add(res);
        Node nCur=null;

        while(!unvisited.isEmpty()){
            nCur=newGraph.get(0);
            System.out.println("\n"+nCur.val);

            newGraph.remove(0);

            Node cur = unvisited.get(0);
            unvisited.remove(0); // queue처럼 .. 그냥 queue를 사용해라..

            List<Node> nei = cur.neighbors;
            List<Node> nnei = new ArrayList<>();

            for(Node a : nei){

                Node na= new Node(a.val);
                nnei.add(na);
                //System.out.print(na.val +",");

                if(!map.containsKey(a.val)){
                    map.put(a.val,a);
                    unvisited.add(a);    
                    newGraph.add(na);
                }              
            }
            nCur.neighbors =nnei;


        }
        return res;
    }
}
```



