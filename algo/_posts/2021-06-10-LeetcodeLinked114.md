# Leetcode 114) Flatten Binary Tree to Linked List

![image](https://user-images.githubusercontent.com/37058233/121576929-caa99980-c9dd-11eb-9081-68e8d307df59.png)

# 내 풀이

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
    public void flatten(TreeNode root) {
        TreeNode tn= root;
        if(root==null){
            return;
        }
        while(tn.left!=null || tn.right!=null){
            if(tn.right!=null && tn.left!=null){
                TreeNode t=tn.left;
                while(t.right!=null){
                    t =  t.right;
                }
                t.right=tn.right;
                tn.right=tn.left;
                tn.left=null;
            }else if(tn.right==null){
                tn.right= tn.left;
                tn.left=null;
            }
            tn=tn.right;
        }
    }
}
```

![image](https://user-images.githubusercontent.com/37058233/121578253-553ec880-c9df-11eb-9970-de07080a6f86.png)

# 다른 답안

- ㅇㅁㅇ.. 넘 간단하게 풀..었..다.. 
- 이 알고리즘은 트리의 가장 오른쪽 leaf부터 출발해서 위로 올라온다.
- 아래 같은 식의 논리

![Presentation1](https://user-images.githubusercontent.com/37058233/121583730-79050d00-c9e5-11eb-968a-0d48d0f3e571.gif)

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
    //함수 밖에 선언된 변수라서 재귀함수가 사라지든 말든 연속성있게 값이 변화한다.
    TreeNode prev=null;
    public void flatten(TreeNode a) {
        if (a == null)
            return;
        //right leaf 노드에 도달할 때 return 재귀함수 호출 멈추고, 아래 코드 실행된다.
        flatten(a.right);
        flatten(a.left);
        //맨 처음 도달했을 때는 null.
        a.right = prev;
        //그 이후에 a값
        prev = a;
        prev.left = null;
    }
}
```

# 다시 풀었을 때

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
    public void flatten(TreeNode root) {
        TreeNode tn = root;
        if(root==null)return;
        while(tn.left!=null || tn.right!=null){
            if(tn.left!=null){
                TreeNode tmp=tn.left;
                while(tmp.right!=null){
                    tmp=tmp.right;
                }
                tmp.right=tn.right;
                tn.right=tn.left;
                tn.left=null;
            }
            tn=tn.right;
        }

    }
}
```

