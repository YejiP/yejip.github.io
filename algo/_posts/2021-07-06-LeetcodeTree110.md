# Leetcode 110) Balanced Binary Tree

![image](https://user-images.githubusercontent.com/37058233/124665915-2bec4d80-de62-11eb-83b6-a38726debbcd.png)

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
    public boolean isBalanced(TreeNode root) {
        if(root==null){
            return true;
        }
        if(balance(root)==-1){
            return false;
        }
        return true;
    }
    
    public int balance(TreeNode tn){
        if(tn==null){
            return 1;
        }
        int l = balance(tn.left);
        int r= balance(tn.right);
        if(l==-1 || r==-1){
            return -1;
        }
        if(l==r+1 || l==r || l+1==r){
            return Math.max(++l,++r);
        }       
        return -1;
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
    public boolean isBalanced(TreeNode root) {
        if (root==null) return true;
        if (Math.abs(hight(root.left)-hight(root.right))>1) return false;
        return isBalanced(root.left)&&isBalanced(root.right);
    }
    public int hight(TreeNode t) {
        if (t==null) return 0;
        return Math.max(1+hight(t.left),1+hight(t.right));
    }
}
```

