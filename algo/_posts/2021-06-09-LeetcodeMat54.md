# Leetcode 54) Spiral Matrix

![image](https://user-images.githubusercontent.com/37058233/121442293-2e7d8500-c940-11eb-94d1-b0bd2542d552.png)

```java
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res =new ArrayList<>();
        int horLen = matrix[0].length;
        int verLen = matrix.length;
        int all = (horLen)*(verLen);
        boolean pos=true;
        int now=0;
        while(verLen>0 && horLen>0){
            for(int i= now; i<now+horLen-1;i++){
                res.add(matrix[now][i]);
            }
             for(int i= now; i<now+verLen-1;i++){
                 res.add(matrix[i][horLen-1+now]);                
            }
            if(res.size()+1==all){    
                break;
            }
            for(int i=now+horLen-1; i>now;i--){
                 res.add(matrix[verLen-1+now][i]);                
            }
             for(int i=now+ verLen-1; i>now;i--){
                 res.add(matrix[i][now]);                
            }
            verLen = verLen-2;
            horLen = horLen-2;
            now++;
        }
        now--;
        if(res.size()==all){
            return res;
        }
        res.add(matrix[now+verLen][horLen+now]);
        return res;
    }
}
```

# 다른 답안

```java
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new LinkedList<>();
        int up = 0, left = 0, right = matrix[0].length - 1, bottom = matrix.length - 1;
        int m = matrix.length;
        int n = matrix[0].length;
        while (res.size()< m*n) {
            int index = left;
            while (res.size()< m*n && index <= right) {
                res.add(matrix[up][index++]);
            }
            up++;
            index = up;
            while (res.size()< m*n && index <= bottom) {
                res.add(matrix[index++][right]);
            }
            right--;
            index = right;
            while (res.size()< m*n && index >= left) {
                res.add(matrix[bottom][index--]);
            }
            bottom--;
            index = bottom;
            while (res.size()< m*n && index >= up) {
                res.add(matrix[index--][left]);
            }
            left++;
        }
        return res;
    }
}
```

