# Leetcode 977) Squares of a Sorted Array

![image](https://user-images.githubusercontent.com/37058233/120577694-831d7f00-c3d9-11eb-9c5e-cf700b96863d.png)

- 이미 sorted된 어레이다.! 

```java
class Solution {
    public int[] sortedSquares(int[] nums) {
        for(int i =0;i<nums.length;i++){
            nums[i]=nums[i]*nums[i];
        }
        int[] res = new int[nums.length];

        int left=0;int right=nums.length-1;
        int pos = nums.length-1;
        while(left<=right){
            if(nums[left]>nums[right]){
                res[pos]= nums[left++];//제곱하면 음수도 양수가 되고, 큰 값이 되니까 뒤에서 부터 집어넣어준다. (양수1,양수2,0, 양수3,양수4) -> 양수 1> 양수2, 양수3<양수4
            }else{
                res[pos] = nums[right--];
            }
            pos--;
        }
        return res;
    }
}
```

# 다른 답안

```java
class Solution {
    public int[] sortedSquares(int[] nums) {
        int[] result = new int[nums.length];
        int right = nums.length - 1;
        int left = 0;
        int cur = nums.length - 1;
        while(left <= right) {
            if(Math.abs(nums[right]) >= Math.abs(nums[left])){
                result[cur] = nums[right] * nums[right];
                right--;
            } else {
                result[cur] = nums[left] * nums[left];
                left++;
            }
            cur--;
        }
        return result;
    }
}
```

