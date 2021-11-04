# Leetcode 30) Substring with Concatenation of All Words

![image](https://user-images.githubusercontent.com/37058233/140168359-d6d2e65d-0d14-4a4f-978a-88f506fc1f76.png)

## My Answer

```java
class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        int left =0; int right= 0; 
        int k=words[0].length();
        //create boolean array => integer map, there was a duplicate!
        int remainder=words.length;
        Map<String,Integer> m = resetMap(words);
        int ind=0;
        List<Integer> res= new ArrayList<>();       
        while(right+k <= s.length()){
            String curStr = s.substring(right,right+k);
            if(m.containsKey(curStr)){
                m.put(curStr,m.get(curStr)-1);
                if(m.get(curStr)>=0){
                    remainder--;
                }
                if(remainder==0){
                    if(!res.contains(left)){
                        res.add(left);}
                    m=resetMap(words);
                    left++;
                    right=left;
                    remainder=words.length;
                }else{
                    right = right+k;
                }
            }else{
                ind++;
                left=ind;
                right=left;
                m=resetMap(words);
                remainder=words.length;
            }
            while(m.containsKey(curStr) && m.get(curStr)<0){
                String tmpStr =s.substring(left,left+k);
                m.put(tmpStr,m.get(tmpStr)+1);remainder++;
                left=left+k;
                if(curStr.equals(tmpStr)){
                    remainder--;
                    break;
                }
            }   
        }
        return res;

    }
    public Map<String,Integer> resetMap( String[] words){
        Map<String,Integer> m = new HashMap<>();

        for(int i=0;i<words.length;i++){
            if(!m.containsKey(words[i])){
                m.put(words[i],1);
            }else{
                m.put(words[i],m.get(words[i])+1);
            }
        }
        return m;
    }
}
```

