# Leetcode 3) Longest Substring Without Repeating Characters

![image](https://user-images.githubusercontent.com/37058233/117901437-346c4180-b280-11eb-9760-1b99d6cabbab.png)

## Sliding Window

```java
class Solution {
    int real_max = 0;
    int start=0;
        
    public void count(int b, String s){
        for(int i=b-1;i>=start;i--){
            if(s.charAt(i)==s.charAt(b)){
                int max=b-1-start+1;
                if(real_max<max){
                    real_max=max;
                }
                start=i+1;
                break;
            }
        }               
    }

    public int lengthOfLongestSubstring(String s){
        if(s.length()<=1){
            return s.length();
        }
        int end=1; 
        while(end<s.length() && start<s.length()){
            count(end,s);
            end++;
        }
        //끝처리
        int max= s.length()-start;
        if(max>real_max){
            real_max=max;
        }
            return real_max;
    } 
}
```

# 다른 답안

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        if(s.isEmpty()) {
            return 0;
        }
        char[] array = s.toCharArray();
        int[] ascci = new int[128];

        for(int i=0; i<ascci.length; i++) {
            ascci[i] = -1;
        }

        int startIndex = 0;
        int max = 0;

        for(int i = 0; i < array.length; i++) {
            int prevIndex = ascci[array[i]];
            ascci[array[i]] = i;
            if(prevIndex >= startIndex) {
                startIndex = prevIndex + 1;
            }

            if(i + 1 - startIndex > max) {
                max = i + 1 - startIndex;
            }
            if(array.length - startIndex <= max) {
                return max;
            }

        }
        return max;
    }
}
```

```java
import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        
        int n = s.length();
        int maxCount = 0;
        Integer[] chars = new Integer[128];
        
        int left = 0;
        int right = 0;
        
        while(right < n){
            char rightChar = s.charAt(right);
            Integer index = chars[rightChar];
            if(index != null && index >= left && index < right){
                left = index + 1;
            }  
            chars[rightChar] = right;
            maxCount = Math.max(maxCount, right - left + 1);
            right++;
        }
        return maxCount;
        
    }
}
```

