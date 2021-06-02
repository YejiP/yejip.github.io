# Leetcode 125) Valid Palindrome 

![image](https://user-images.githubusercontent.com/37058233/120431927-071a2d00-c32e-11eb-9bb4-06edc4aa81a5.png)

```java
class Solution {
    public boolean isPalindrome(String s) {
        int ptr1=0;int ptr2=s.length()-1;
        if(ptr1==ptr2){
            return true;
        }
        while(ptr1<ptr2){
            while(!Character.isLetterOrDigit(s.charAt(ptr1))){
                ptr1++;
                if(ptr1==s.length()){
                    return true;
                }
            }
            while(!Character.isLetterOrDigit(s.charAt(ptr2))){
                ptr2--;
            }
 if(Character.toLowerCase(s.charAt(ptr1))==Character.toLowerCase(s.charAt(ptr2))){
                ptr1++;
                ptr2--;
            }else{
                return false;
            }
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

