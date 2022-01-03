# Tree Traversal - DFS Intro

Tree Traversal had been so confusing to me for a while, but now I realized why it was more confusing than it had to be. 

When I learnt about tree traversal such as Preorder, Inorder and Postorder traversal, The difference is **'The order of visiting nodes'** . This is surely true,, Only when we just go through example with our head or paper. 

![image](https://user-images.githubusercontent.com/37058233/147977911-d680133a-b63d-4195-8d84-5e9cf79e0829.png)

Okay, so we know the basic. But... How do we actually implement this into code? 

Normally in tree problems, root node is given, and relationship with other nodes are there already. What we do here is, **we traverse all tree nodes from root to leaf by using .left or .right variable.** 

![image](https://user-images.githubusercontent.com/37058233/147980981-cd92acd0-f988-47a6-b521-65e712fffb05.png)

**For example**

```java
/**
 * Definition for abinary tree node.
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
    public boolean RandomTreeProblem(TreeNode root) {
    //your code
    }
}
```

And Tree traversal in the code world, for most of DFS Tree Traversing code, **the order of visiting nodes is actually the same and it's going to be preorder traversal's order for all of DFS problems that has a root node  as an input**. (Yeah mostly, we start traverse tree from the root and go left then right! since tree problems usually give root node as a input)

**!!Each node is visited 4 times with this traversal.**

1. **node** => left node

2.  left node => **node** (pop)

3. **node** => right node

4. right node => **node** (pop)

![Tree traversal - Wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Sorted_binary_tree_ALL_RGB.svg/293px-Sorted_binary_tree_ALL_RGB.svg.png)

The different point is **the order of applying special treatment to each node**, 

```
'The order of visiting nodes is the same for all Traversal
Only the order of special treatment to nodes is different!'
```

In this example, the special treatment is 'Print out values'.

![treetraversal](https://user-images.githubusercontent.com/37058233/147988079-9011055f-cf67-4cbc-b72f-2ad40c6ae4ea.gif)
