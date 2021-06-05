# Leetcode 15) 3Sum

![image](https://user-images.githubusercontent.com/37058233/120766415-14bae880-c4cf-11eb-8925-b30b3cb2a08d.png)

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        if(nums.length<3){
            return res;
        }
        Arrays.sort(nums);
        int look=0;
        int prev1=Integer.MAX_VALUE;
        int prev2=Integer.MAX_VALUE;

        for(int i=nums.length-1;i>=2;i--){
            if(nums[i]==prev1){
                continue;
            }else{
                prev1=nums[i];
            }
            int l=0;int r=i-1;
            while(l<r){
                if(nums[i]+nums[l]+nums[r]==0){
                    res.add(Arrays.asList(nums[l],nums[r],nums[i]));
                    while(nums[l]==nums[l+1] && l+1<r){
                        l++;
                    }
                    l++;
                    while(nums[r]==nums[r-1] && l+1<r){
                        r--;
                    }
                    r--;
                }else if(nums[i]+nums[l]+nums[r]<0){
                    l++;
                }else{
                    r--;
                }
            }
        }
        return res;
    }
}
```

# 다른 답안

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        if(nums.length == 0) return res;
        Arrays.sort(nums);
        for(int i = 0; i < nums.length && nums[i] <= 0; i++){
            if(i == 0 || nums[i] != nums[i - 1]) twoSumII(nums, i, res);
        }
        return res;
    }
    
    public void twoSumII(int[] nums, int i, List res){
        int lo = i + 1, hi = nums.length - 1, target = -nums[i];
        while(lo < hi){
            int sum = nums[lo] + nums[hi];
            if(sum < target) lo++;
            else if (sum > target) hi--;
            else{
                res.add(Arrays.asList(nums[i], nums[lo++], nums[hi--]));
                while(lo < hi && nums[lo] == nums[lo - 1]) lo++;
            }
            
        }
    }
}
```



```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        int maxVal = Integer.MIN_VALUE, minVal = Integer.MAX_VALUE, negNums = 0, posNums = 0, zeroNums = 0;
        List<List<Integer>> result = new ArrayList<>();
        
        for (int num : nums) {
            if (num < minVal)
                minVal = num;
            
            if (num > maxVal)
                maxVal = num;
            
            if (num == 0)  
                zeroNums++;
            else if (num > 0)
                posNums++;
            else
                negNums++;
        }
        
        if (zeroNums >= 3)
            result.add(Arrays.asList(0, 0, 0));

        if (minVal >= 0 || maxVal <= 0)
            return result;
        
        int posStart = 0, negNumMap[] = new int[negNums], posNumMap[] = new int[posNums];
        
        if (maxVal + 2 * minVal > 0)
            maxVal = -2 * minVal;
        
        if (minVal + 2 * maxVal < 0)
            minVal = -2 * maxVal;
        
        byte[] numMap = new byte[maxVal - minVal + 1];
        
        negNums = 0;
        posNums = 0;
        
        for (int num : nums) {
            if (num >= minVal && num <= maxVal) {
                if (numMap[num - minVal]++ != 0) {
                    numMap[num - minVal] = 2;
                } else {
                    if (num > 0)
                        posNumMap[posNums++] = num;
                    else if (num < 0)
                        negNumMap[negNums++] = num;
                }
            }
        }

        Arrays.parallelSort(posNumMap, 0, posNums);
        Arrays.parallelSort(negNumMap, 0, negNums);
        
        for (int i = negNums - 1; i >= 0; i--) {
            int nv = negNumMap[i], minpv = (-nv) / 2;
            
            while (posStart < posNums && posNumMap[posStart] < minpv)
                posStart++;
                                                    
            for (int j = posStart; j < posNums; j++) {
                int pv = posNumMap[j], ln = 0 - nv - pv;
                
                if (ln >= nv && ln <= pv) {
                    if (numMap[ln - minVal] == 0) {
                        continue;
                    } else if (ln == pv || ln == nv) {
                        if (numMap[ln - minVal] > 1)
                            result.add(Arrays.asList(nv, pv, ln));
                    } else
                        result.add(Arrays.asList(nv, pv, ln));
                } else if (ln < nv)
                    break;
            }
        }
        
        return result;
    }
}
```

