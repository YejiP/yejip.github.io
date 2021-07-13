# Leetcode 98) Validate Binary Search Tree

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
    public boolean isValidBST(TreeNode root){
        if(root==null){return true;}
        return examine(root);
    }
    public boolean examine(TreeNode tn){
        if (tn==null){
            return true;
        }
        TreeNode r = tn.right;
        TreeNode l = tn.left;
        if(r==null && l==null)return true;

        if(r==null){
            if(tn.val<=l.val){
                return false;
            }
        }else{
            while(r.left!=null){
                r=r.left;}
            if(r.val <=tn.val)return false;
        }

        if(l==null){
            if(tn.val>=r.val)return false;
        }else{
            while(l.right!=null){
                l=l.right;
            }
            if(l.val >=tn.val)return false;

        }
        return examine(tn.left) && examine(tn.right);
    }


}
```

#  다른 답안

```java
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
    public boolean isValidBST(TreeNode root) {        
        return isValid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    
    
    boolean isValid(TreeNode root, long min, long max) {
        if (root == null) return true;
        
        if (root.val <= min || root.val >= max) return false;
        
        return isValid(root.left, min, root.val) && isValid(root.right, root.val, max);
    }
}
```



