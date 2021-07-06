# Leetcode 104) Maximum Depth of Binary Tree

![image](https://user-images.githubusercontent.com/37058233/124660016-7ff33400-de5a-11eb-91cf-6026b10c4f24.png)

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
    public int maxDepth(TreeNode root) {
        if(root==null)return 0;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int l=0;
        while(!q.isEmpty()){
            int size=q.size();

            for(int i=0;i<size;i++){
                TreeNode tmp= q.poll();

                if(tmp.right!=null){
                    q.add(tmp.right);}

                if(tmp.left!=null){
                    q.add(tmp.left);}
            }
            l++;
        }
        return l;

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
    public int maxDepth(TreeNode root) {
        return recur(root);
    }
    public int recur(TreeNode root) {
        if (root == null) return 0;
        int depth1 = recur(root.left) + 1;
        int depth2 = recur(root.right) + 1;
        return Math.max(depth1, depth2);
    }
}
```