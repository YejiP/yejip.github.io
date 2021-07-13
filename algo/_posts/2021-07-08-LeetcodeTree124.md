# Leetcode 124) Binary Tree Maximum Path Sum

![image](https://user-images.githubusercontent.com/37058233/125366824-bf72c200-e32b-11eb-8942-88d5d1fe8925.png)

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
    int max=Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) {
        maxSum(root);
        return max;
    }
    public int maxSum(TreeNode tn){
        if(tn==null){
            return 0;
        }
        int a =tn.val;
        int b= maxSum(tn.left);
        int c=maxSum(tn.right);
        
        int res;
        if(b<0 && c<0){
            res=a;
        }else if(b<0){
            res=a+c;
        }else if(c<0){
            res=a+b;
        }else{
            res = Math.max(a+b,a+c);
        }
        int lmax = Math.max(res,a+b+c);
        if(lmax>max){
            max=lmax;
        }
         
        return res;
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
    int rst = Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) {
        
        return Math.max(sum(root), rst);
    }
    
    public int sum(TreeNode node) {
        if (node == null) {
            return 0;
        }
        
        int l = sum(node.left);
        int r = sum(node.right);

        int sum = node.val;
        if (l >= 0) sum += l;
        if (r >= 0) sum += r;
        rst = Math.max(rst, sum);
        
        return node.val + Math.max(0, Math.max(l, r));
    }
}
```