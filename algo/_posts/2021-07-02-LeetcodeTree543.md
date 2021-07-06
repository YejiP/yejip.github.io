# Leetcode 543) Diameter of Binary Tree

![image](https://user-images.githubusercontent.com/37058233/124337936-03aad900-db5a-11eb-8316-9a5fee7ae7f1.png)

# 내 답안

- leaf 노드부터 올라오면서 더해준다.

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
    //단순하게 모든 노드의 level을 표시하게 recursive하게 만든다.
    int max=0;
    public int diameterOfBinaryTree(TreeNode root) {
        level(root);
    
        return max;
    }
    
    public int level(TreeNode tn){
        if(tn==null)return 0;
        
        int d_left =level(tn.left);
        int d_right =level(tn.right);
        int lrsum=d_left+d_right;
        if(lrsum>max){
            max=lrsum;
        }
        if(d_left>=d_right){
            return ++d_left;
        }
        return ++d_right; 
    }
}
```

#  다른 답안

- 같은 논리

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
    int max = 0;
    public int diameterOfBinaryTree(TreeNode root) {
        maxDepth(root);
        return max;
    }
    
    public int maxDepth(TreeNode root){
        if (root == null) return 0;
        int left = maxDepth(root.left);
        int right = maxDepth(root.right);
        max = Math.max(max, left+right);
        return 1 + Math.max(left,right);        
    }
}
```