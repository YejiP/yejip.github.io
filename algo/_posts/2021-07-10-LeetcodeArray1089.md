# Leetcode 1089) Duplicates Zeros

![image](https://user-images.githubusercontent.com/37058233/125366979-1c6e7800-e32c-11eb-8e70-db1a731a9687.png)

# 내 답안

```java
class Solution {
    public void duplicateZeros(int[] arr) {
        int zeros = 0;int i=0;
        
        while(i+zeros<arr.length){
            if(arr[i]==0){
                zeros ++;
            }
            i++;
        }
        //잘렷을떄
        int j=arr.length-1;

        if(i+zeros ==arr.length+1){
            zeros--;
            arr[j]=0;
            j--;
        }
            while(j>=0){
                arr[j]=arr[j-zeros];
                if(arr[j]==0){
                    j--;
                    arr[j]=0;
                    zeros--;
                }
                j--;
            }
        }
        
    }

```

#  다른 답안

```java
class Solution {
    public void duplicateZeros(int[] arr) {
        int n = arr.length - 1;
        int  skips = 0;
        for (int i = 0; i <= n - skips ; i++)
            if(arr[i] == 0){
                if(i == n - skips) {
                    arr[n--] = 0;
                    break;
                }
                skips++;
            }
        for(int pos = n - skips; pos>=0;){
            arr[n--] = arr[pos];
            if(arr[pos--]==0)
                arr[n--]=0;
        }
    }
}
```