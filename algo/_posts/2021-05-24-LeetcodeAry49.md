# Leetcode 49) Group Anagrams

![image](https://user-images.githubusercontent.com/37058233/119544202-55d03180-bd46-11eb-95fb-429f25901400.png)

- Map의 containskey는 보통 O(1)의 시간 복잡도를 가지고, 최악의 경우 O(n)이다. map을 사용하는게 arrayList를 사용해 for문으로 하나씩 순회하는 것 보다 더 빠르다.

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, ArrayList<String>> m= new HashMap<>();
        List<List<String>> l=new ArrayList<List<String>>();
        for(int k=0;k<strs.length; k++){
            String item= strs[k];
            char[] ary=item.toCharArray();
            Arrays.sort(ary);
            String temp = Arrays.toString(ary);
            if(m.containsKey(temp)){
                m.get(temp).add(item);
            }else{
                m.put(temp,new ArrayList<String>(Arrays.asList(item))); 
            }
        }
        for(Map.Entry<String, ArrayList<String>> entry: m.entrySet()) {
            l.add(entry.getValue());
        }
        return l;
    }
}
```

- anagram이 나올 때, 

  - string을 charArray로 바꾼다음, sort하고 또 다시 string 으로 만들어서 비교한다.

    ```java
    String s= new String(ary);
    String s2 = Arrays.toString(ary);
    ```

  - 그리고, for문의 범위잡은 변수가 동적으로 늘어난다. j<l.size() 이렇게 잡았는데, l사이즈가 커지면 여기에도 반영이 된다. 

- map 순회 

  - Map.Entry<type1,type2> e : m.entrySet() 를 이용해 key와 value를 순회할 수 있다. 

    ```java
    for(Map.Entry<String,ArrayList<String>> entry : m.entrySet()){
        entry.getValue();
        entry.getKey();
    }
    ```

- 맨 처음에는 이렇게 짰다. time limit 떠서 실패.

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> l = new ArrayList<List<String>>();
        l.add(new ArrayList<String>(Arrays.asList(strs[0])));
        for(int k=1;k<strs.length; k++){
            String item= strs[k];
            char[] ary=item.toCharArray();
            for(int j=0;j<l.size();j++){
                List<String> group = l.get(j);
                char[] ary2 =group.get(0).toCharArray();
                Arrays.sort(ary);
                Arrays.sort(ary2);
                if(Arrays.equals(ary,ary2)){
                    group.add(item);
                    break;
                }
                if(j==l.size()-1){
                    l.add(new ArrayList<String>(Arrays.asList(item)));
                    break; 
                    //여기서 break 추가해줌. 위 for문 범위 두번째, 동적으로 늘어나서..
                }
            }
        }
        return l;

    }

}
```

# 다른 방법

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        HashMap<String,Integer> hm=new HashMap();
        List<List<String>> out=new ArrayList();
        for (int i=0;i<strs.length;i++)
        {
            String abc=strs[i];
            char tempArray[] = abc.toCharArray();

            // sort tempArray
            Arrays.sort(tempArray);
            String s= new String(tempArray);
            if(hm.containsKey(s))
            {
                int ind=hm.get(s);
                out.get(ind).add(strs[i]);
            }
            else
            {
                hm.put(s,out.size());
                List<String > tt=new ArrayList();
                tt.add(strs[i]);
                out.add(tt);
                //System.out.println(hm.toString());
                //System.out.println(out.toString());
            }
        }
        return out;
    }
}
```

