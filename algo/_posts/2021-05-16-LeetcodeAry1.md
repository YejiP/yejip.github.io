# Leetcode1) Two Sum

![image](https://user-images.githubusercontent.com/37058233/119086649-a77d6280-b9ba-11eb-9907-5bd30d8036b4.png)

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[] result = new int[2];
        for(int i=0;i<nums.length;i++){            
            for (int j=i+1;j<nums.length;j++){
                int sum =nums[i]+ nums[j];
                if(sum==target){
                    result[0] = i;
                    result[1]=j;
                }
            }

        }    
        return result;

    }
}
```

# 오답

- 음수 생각하지 않고 풀었다. => Constraints에서 범위 잘 보기!

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[] result = new int[2];
        for(int i=0;i<nums.length;i++){            
            if(nums[i]>target){
                continue;
            }else{
                for (int j=i+1;j<nums.length;j++){
                    int sum =nums[i]+ nums[j];
                    if(sum==target){
                        result[0] = i;
                        result[1]=j;
                    }
                }
            }
        }    
        return result;

    }
}
```

# 다른 풀이 

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        //int[] rtn = new int[2];
        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
        for(int i = 0; i < nums.length; i++){
            if(map.containsKey(nums[i])){
                //int[] rtn = {};
                return new int[]{i,map.get(nums[i])};
            }
            map.put(target-nums[i], i);
        }
        return null;
    }
}
```

