- Inorder

  ```java
  class Solution {
      List<Integer> inorder = new ArrayList<>();
      
      public List<Integer> inorderTraversal(TreeNode root) {
          helper(root);
          return inorder;
      }
      
      public void helper(TreeNode tn){
          if (root != null) {
              helper(tn.left);            
              inorder.add(tn.val);
              helper(tn.right);    
          }
      }
  }
  ```

  

- Preorder

  ```java
  class Solution {
      List<Integer> preorder = new ArrayList<>();
      
      public List<Integer> preorderTraversal(TreeNode root) {
          helper(root);
          return preorder;
      }
      
      public void helper(TreeNode tn){
          if(tn!=null){
              preorder.add(tn.val);
              helper(tn.left);
              helper(tn.right);
          }
      }   
  }
  ```

- Postorder

  ```java
  class Solution {
      List<Integer> postorder = new ArrayList<>();
      
      public List<Integer> postorderTraversal(TreeNode root) {
          helper(root);
          return postorder;
      }
      
      public void helper(TreeNode tn){
          if(tn!=null){
              helper(tn.left);
              helper(tn.right);
              postorder.add(tn.val);
          }
      }
  }