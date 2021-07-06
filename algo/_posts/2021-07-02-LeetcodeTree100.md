# Leetcode 100) Same Tree

![image](https://user-images.githubusercontent.com/37058233/124651189-77e1c700-de4f-11eb-8f8b-fcc6b6b7b680.png)

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
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if(p==null && q==null){
            return true;
        }else if(p==null){
            return false;
        }else if(q==null){
            return false;
        }
        return compare(p,q);
    }

    public boolean compare(TreeNode p, TreeNode q){
        if(p==null && q==null){
            return true;
        }else if(p==null){
            return false;
        }else if(q==null){
            return false;
        }
        if(p.val!=q.val){return false;}

        if(!compare(p.left,q.left)){return false;}
        if(!compare(p.right,q.right)){return false;}
        return true;
    }

}
```

#  다른 답안

- p,q가 둘 다 null이기 전까지 계속 recursive하게 함수를 호출한다.
- null이면 그때서 부터 값 반환 시작.

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
    public boolean isSameTree(TreeNode p, TreeNode q){
        if(p==null && q==null) return true;
        //하나만 null이니까. 둘 다 null인 경우는 위에서 이미 잡힌다.
        if(p==null || q== null) return false;
        
        //만약 현재 노드의 value가 같다면, 자식노드들도 같은지 보고 둘 다 같다면 true리턴
        if(p.val == q.val) {
            return isSameTree(p.left,q.left) && isSameTree(p.right,q.right);
        }
        return false;
    } 
}
```

