# Leetcode 94) Inorder Traversal

![image](https://user-images.githubusercontent.com/37058233/123882010-bb41b000-d8fa-11eb-90f6-2eb031bb11f3.png)

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
    List<Integer> res = new ArrayList<>();
    public List<Integer> inorderTraversal(TreeNode root){
        //left => middle => right
        if(root==null)return res;
        inorder(root);
        return res;}
    
    public void inorder(TreeNode root){
        if(root.left!=null){
            inorder(root.left);
            //return; 여기에 return 하면 안된다!
        }
        //root.left가 null일 경우,
        res.add(root.val);
        if(root.right!=null){
            inorder(root.right);
        }else{
            return;
        }
        return;
        }
}
```

#  다른 답안

- 와일문과 스택을 사용해 풀었다.

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
    public List<Integer> inorderTraversal(TreeNode root) {
                Stack<TreeNode> stack = new Stack<>();
        List<Integer> output_arr = new ArrayList<>();

        if (root==null){

            return output_arr;
        }


        TreeNode current = root;

        while (current !=null || !stack.isEmpty()){

            while (current !=null){

                stack.push(current);
                current=current.left;

            }

            current=stack.pop();
            output_arr.add(current.val);
            current=current.right;
        }

return output_arr;
    }
}
```

# 오답노트

- 헐... else 뺴면 맞다.. 이것땜에 대체 몇시간을 붙잡고 있었던 걸까..
- 그치만, 이제 재귀함수 사용할 때 if else를 쓸 때 주의해야한다는 걸 잘 배웠다. 

```java
class Solution {
    List<Integer> res = new ArrayList<>();
    public List<Integer> inorderTraversal(TreeNode root) {
        //left => middle => right
        inorder(root);
        return res;}
    
public void inorder(TreeNode root){
    if(root.left!=null){
        inorder(root.left);            
    }//else{
        res.add(root.val);
        if(root.right!=null){
            inorder(root.right);
        //}
    }
}
```

