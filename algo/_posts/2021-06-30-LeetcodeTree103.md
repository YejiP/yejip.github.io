# Leetcode 103) Binary Zigzag Level Order Traversal

![image](https://user-images.githubusercontent.com/37058233/124020599-54c29d80-d99f-11eb-8b1a-6425ec5b1924.png)

# 내 풀이

- 102번 논리와 동일하게. 단, level의 값에 따라서 앞에서 부터 add해줄지 뒤에서 add해줄지를 다르게 해줬다.

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
    List<List<Integer>> res = new ArrayList<>();
    int level=0;
    public List<List<Integer>> zigzagLevelOrder(TreeNode root){
        if(root==null)return res;
        ArrayList<Integer> tmp = new ArrayList<>();
        res.add(tmp);
        zigzag(root,0);
        return res;
    }
    public void zigzag(TreeNode tn,int l){
        if(tn==null)return;
        if(level < l){
            ArrayList<Integer> tmp = new ArrayList<>();
            res.add(tmp);
            level++;
        }
        if(l%2==0){
            res.get(l).add(tn.val);
        }else{
            res.get(l).add(0,tn.val);
        }

        l++;
        zigzag(tn.left,l);
        zigzag(tn.right,l);
    }
}
```

#  다른 답안

- while문과 tree를 사용해서 푸는 법

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
      public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
          if (root == null) {
              return new ArrayList<>();
          }
          List<List<Integer>> result = new ArrayList<>();
          Queue<TreeNode> q = new LinkedList<>();
          q.offer(root);
          boolean flag = false;
          while (!q.isEmpty()) {
              List<Integer> list = new ArrayList<>();
              int size = q.size();
              for (int i = 0; i < size; i += 1) {
                  TreeNode curr = q.poll();
                  if (flag == false){
                      list.add(curr.val);
                  } else {
                      list.add(0,curr.val);
                  }
  
                  if (curr.left != null) {
                      q.offer(curr.left);
                  }
                  if (curr.right != null) {
                      q.offer(curr.right);
                  }
  
              }
              if (flag == false){
                  flag = true;
              } else {
                  flag = false;
              }
              result.add(list);
          }
          return result;
      }
  }
  ```

- 내 방식과 비슷

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
      List<List<Integer>> res = new ArrayList<>();
  
      public void traverse(TreeNode node,int h){
          if(node==null){return;}
          if(h%2==0){
              if(h>=res.size()){res.add(new ArrayList<Integer>());}
              res.get(h).add(node.val);
          }
          else{
              if(h>=res.size()){res.add(new ArrayList<Integer>());}
              res.get(h).add(0,node.val);
          }
          traverse(node.left,h+1);
          traverse(node.right,h+1);
      }
  
      public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
          traverse(root,0);
          return res;
      }
  }
  ```

  





