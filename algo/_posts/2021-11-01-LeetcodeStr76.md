# Leetcode 76) Minimum Window Substring

![image](https://user-images.githubusercontent.com/37058233/139943600-e881442f-c821-4c64-af5f-d8ec7bd39e84.png)

## My Answer

```java
class Solution {
    public String minWindow(String s, String t) {
        //Map (dictionary)
        Map<Character,Integer> m = new HashMap<>();
        for(int  i=0;i<t.length();i++){
            char curChar= t.charAt(i);
            if(m.containsKey(curChar)){
                m.put(curChar,m.get(curChar)+1);
            }else{
                m.put(curChar,1);
            }
        }
        int right =0; int left =0; String res ="";
        int remained = t.length(); int minimum = s.length()+1;

        while(right<s.length()){
            //update counter&map
            char curChar = s.charAt(right);
            if(m.containsKey(curChar)){
                m.put(curChar,m.get(curChar)-1);
                if(m.get(curChar)>=0){
                    //Not redundant. subtract 1 from the var remained
                    remained--;
                }
            }

            //check the condition and trim left
            while(remained==0){
                if(minimum>right-left+1){
                    minimum = right-left+1;
                    res=s.substring(left,right+1);
                }
                if(m.containsKey(s.charAt(left))){
                    m.put(s.charAt(left),m.get(s.charAt(left))+1);
                    if(m.get(s.charAt(left))>0){
                        remained++;
                    }
                }

                left++;
            }
            right++;

        }
        return res;
    }
}
```



## Other Answer

```java
class Solution {
    public String minWindow(String s, String t) {
        int [] map = new int[123];
        int m = s.length();
        int n = t.length();

        for (int i = 0; i < n; i++) {
            map[t.charAt(i)]++;
        }

        // sliding window
        int left = 0;
        int right = 0;
        int count = 0;

        int minLen = Integer.MAX_VALUE;
        int resLeft = 0;
        int resRight = -1;

        while (right < m) {
            // expand right
            char cR = s.charAt(right);
            map[cR]--;

            if (map[cR] >= 0) {
                count++;
            }

            // shrink left
            while (count == n) {
                int curLen = right - left + 1;

                if (curLen < minLen) {
                    minLen = curLen;
                    resLeft = left;
                    resRight = right;
                }

                char cL = s.charAt(left);
                map[cL]++;

                if (map[cL] > 0) {
                    count--;
                }              

                left++;
            }

            right++;
        }

        return s.substring(resLeft, resRight + 1);
    }
}

