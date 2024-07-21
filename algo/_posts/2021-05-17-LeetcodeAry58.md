# Leetcode 58) Length of Last word

![image](https://user-images.githubusercontent.com/37058233/119087340-d6e09f00-b9bb-11eb-8276-825b4e0aa003.png)

```java
import java.util.*;
class Solution {
    public int lengthOfLastWord(String s) {
        String[] ary = s.split(" ");
        int len = ary.length;
        if(len==0){
            return 0;
        }
        String last = ary[len-1];
        int result = last.length();
        return result;
    }
}
```

# 다른 풀이 

- trim 먼저 한 후 보낼 친구들은 보내버린다.
- 뒤에서 부터 띄어쓰기가 나올 때 까지 숫자를 세준다.

```java
class Solution {
    public int lengthOfLastWord(String s) {
        if (s.trim().length() == 0) return 0;
        
        s = s.trim();
        int count = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            if (s.charAt(i) == ' ') break;
            count++;
        }
        
        return count;
    }
}
```

