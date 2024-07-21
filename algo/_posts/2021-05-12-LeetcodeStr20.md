# Leetcode 20) Valid Parentheses

![image](https://user-images.githubusercontent.com/37058233/118064509-ff2f2480-b34f-11eb-97c7-2523882d8e41.png)

- 조잡..그 자체... 그러나 runtime은 가장 빠르다.
- 고려해야할 사항이 많다. 
  - 홀수일때 return false
  - 닫는 부호 없을 때 return false
  - 닫다말았을 때/더 닫으려할 때 return false
  - 이걸 내가 다 고려해서 넣어줬다.  ==> 안 좋은 코드가 확실함..

```java
class Solution {
    public boolean isValid(String s) {
        Stack<Character> st = new Stack<>();
        for(int i=0;i<s.length();i++){
            switch(s.charAt(i)){
                case '(':
                    st.push(')');
                    continue;
                case '{':
                    st.push('}');
                    continue;
                case '[' :
                    st.push(']');
                    continue;
            }
            if(st.isEmpty()){
                return false;
            }
            
            char suppose = st.pop();
            if(suppose!=s.charAt(i)){
                return false;
            }       
        }
        
        if(!st.empty()){
            return false;
        }
        return true;
    }
}
```

# Different solution

- stack 사용, switch case문 이용함. 

```java
class Solution {
    public boolean isValid(String s) {
        Stack<String> ps = new Stack();
        if(s.length() == 0 || s.length() == 1) return false;
        for(int i=0; i<s.length(); i++) {
            String a = s.substring(i, i + 1);
            String b;
            switch(a) {
                case "(":
                case "{" :
                case "[":
                    ps.push(a);
                    break;

                case ")":
                    if(ps.empty()) return false;
                    b = ps.pop();
                    if(!b.equals("(")) {
                        return false;
                    }
                    break;
                case "}":
                    if(ps.empty()) return false;
                    b = ps.pop();
                    if(!b.equals("{")) {
                        return false;
                    }
                    break;
                case "]":
                    if(ps.empty()) return false;
                    b = ps.pop();
                    if(!b.equals("[")) {
                        return false;
                    }
                    break;     
            }
        }

        return ps.empty();
    }
}
```



```java
class Solution {
    public boolean isValid(String s) {
        char[] temp = new char[s.length()];
        int count = 0;
        for (int i=0; i<s.length(); i++) {
            if (s.charAt(i)=='(' || s.charAt(i)=='{' || s.charAt(i)=='[') {
                temp[count] = s.charAt(i);
                count++;
            }
            else {
                if (count>0) {
                    switch (s.charAt(i)) {
                        case ')':
                            if (temp[count-1] == '(') {
                                count--;
                                break;
                            }
                            else
                                return false;
                        case '}':
                            if (temp[count-1] == '{') {
                                count--;
                                break;
                            }
                            else
                                return false;
                        case ']':
                            if (temp[count-1] == '[') {
                                count--;
                                break;
                            }
                            else
                                return false;
                    }
                }
                else
                    return false;
            }
        }
        if (count == 0)
            return true;
        else
            return false;
    }
}
```

