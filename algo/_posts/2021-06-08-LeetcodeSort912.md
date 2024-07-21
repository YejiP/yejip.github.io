# Leetcode 912) Sort an Array

![image](https://user-images.githubusercontent.com/37058233/121466014-854c8400-c96b-11eb-9636-798216aa2483.png)

```java
class Solution {
    public int[] sortArray(int[] nums) {
        int start=0;
        int end=nums.length;
        return mergeSort(start,end,nums);

    }
    public int[] mergeSort(int start,int end, int[] nums){
        if(end-start==1){
            int[] h= new int[1];
            h[0]=nums[start];
            return h;
        }
        int middle= (start+end)/2;
        int[] left = mergeSort(start,middle,nums);
        int[] right = mergeSort(middle,end,nums);

        int i =0;int j=0; int cnt=0;
        int[] res = new int[left.length + right.length];
        while(i < left.length && j < right.length){
            if(left[i]<right[j]){
                res[cnt]=left[i];
                i++;
            }else{
                res[cnt]= right[j];
                j++;
            }
            cnt++;
        }

        while(i<left.length){
            res[cnt]=left[i];
            cnt++;i++;
        }
        while(j<right.length){
            res[cnt]=right[j];
            cnt++;j++;
        }

        return res;
    }

} 
```

# 다른 답안

```java
class Solution {
    public int[] sortArray(int[] nums) {
        if (nums.length == 1) {
            return nums;
        }

        int mid = nums.length / 2;

        int[] left = sortArray(Arrays.copyOfRange(nums, 0, mid));
        int[] right = sortArray(Arrays.copyOfRange(nums, mid, nums.length));

        return merge(left, right);
    }

    public int[] merge(int[] left, int[] right) {
        int[] res = new int[left.length + right.length];

        int i = 0, j = 0, k = 0;

        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                res[k++] = left[i++];
            } else {
                res[k++] = right[j++];
            }
        }

        while (i < left.length) {
            res[k++] = left[i++];
        }
        while (j < right.length) {
            res[k++] = right[j++];
        }

        return res;
    }
}
```

