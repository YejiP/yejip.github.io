# Leetcode 125) Valid Palindrome 

![image](https://user-images.githubusercontent.com/37058233/120431927-071a2d00-c32e-11eb-9bb4-06edc4aa81a5.png)

```java
class Solution {
    public boolean isPalindrome(String s) {
        int left=0;int right= s.length()-1;
        while(left<right){
            //isAlphabetic
            while(left<right && !Character.isLetterOrDigit(s.charAt(left))){
                left++;
            }
            while(left<right && !Character.isLetterOrDigit(s.charAt(right))){
                right--;
            }
if(Character.toLowerCase(s.charAt(left))!=Character.toLowerCase(s.charAt(right))){
                return false;
            }
            left++;
            right--;

        }
        return true;
    }
}
```

# 다른 답안

```java
class Solution {
    public boolean isPalindrome(String s) {
        for (int i = 0, j = s.length() - 1; i < j; ) {
            if (!Character.isLetterOrDigit(s.charAt(i))) i++;
            else if (!Character.isLetterOrDigit(s.charAt(j))) j--;
            else if (Character.toLowerCase(s.charAt(i++)) != Character.toLowerCase(s.charAt(j--))) 
                return false;
        }
        return true;          
    }
}
```

