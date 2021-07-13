# Leetcode 337) House Robber III

![W](https://user-images.githubusercontent.com/37058233/125367544-2ba1f580-e32d-11eb-9fc4-2ca6cee70c28.png)

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
    //dynamic programming
    public int rob(TreeNode root) {    
        int[] res = tree(root);
        int max = Math.max(res[0],res[1]);
        return max;
    }
    public int[] tree(TreeNode tn){
        //0번 원소는 현재 원소가 선택됐을때 max
        //1번 원소는 현재 원소가 선택 되지 않았을 때 max
        int[] res=new int[2];
        if(tn==null){
            return res;
        }
        int[] left= tree(tn.left);
        int[] right= tree(tn.right);
        int checked=0;
        int unchecked=0;
        //행복회로 : 선택됐을 때
        checked=left[1]+right[1]+tn.val;
        //행복회로2 : 선택 안됐을 때 네가지의 경우의 수의 합
        int a= left[1]+right[0];
        int b= left[0]+right[1]; 
        int c= left[0]+right[0]; 
        int d= left[1]+right[1];
        unchecked= Math.max(Math.max(a,b),Math.max(c,d));
        
        res[0]=checked;
        res[1]=unchecked;
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
    public int rob(TreeNode root) {
        int[] arr = dp(root);
        return Math.max(arr[0], arr[1]);
    }
    
    //arr[0] max amount when rob root
    //arr[1] max amount when not rob root
    private int[] dp(TreeNode root) {
        if (root == null) return new int[]{0, 0};
        
        int[] left = dp(root.left);
        int[] right = dp(root.right);
        int rob_root = root.val + left[1] + right[1];
        int not_rob_root = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        return new int[]{rob_root, not_rob_root};
    }
}
```

# 오답

![image](https://user-images.githubusercontent.com/37058233/125243509-0ec0e000-e2a3-11eb-8501-a5964bc56699.png)

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
    //dynamic programming
    public int rob(TreeNode root) {    
        int[] res = tree(root);
        int max = Math.max(res[0],res[1]);

        return max;
    }
        //0번 원소는 현재 원소가 선택됐을때 max
        //1번 원소는 현재 원소가 선택 되지 않았을 때 max
        //2번 원소는 checked면 1 아니면 0
        int[] res=new int[3];
        if(tn==null){
            return res;
        }
        //checked, unchecked 이런 정보도 얻어와야할거같은디..
        int[] left= tree(tn.left);
        int[] right= tree(tn.right);
        int checked=0;
        int unchecked=0;
        //행복회로 : 선택됐을 때
        checked=left[1]+right[1]+tn.val;
        //행복회로2 : 선택 안됐을 때 세가지의 경우의 수의 합
        int a= left[1]+right[0];
        int b= left[0]+right[1]; 
        int c= left[0]+right[0]; 
        unchecked= Math.max(a,Math.max(b,c));
        
        res[0]=checked;
        res[1]=unchecked;
        if(checked>=unchecked){
            res[2]=1;
        }else{
            res[2]=0;
        }        
        return res;
        
    }
}
```

- 오답이랑 solution code랑 비슷하다.

  - 아아아ㅏ...! **left[1]+right[1]** 이것 포함 해줘야한다....아예 선택 안 했을 때 
  - **left[1]+right[1]+tn.val** 는 당연하게 1,1밖에 선택 못하구, 현재꺼 선택 안하고 저번것도 선택 안하는 옵션도 체크해줘야한다.


