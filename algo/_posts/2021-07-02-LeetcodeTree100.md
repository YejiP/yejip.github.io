# Leetcode 100) Same Tree

# 내 답안

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
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if(p==null && q==null){
            return true;
        }else if(p==null){
            return false;
        }else if(q==null){
            return false;
        }
        return compare(p,q);
    }

    public boolean compare(TreeNode p, TreeNode q){
        if(p==null && q==null){
            return true;
        }else if(p==null){
            return false;
        }else if(q==null){
            return false;
        }
        if(p.val!=q.val){return false;}

        if(!compare(p.left,q.left)){return false;}
        if(!compare(p.right,q.right)){return false;}
        return true;
    }

}
```

#  다른 답안

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
    public boolean isSameTree(TreeNode p, TreeNode q) {
      if(p==null && q==null) return true;
      if(p==null || q== null) return false;
      if(p.val == q.val) {
          return isSameTree(p.left,q.left) && isSameTree(p.right,q.right);
      }
      return false;
    } 
}
```