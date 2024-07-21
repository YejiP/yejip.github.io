# Leetcode 144) Binary Tree Preorder Traversal

![image](https://user-images.githubusercontent.com/37058233/123880696-0f976080-d8f8-11eb-81bc-b65e26e82d69.png)

# 내 풀이

- 정답 보고 나니까, 쓸모 없는 코드가 보인다. 
  - if (tn==null) 이 부분, 전혀 실행되지 않는다.  왜냐면 애초에 if문으로 걸러서.. root가 null일때만 사용될 수 있는데, root==null은 preorder 시작 전에 또 걸러서 결국엔 실행이 한번도 되지 않게된다.
  - 정답엔 null이 포함이 안되는데 왜 null을 썼는지.. 어쨌든 

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
    List<Integer> order = new ArrayList<>();
    public List<Integer> preorderTraversal(TreeNode root) {
        if(root==null)return order;
        preorder(root);
        return order;
    }
    public void preorder(TreeNode tn){
        if(tn==null){
            order.add(null);
            return;}
        order.add(tn.val);
        if(tn.left!=null){
            preorder(tn.left);
        }
        if(tn.right!=null){
            preorder(tn.right);
        }
    }
}
```

#  다른 답안

- recursive하게
- 내 답안이랑 조금 다른 이유, 나는 recursive함수가 시작하면 그 노드의 값을 list에 담게해서 null값이면 애초에 함수 실행을 안했고, 여기는 null값이어도 함수 실행

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
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<Integer>();
        getPreorderList(root,ans);
        return ans;
    }

    public void getPreorderList(TreeNode root, List<Integer> ans){
        if(root==null){
            return;
        }
        ans.add(root.val);
        getPreorderList(root.left,ans);
        getPreorderList(root.right,ans);
    }
}
```

- iterative 하게

```java
```

