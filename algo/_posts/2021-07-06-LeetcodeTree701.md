# Leetcode 701) Insert into a Binary Search Tree

![image](https://user-images.githubusercontent.com/37058233/124661216-0f4d1700-de5c-11eb-8f67-84dc9d3121ea.png)

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
    public TreeNode insertIntoBST(TreeNode root, int val) {
        TreeNode tm = root;
        if(tm==null)return new TreeNode(val);
        
        while(tm!=null){
            //tm.val==val 이런 경우는 없는 것이다.
            
            if(tm.val>val){
                if(tm.left==null){
                    tm.left=new TreeNode(val);
                    return root;}
                
                tm = tm.left;
            }else{
                if(tm.right==null){
                    tm.right= new TreeNode(val);
                    return root;
                }
                tm= tm.right;
            }
            
        }
        return root;
    }
}
```

#  다른 답안

- 아주 깔끔하고 이쁘다..

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
    public TreeNode insertIntoBST(TreeNode root, int val) {
        if (root == null) {
            return new TreeNode(val);
        }

        if (root.val > val) {
            root.left = insertIntoBST(root.left, val);
        } else {
            root.right = insertIntoBST(root.right, val);
        }
        return root;
    }
}
```