# Leetcode 41) First Missing Positive

![image](https://user-images.githubusercontent.com/37058233/120086740-6fe77800-c096-11eb-9db9-e6b77b4f6a3c.png)

```java
class Solution {
    public int firstMissingPositive(int[] nums) {
        int result=0;
        int min=Integer.MAX_VALUE;
        for(int i=0;i<nums.length;i++){
            if(nums[i]>0){
                if(min>nums[i]){
                    min =nums[i];
                }
            }

        }
        if(min!=1){
            return 1;
        }
        for(int i=0;i<nums.length;i++){
            if(nums[i]<=0 ||nums[i]-min>=nums.length){
                nums[i]=min;//아무 양수나 넣어줬다. 인덱스로 이제 할 것이다.
            }
        }
        boolean only_pos=false;
        //for문 들어서면서, 방문한 node가 이미 음수면 걍 continue해주기.
        for(int i=0;i<nums.length;i++){
            int val = Math.abs(nums[i])-min;
            if(nums[val]<0){
                continue;
            }else{
                nums[val]=-Math.abs(nums[val]);                
            }
            //이건 어레이 내에 양수만 있을 때 일어난다.
            if(val==nums.length){
                only_pos=true;
                break;
            }
        }
        int i=0;
        while(nums[i]<0){
            i++;
            if(i==nums.length){
                break;
            }
        }
        // System.out.println(nums[i]);
        result= i+min;
        return result;

    }
}
```

# 시도한 오답

- 원래 sum에서 0이상이면 다 더하고, min과 max 찾아서 나중에 for문으로 더해준 후에 sum과의 차이 보려했는데, 범위 보니까. 원소 하나가 integer max 범위가능해서 이 방법은 안될듯. 

  - 안 하려고 했는데, 가장 쉬운 방법 같기도 하고, int대신 long을 쓰면 더 좋을 것 같구, 다 더한 후에 비교하지 말고, 그냥 동적으로 빼줘서 비교하는게 좋을 것 같다. ==> 이렇게 하면 근데 중복일때를 잡지 못해서 안된다.

  ```java
  class Solution {
      public int firstMissingPositive(int[] nums) {
          int min=Integer.MAX_VALUE;
          int max =Integer.MIN_VALUE;
          int sum =0; //long으로 먼저 할까?
          
          for(int i =0;i<nums.length;i++){
              if(nums[i]>0){
                  if (min>nums[i]){
                      min=nums[i];
                  }else if(max<nums[i]){
                      max=nums[i];
                  }
              }
          }
          //위 포뤂에서 min,max를 저장했다.
          //1이 아닌 경우 바로 제외해준다.
          if(min!=1){
              return 1;
          }
          
          //
          int sub=min;
          //일케 하면, 중복일때를 못잡는다....
          for(int i =0;i<nums.length;i++){
              if(nums[i]>0){
                 sum+=nums[i];
                  sum-=sub;
                  sub++;
              }
          }
          sum-=sub;
          return -sum;
  
      }
  }
  ```

# 다른 방법

```java
class Solution {
    public int firstMissingPositive(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            int num = nums[i];
            int ind = i;

            while (num != ind + 1 && num >= 1 && num <= nums.length) {
                ind = num - 1;
                num = nums[ind];
                nums[ind] = ind + 1;
            }
        }

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }

        return nums.length + 1;
    }
}
```

