# Leetcode 4) Median of Two Sorted Arrays

![image](https://user-images.githubusercontent.com/37058233/120874651-855c1680-c55c-11eb-8b57-301324ed0762.png)

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int together= nums1.length+ nums2.length;
        int[] merged = new int[together];

        int i=0;int j=0;int cnt=0;
        while(i<nums1.length && j<nums2.length){
            if(nums1[i]<=nums2[j]){
                merged[cnt]=nums1[i];
                i++;
            }else{
                merged[cnt]=nums2[j];
                j++;
            }
            cnt++;
        }

        while(i<nums1.length){
            merged[cnt]=nums1[i];
            i++;
            cnt++;
        }
        System.out.println(nums2.length);

        while(j<nums2.length){
            merged[cnt]=nums2[j];
            j++;
            cnt++;
        }
        double res = 0.0;
        if(together%2==1){
            res=merged[together/2];
        }else{

            res=(merged[together/2] + merged[together/2-1])/2.0;
        }

        return res;
    }

}
```

# 다른 답안

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int l1 = nums1.length;
        int l2 = nums2.length;
        //make sure that l1 is the smaller array
        if(l1>l2){
            return findMedianSortedArrays(nums2, nums1);
        }
        //System.out.println(l1);
        //System.out.println(l2);

        int low=0;

        int high=l1;

        //+1 here is to avoid discussing that the l1 and l2 are odd or even
        //there are always 1 more number inthe right  side
        int sizehalf=(l1+l2+1)/2;

        // the required partition should meet 2 following condition:
        //1.the largest number in the left part need to be smaller than the smallest number in the right part
        //2.by using the partition, the length of two partitions need to same
        while(low<=high){

            //pivot1 is in the middle of array 1 
            int p1=low+(high-low)/2;

            //the sum of the length of two partitions need to always be a half of total length 
            int p2=sizehalf-p1;


            int leftmax1=(p1==0)?Integer.MIN_VALUE:nums1[p1-1];
            int rightmin1=(p1==l1)?Integer.MAX_VALUE:nums1[p1];

            int leftmax2=(p2==0)?Integer.MIN_VALUE:nums2[p2-1];
            int rightmin2=(p2==l2)? Integer.MAX_VALUE:nums2[p2];

            if(leftmax1<=rightmin2&&leftmax2<=rightmin1){

                int leftmax=Math.max(leftmax1,leftmax2);
                int rightmax=Math.min(rightmin1,rightmin2);

                if((l1+l2)%2==0){
                    return (double) (leftmax+rightmax)/2;
                }else{
                    return (double)leftmax;
                }


            }else if(leftmax1>rightmin2){
                high=p1-1;
            }else{
                low=p1+1;
            }



        }
        return -1;
    }
}
```

