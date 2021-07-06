# Leetcode 111) Minimum Depth of Binary Tree

![image](https://user-images.githubusercontent.com/37058233/124655109-40294e00-de54-11eb-92f2-093b8968a51b.png)

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
    int Min = Integer.MAX_VALUE;
    
    public int minDepth(TreeNode root){
        if(root==null)return 0;
        lev(root,1);
        return Min;
    }
    
    public void lev(TreeNode tn, int l){
        if(tn.left==null && tn.right==null){
            if(Min> l){
                Min=l;}
            return;
        }
        ++l;
        if(tn.left!=null){
            lev(tn.left,l);
           }
        if(tn.right!=null){
            lev(tn.right,l);
        }
        
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
    public int minDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        int level = 1;
        while(!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode temp = queue.remove();
                if (temp.left == null && temp.right == null) {
                    return level;
                }
                
                if (temp.left != null) {
                    queue.add(temp.left);
                }
                if (temp.right != null) {
                    queue.add(temp.right);
                }
            }
            level++;
        }
        return level;
    }
}
```