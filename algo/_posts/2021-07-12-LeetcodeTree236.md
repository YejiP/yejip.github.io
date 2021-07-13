# Leetcode 236) Lowest Common Ancestor of a Binary Tree

![image](https://user-images.githubusercontent.com/37058233/125342427-c38de800-e309-11eb-8688-7c2ed4e9a5da.png)

# 내 답안

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        //postorder traversal하면 될듯싶다
        TreeNode a=null;
        TreeNode b=null;

        if(root.left!=null){
            a=lowestCommonAncestor(root.left,p, q);
        }

        if(root.right!=null){
            b=lowestCommonAncestor(root.right, p, q);
        }

        if(root.val==p.val || root.val==q.val){
            return root;
        }else{
            if(a!=null && b==null){
                return a;
            }else if(a==null && b!=null){
                return b;
            }else if(a!=null&&b!=null){
                return root;
            }
        }
        return null;
    }
}
```

#  다른 답안

```java
class Solution {

    private TreeNode lowestAncestor = null;

public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null)
        return null;
    
    setLowestAncestor(root, p, q);
    
    return this.lowestAncestor;
}

private int setLowestAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || lowestAncestor != null)
        return 0;
    
    int r = (root == p || root == q) ? 1 : 0;
    
    int left = setLowestAncestor(root.left, p, q);
    
    int right = setLowestAncestor(root.right, p, q);
    
    if (r + left + right >= 2 && lowestAncestor == null) 
        lowestAncestor = root;
    
    return r + left + right;
}

}
```



