# Leetcode 56) Merge Intervals

![image](https://user-images.githubusercontent.com/37058233/121466887-048e8780-c96d-11eb-9b06-183f94ef6cb7.png)

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        List<int[]> res = new ArrayList<>();
        res.add(intervals[0]);
        int cnt=1;//res 의 담긴 숫자 갯수
        for(int i=0;i<intervals.length;i++){
            boolean checked=false;
            int ind = -1;
            int a=intervals[i][0];
            int b= intervals[i][1];
            for(int j=0;j<res.size();j++){
                int c= res.get(j)[0];
                int d= res.get(j)[1];
                if(a<=d && c<=b){
                    res.get(j)[0]=Math.min(a,c);
                    res.get(j)[1]=Math.max(b,d); 

                    if(checked){
                        res.get(ind)[0]=Math.min(res.get(ind)[0],c);
                        res.get(ind)[1]=Math.max(res.get(ind)[1],d);   
                        res.remove(j);
                        j--;
                    }
                    if(!checked){
                        ind=j;
                        checked=true;
                    }
                }
                if(j==res.size()-1 && !checked){
                    res.add(intervals[i]);
                    break;//break 안 해주면 for문의 cnt값이 늘어나서 한번 더돈다.
                }
            }
        }
        int[][] res2 = new int[res.size()][2];
        for(int i=0;i<res.size();i++){
            res2[i]=res.get(i);
        }
        return res2;
    }
}
```

# 다른 답안

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        // Base Case Check
        if (intervals == null || intervals.length < 1){
            return intervals;  
        }
        // Sort intervals based on start times
        Arrays.sort(intervals,(a,b) -> a[0] - b[0]);
        List<int[]> output_array = new ArrayList<>();
        int[] current_interval = intervals[0];
        output_array.add(current_interval);

        for (int[] next_interval : intervals){
            int current_start = current_interval[0];
            int current_end = current_interval[1];
            int next_start = next_interval[0];
            int next_end = next_interval[1];

            if (current_end >= next_start){
                current_interval[1] = Math.max(current_end,next_end); 
            }else{
                current_interval = next_interval;
                output_array.add(current_interval);
            }
        }
        return output_array.toArray(new int[output_array.size()][]);
    }
}
```

