# Leetcode 108) Convert Sorted Array to Binary Search Tree

- 어레이에서 트리 만들기
  - A **height-balanced** binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.
  - sorted array 나오면 bfs떠올리기..

![image](https://user-images.githubusercontent.com/37058233/124024797-8a1dba00-d9a4-11eb-9991-c07aaac87184.png)

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
    public TreeNode sortedArrayToBST(int[] nums) {
        if(nums.length==0)return null;
        return helper(nums,0,nums.length-1);
    }

    public TreeNode helper(int[] nums,int left, int right){
        // recursive 이용할 때는 항상 boundary를 체크해야한다.
        if(left>right)return null;
        // mid point 라는 단어 나오면, 그냥 항상 저렇게 (l+r)/2 로 일단 셋해주자.(l+r)/2 + 1 해야할 때도 있을까?
        int mid = (left+right)/2;
        //mid index에 있는 원소를 treenode로 만든다. 
        TreeNode node = new TreeNode(nums[mid]);
        //mid point 는 이미 위에서 트리로 만들어졌으니까, left, right는 mid를 포함하면 안된다. 
        node.left = helper(nums, left,mid-1);
        node.right = helper(nums,mid+1, right);
        return node;
    }
}
```

# 나중에 다시 풀어보기 

```java
```





