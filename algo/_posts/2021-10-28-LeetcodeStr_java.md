# Some Useful JAVA String technique

## 1. **When Concatenating String...**

- Do use **Character array** or **String Builder** 
- Do not use str +=str, The time complexity for this method is O(n^2) !

1. **Character array** : O(n)

   ```java
   String a ="BoilingPoint";
   char[] chars = a.toCharArray();
   ```

2. **StringBuilder** : O(n)

   ```java
   StringBuilder str = new StringBuilder();
   for(int i=0;i<n;i++){
       str.append("hello");
   }
   String s = str.toString();
   ```


## 2. When Storing Substring of s that contains characters...

- Map can be a great solution

  ```java
  ```

- According to ASCII table, 65~90 : Capital Letters, 97~122 : Lowercase Letters.

  This method shows better performance,

  ```java
  ```



- [Leetcode20) Valid Parentheses](https://yejip.com/algo/2021-05-12-LeetcodeStr20/)
- [Leetcode 161) One Edit Distance](https://yejip.com/algo/2021-08-19-Leetcode161/) 
- [Leetcode187) Repeated DNA Sequences](https://yejip.com/algo/2021-05-16-LeetcodeStr187/) 
- [Leetcode242) Valid Anagram](https://yejip.com/algo/2021-05-14-LeetcodeStr242/) 
- [Leetcode394) Decode String](https://yejip.com/algo/2021-05-12-LeetcodeStr394/)  - string builder