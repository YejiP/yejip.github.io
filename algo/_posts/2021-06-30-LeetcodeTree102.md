# Leetcode 102) Binary Tree Level Order Traversal

![image](https://user-images.githubusercontent.com/37058233/124019534-0791fc00-d99e-11eb-817d-8ce84d503d3b.png)

# 내 풀이

- 재귀함수로 보내고, arraylist의 level번방에 원소 추가를 해줬다.
- 동적으로 추가되므로, 서브 어레이도 동적으로 추가해주었다.

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    List<List<Integer>> res = new ArrayList<>();
    List<Integer> tmp = new ArrayList<>();
    int level=0;
    public List<List<Integer>> levelOrder(TreeNode root) {
        if(root==null)return res;
        res.add(tmp);
        levelTree(root,0);        
        return res;
    }

    public void levelTree(TreeNode tn,int l){
        if(tn==null)return;
        if(l>level){
            List<Integer> tmp = new ArrayList<>();
            level++;
            res.add(tmp);
        }
        res.get(l).add(tn.val);
        l++; 
        levelTree(tn.left,l);
        levelTree(tn.right,l);
    }
}
```

#  다른 답안

- BFS (Breadth First Search) 이다.
  - FIFO(First In First Out)로 할것이기 때문에 Queue를 사용해서 구현을 한다.

- Queue에 넣어서 while문으로 풀었다.
  - pop할 때, pop하는 element의 left, right를 Queue에 넣어준다.

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if(root == null)
            return result;
        Queue<TreeNode> visited = new LinkedList<>();
        visited.add(root);
        while(!visited.isEmpty()){
            List<Integer> levelList = new ArrayList<>();
            int lSize = visited.size();
            for(int i = 0;i < lSize; i++){
                TreeNode vNode = visited.poll();
                levelList.add(vNode.val);
                if(vNode.left != null)
                    visited.add(vNode.left);
                if(vNode.right != null)
                    visited.add(vNode.right);
            }
            result.add(levelList);
        }
        return result;
    }
}
```

# 오답 노트

- 다음 둘이 다른 점!

  - a의 전체 코드

    ```java
    public void levelTree(TreeNode tn,int l){
        if(tn==null)return;
        if(l>level){
            List<Integer> tmp = new ArrayList<>();
            level++;
            res.add(tmp);
        }
        res.get(l).add(tn.val);
        l++;
        levelTree(tn.left,l);
        levelTree(tn.right,l);
    }
    ```

  - b의 전체 코드

    ```java
    public void levelTree(TreeNode tn,int l){
        if(tn==null)return;
        if(l>level){
            List<Integer> tmp = new ArrayList<>();
            level++;
            res.add(tmp);
        }
        res.get(l).add(tn.val);
        levelTree(tn.left,l++); //levelTree(tn.left,l++);이렇게 하면 실행된 후에 l값이 커짐
        levelTree(tn.right,l);
    }
    ```

- b에서 levelTree(tn.left,l++);이 아닌  levelTree(tn.left,++l); 로 해줘야한다.

- l값이 3이라면, leveltree(tn.left,3 ),leveltree(tn.right,3 ) 이렇게 값으로 먼저 치환 된 후 함수가 차례로 시작된다.
