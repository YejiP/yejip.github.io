# Array

- Mistakes
  - did not check the range of i in while statement.

```java
class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int max = 0;
        for(int i =0;i<nums.length;i++){
            int cnt = 0;
            while(nums[i] == 1){
                cnt ++;
                i++;
                if(i==nums.length){
                    break;
                }
            }
            if (cnt > max){
                max=cnt;
            }
        }        
        return max;
    }
}
```

- 여기서 문제점 찾기

- ```java
    public int[] merge(int[] ary,int start, int end){
          int s = start;
          int m = (start+end)/2;
          int e = end;
          if(end>=start+1){  
              merge(ary,s,m);
              merge(ary,m,e);
          }
          mergeSort(ary,s,m,e);
          return 
      }
      
      public void mergeSort(int[] ary,int start ,int mid, int end){
          int size = end-start+1;
          int[] newAry = new int[size];
          int s=start;
          int e= mid;
          int ind =s;
          while((s < mid) && (e<end)){
              if(s<e){
                  newAry[ind]=ary[s];
                  s++;
              }else{
                  newAry[ind]=ary[e];
                  e++;
              }
              ind++;
          }
          if(s<mid){
              for(int i =s;i<mid;i++){
                  newAry[ind] = ary[i];
                  ind++;}
              }else{
              for(int i =e;i<end;i++){
                  newAry[ind] = ary[i];
                  ind++;                
              }
          }
          for(int i=start;i<end;i++){
              ary[i]=newAry[i];
          }
          
  }
  }
  ```

    
    

```java
class Solution {
    public int[] sortedSquares(int[] nums) {
        
        if(nums[0] >= 0) {
            for(int i =0;i<nums.length;i++)
                nums[i] = nums[i] * nums[i];            
            return nums;
        }
            
        int i =0,j;
        int res[]=new int[nums.length];
        int k=0;
        
        for(;i<nums.length;i++) {
                if(nums[i] > 0)
                    break;            
        }    
        
        j = i-1;
        while(j >=0 && i < nums.length) {
                if(Math.abs(nums[j]) > nums[i]) {
                    res[k] = nums[i] * nums[i];
                    i++;
                    k++;        
                } else {
                    res[k] = nums[j] * nums[j];
                    j--;
                    k++;
                }
            }
            
            while(i<nums.length) {
                res[k] = nums[i] * nums[i];
                i++;
                k++;
            }
            
            while(j >= 0) {
                res[k] = nums[j] * nums[j];
                j--;
                k++;
                
                
            }
        
        
        return res;
        
    }
}
```

