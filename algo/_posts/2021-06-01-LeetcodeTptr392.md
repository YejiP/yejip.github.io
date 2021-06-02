# Leetcode 392) Is Subsequence

![image](https://user-images.githubusercontent.com/37058233/120429684-accb9d00-c32a-11eb-85b9-52f40a88ef63.png)

```java
class Solution {
    public boolean isSubsequence(String s, String t) {
        char[] t_ary = t.toCharArray();
        int ptr=0;
        for(char i : t_ary){
            if(ptr==s.length()){
                break;
            }
            if(i==s.charAt(ptr)){
                ptr++;
            }
        }
        if(ptr==s.length()){
            return true;
        }
        return false;
    }
}
```

# 다른 답안

```java
class Solution {
    public boolean isSubsequence(String s, String t) {
        int ls = s.length(), lt = t.length();
        if (ls == 0) return true;
        int indexs = 0, indext = 0;
        while (indext < lt) {
            if (s.charAt(indexs) == t.charAt(indext)) {
                indexs++;
                if (indexs == ls) return true;
            }
            indext++;
        }
        return false;
    }
}
```

