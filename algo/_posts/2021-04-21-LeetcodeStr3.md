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
        //end
        int max= s.length()-start;
        if(max>real_max){
            real_max=max;
        }
            return real_max;
    } 
}
```

# Different solution

- Easy example: 
  - Array index 0 indicates A,  index 1 indicates B ...
  - if (start index) < (array stored value) 
    -  the character already exists in the sub string (redundancy is found)
    - set new start index as (array stored value+1)

![image](https://user-images.githubusercontent.com/37058233/118057960-e3bd1d00-b341-11eb-90b5-a3e9ad551d76.png)

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        if(s.isEmpty()) {
            return 0;
        }
        char[] array = s.toCharArray();
        int[] ascci = new int[128];
        //Initializing all values with -1.
        for(int i=0; i<ascci.length; i++) {
            ascci[i] = -1;
        }
        int startIndex = 0;
        int max = 0;
        //array contains all characters from given string.
        for(int i = 0; i < array.length; i++) {
            /*array[i] is a character, but it will typecast to ascci code number.
            ascci[] returns -1 or previous index of the character if it exists.*/
            
            //if prevIndex is -1, meaning that it never showed up before.
            int prevIndex = ascci[array[i]];
            ascci[array[i]] = i;
            
            //if(prevIndex >= startIndex)==true, meaning it is repeated character. 
            if(prevIndex >= startIndex) {
                //start again from the next character of repeated character.
                startIndex = prevIndex + 1;
            }
            //if new substring is longer than max, replace max length.
            if(i + 1 - startIndex > max) {
                max = i + 1 - startIndex;
            }
            //if max is longer than what it is left in array, then return and end. 
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

