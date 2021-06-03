# Leetcode 26) Remove Duplicates from Sorted Array

[https://leetcode.com/problems/remove-duplicates-from-sorted-array/](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

![image](https://user-images.githubusercontent.com/37058233/120579049-afd29600-c3db-11eb-97a0-67063e83276d.png)

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        if(nums.length <=1){
            return nums.length;
        }
        int i=1;
        int prev= nums[0];
        int modiInd =0;
        while(i<nums.length){
            if(prev==nums[i]){
                modiInd++;
            }else{
                nums[i-modiInd]=nums[i];
            }
            prev=nums[i];
            i++; 
        }
        return i-modiInd;
    }
}
```

# 다른 답안

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        int i = 0;
        for (int j = 0; j < nums.length; j++) {
            if (nums[j] != nums[i]) {
                i++;
                nums[i] = nums[j];
            }
        }
        return i + 1;
    }
}
```

