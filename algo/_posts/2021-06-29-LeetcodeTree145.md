# Leetcode 145) Binary Tree Postorder Traversal

![image](https://user-images.githubusercontent.com/37058233/123919086-696c4a80-d939-11eb-85fe-a085d7e8a59f.png)

# 내 풀이

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
    List<Integer> res = new ArrayList<>();
    public List<Integer> postorderTraversal(TreeNode root) {
        if(root==null)return res;
        postorder(root);
        return res;
    }
    public void postorder(TreeNode tn){
        if(tn.left!=null){
            postorder(tn.left);
        }
        if(tn.right!=null){
            postorder(tn.right);
        }
        res.add(tn.val);
    }
}
```

#  다른 답안

```java
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res=new ArrayList<>();
        helper(root,res);
        return res;
    }
    public void helper(TreeNode root,List<Integer>res){
        if(root != null){
            if(root.left != null){
                helper(root.left,res);
            }
            if(root.right != null){
                helper(root.right,res);
            }
            res.add(root.val);
        }
    }
}
```

