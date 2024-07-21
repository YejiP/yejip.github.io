# Consecutive Sequence Sum

## Brute force 

- Iterate all the possibilities.

```java
for(int i =0; i< ary.length ;i ++){
    for(int j =0; j< i ; j++){
        int sum=0;
        for(int k=j;k<i;k++){
            //generate sum starting from j to i.
            sum += ary[k];
        }
    }
}
```

## How to make Sum of Consecutive Subarrays by using Prefix sum?

Subtracting one prefix sum to another prefix sum will always return the sum of consecutive subarrays in the array.  **Prefix sum always start from index 0**. 

- Let's say we have an array, like following. 

  ```
  index =   0, 1, 2, 3, 4, 5
  array = [-1, 2, 3,14,-3, 1]
  ```

- Using two prefix sum, We can make any consecutive subarrays.

  ```
  prefixSum[a,b) = prefixSum[0,b) - prefixSum[0,a)
  ```

  ex ) prefixSum[3,6) = prefixSum[0,6)-prefixSum[0,3) 

   => Last index is not included.

  ![image](https://user-images.githubusercontent.com/37058233/142061302-0c80d140-82fa-4ac7-9461-f612b10cf7fd.png)

## HashMap Combined approach

- Along with the running sum, store all prefix sum into a map.

  Let's say our running sum is arr[0,7). Using hashmap, we can generate any sum of consecutive subarrays that contains arr[6].

  - *runningSum* will keep cumulative sum up to current index.
    - Each iteration, add current element to the running sum.
  - *prefixSum* will contains all cumulative sum before current index.
    - Each iteration, at the end, add current running sum to prefixSum.

  ```
  - Running sum = sum(arr[0,4)) 
  - HashMap prefixSum = {sum(arr[0,1)):val, sum(arr[0,2)):val, sum(arr[0,3)):val} 
  ```

  (Running sum - prefixSum) can generate consecutive subarrays that contain the last element.

  ```
  Ruunning Sum  - Prefix Sum
  sum(arr[0,4)) - sum(arr[0,1)) => arr[1,4)
  sum(arr[0,4)) - sum(arr[0,2)) => arr[2,4)
  sum(arr[0,4)) - sum(arr[0,3)) => arr[3,4)
  ```

## Time complexity compared to Brute force

- Brute force : O(n^3)

  ```java
  for(int i =0; i< ary.length ;i ++){
      for(int j =0; j< i ; j++){
          //we can generate all combination of consecutive subarrays => O(n^2)
          //How we genereate sum ? => we add up all one by one..
          int sum=0;
          for(int k=j;k<i;k++){
              //The worst case, It takes O(n) => O(n^2*n) => O(n^3)
          }
      }
  }
  ```

- Cumulative sum with Hash:  O(n)

  ```java
  for(int i =0; i< ary.length ;i ++){
      //we will update running sum for each iteration, and store that values into hashmap.
      //Using Hashmap, We don't have to generate all consecutive subarrays 
      //but we have to figure out logic first and see if target value is in the map. if it is. => O(1) 
           map.containsKey(calculate(runningSum, target)) 
      }
  }
  ```

# Application

[Leetcode560]() : logic - see if running sum exists in prefix sum , meaning running sum - prefix sum ==0 => toal sum of consecutive subarray is 0.

[Leetcode974]() :  

[Leetcode1590](): 

