# Leetcode 53) Maximum Subarray

![image](https://user-images.githubusercontent.com/37058233/120879071-b4cb4d00-c575-11eb-8d3c-ec509d125714.png)

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int i=0;
        int sum=0;
        int max= Integer.MIN_VALUE;
        while(i<nums.length){
            sum+=nums[i];
            //음수만 있는 어레이일때도 해결 가능.
            if(max<sum){
                max=sum;}
            if(sum<0){
                sum=0;
            }
            i++;
        }
        return max;
    }
}
```

# 다른 답안

- 아 내 답안이랑 비슷한데, 나는 음수들로만 이뤄진 어레이 값들 처리를 따로 해줬는데, 순서를 이렇게 하면 굳이 그렇게 따로 처리해주지 않아도 된다.

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int windowSum=0;
        int max=Integer.MIN_VALUE;
        for(int windowEnd=0;windowEnd<nums.length;windowEnd++)
        {
            windowSum+=nums[windowEnd];
            
            if(windowSum>max)
            {
                max=windowSum;
            }
            if(windowSum<0)
            {
                windowSum=0;
            }
        }
        return max;
    }
}
```

