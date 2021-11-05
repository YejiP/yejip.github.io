# String Problem Strategy

In this post, I would like to talk about several good strategies that you might be able to use for typical string problems. (Only two .. right now.. )

```
1. Sliding Window
2. Palindrome
```

## Overview

1. **Contiguous Substring** - Sliding Window

   - Use left and right pointer to expand/trim the window. 

   
   ![ABDCSDFACAXC](https://user-images.githubusercontent.com/37058233/140412014-f8954eb1-17e7-48ec-856d-45f9e916e42a.gif)
   
2. **Palindrome** - Middle out algorithm

   - Use mid pointer to investigate whether the string is palindromic or not. 

   <img src="https://user-images.githubusercontent.com/37058233/140420408-967c7b4b-7df2-4c33-8b3e-36d9258e3894.gif" style="width :400px">

## 1. **Contiguous Substring** - Sliding Window

- Subarray  or Contiguous String 
  - Use two pointer.
    - Slide your right pointer to the right if the condition is satisfied
    - Slide your left pointer till the condition is satisfied.
    
  - Template uses double while loop. Move right pointer from outer while loop, and move left pointer from the inner while loop.

  - The condition for this example : 

    - Redundant character should not be in a substring.
    - Find maximum length of substring

    ![ABDCSDFACAXC11](https://user-images.githubusercontent.com/37058233/140412128-5a010c9a-54ec-42dd-a67b-e474a9cde3dd.gif)

- **Template**

  ```java
  public void slidingWindow(String s){
      int left=0; int right =0; int max=0;
      while (right < s.length()){
          
          while (!condition){
              //Shorten window from the left side
              left += 1;
          }
          //Check your target value and update
          int windowSize = right-left+1;
          if(max < windowSize){
              max=windowSize; 
          }
          //Extend window
          right += 1;
      }
      Return max;
  }
  ```
  
- **Solved - Related Problems**

  - [Leetcode3) Longest Substring without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters)  -   [My Solution](https://yejip.com/algo/2021-04-21-LeetcodeStr3/)
  - [Leetcode30) Substring with Concatenation of All Words]()  - [My Solution](https://yejip.com/algo/2021-11-02-LeetcodeStr30/)
  - [Leetcode76) Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)  - [My Solution](https://yejip.com/algo/2021-11-01-LeetcodeStr76/)
  - [Leetcode151) Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)  - [My Solution](https://yejip.com/algo/2021-04-15-LeetcodeStr151/)
  - [Leetcode159) Longest Substring with At Most Two Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters) - [My Solution](https://yejip.com/algo/2021-11-02-LeetcodeStr159/)
  - [Leetcode340) Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters) - [My Solution](https://yejip.com/algo/2021-11-02-LeetcodeStr340/)
  - [Leetcode424) Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement) - [My Solution](https://yejip.com/algo/2021-10-28-LeetcodeStr424/)

## 2. Palindromic Substring - Middle out

- Palindromic Substrings
  - Expand from the middle, 
    - **Even** **length of Palindrome :** Use two pointers (mid, mid+1)
    - **Odd** **length of Palindrome** **:** Use one pointer (mid)

  ![palin1](https://user-images.githubusercontent.com/37058233/140420422-07c304cd-91be-4c31-a936-6d6f8c3f4bbe.gif)

- **Template**

  ```java
  class Solution {
      public boolean Palindrome(String s) {
          int i = s.length()/2;   
          
          if(expandAroundCenter(s, i, i) || expandAroundCenter(s, i, i+1)){
              return true;
          }
          return false;
      }
  
      private boolean expandAroundCenter(String s, int i, int j){
          int Left = i;int Right = j;
  
          while(Left >= 0 && Right < s.length() && s.charAt(Left) == s.charAt(Right)){
              Left --;
              Right ++;
          }
          if(Right == s.length()){
              return true;
          }
          return false;
      }
  }
  ```

- **Solved - Related Problems**
  - [Leetcode5) Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring) - [My Solution](https://yejip.com/algo/2021-04-21-LeetcodeStr5/)
  - [Leetcode 647) Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings) - [My Solution](https://yejip.com/algo/2021-11-01-LeetcodeStr647/)

