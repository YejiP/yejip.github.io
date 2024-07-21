# Leetcode9) Palindrome Number

https://leetcode.com/problems/palindrome-number/

![image](https://user-images.githubusercontent.com/37058233/114608450-8d7d9100-9c52-11eb-8612-6e2d7cb6c344.png)

- My initial solution : not that good performance

```java
class Solution {
    public boolean isPalindrome(int x) {
        String y = x+"";
        int s=0;
        int e=y.length()-1;
        while(s<e){
            if(y.charAt(s) ==y.charAt(e)){
                s++;e--;
            }else{
                return false;
            }
        }
        return true;
    }
}
```

- palindromic --> meaning if you reverse then it is going to be same! so REVERSE the first half and compare to the second half.
- I can use this technic for Number Palindromic problem.

```java
class Solution {
    public boolean isPalindrome(int x) {
        int rev=0;
        int temp=x;
        int rem;
        while(temp>0){
            rem=temp%10;
            temp=temp/10;
            rev=rev*10+rem;
        }
        if(rev==x){
            return true;
        }else{
            return false;
        }
    }
}
```

