# Leetcode 938) Range Sum of BST

![image](https://user-images.githubusercontent.com/37058233/124336631-96944500-db53-11eb-8eff-5f6c8e075474.png)

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
    int res=0;
    public int rangeSumBST(TreeNode root, int low, int high) {
        if(root==null)return 0;
        trip(root,low, high);
        return res;
    }
    
    public void trip(TreeNode tn, int low , int high){
        if(tn==null)return;
        if(tn.val>=low && tn.val<=high){
            res+=tn.val;
        }
        trip(tn.left,low, high);
        trip(tn.right,low,high);
    }
}
```

#  다른 답안

- value를 먼저 확인하고, 
  1. **만약 이게 범위에 쏙 들어간다면** : sum에 더해주고, left, right 실행해준다 (코드가 떨어져 있어서 헷갈리는데 어쨌든 맞다.)
  2. **범위보다 크다면** : left만 실행
  3. **범위보다 작다면** : right 만 실행

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
    int range_sum;
    public int rangeSumBST(TreeNode root, int low, int high) {
        range_sum = 0;
        get_range_sum(root, low, high);
        return range_sum;
    }
    public void get_range_sum(TreeNode root, int low, int high){
        if(root != null){
            if(root.val >= low && root.val <= high){
                range_sum = range_sum + root.val;
            }
            if(root.val > low){
                get_range_sum(root.left, low, high);
            }
            if(root.val < high){
                get_range_sum(root.right, low, high);
            }
        }
    }
}
```
