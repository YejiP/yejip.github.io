# Leetcode 80) Remove Duplicates from Sorted Array II

![image](https://user-images.githubusercontent.com/37058233/119181086-00361500-ba26-11eb-80c4-46666bdbbc9c.png)

![image](https://user-images.githubusercontent.com/37058233/119181144-09bf7d00-ba26-11eb-8246-ade970f32e74.png)

- [Move Zero](https://yejip.com/algo/2021-05-17-LeetcodeAry283/ ) 의 다른 풀이 방법에 착안해서 풀면 된다!

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        int cnt=0;
        int prev=nums[0];
        int indChange=0;
        for(int i=1;i<nums.length;i++){
            if(prev==nums[i]){
                cnt++;
            }else{
                cnt=0;
            }
            if(cnt>=2){
                indChange++;
            }
            prev=nums[i];
            nums[i-indChange]=nums[i];
        }
        int result = nums.length-indChange;
        return result;
    }
}
```

# 다른 풀이

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        int state=1;
        int i=0,j=1;
        while(j<nums.length){
            if(nums[i]!=nums[j]){
                state=1;   
            }
            else if(nums[i]==nums[j]){
                state++;
            }
            if(state<=2){
                nums[++i]=nums[j];
            }
            j++;
        }
        return i+1;
    }
}
```



