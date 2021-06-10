# Leetcode 74) Search a 2D Matrix

![image](https://user-images.githubusercontent.com/37058233/121442023-a5fee480-c93f-11eb-8516-7d1d5eced4de.png)

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int row=0;
        for(int i =0;i<matrix.length;i++){
            if(matrix[i][matrix[0].length-1]>=target){
                row=i;
                break;
            }
        }
        for(int i =0;i<matrix[0].length;i++){
            if(matrix[row][i]==target){
                return true;
            }
        }
        return false;

    }
}
```

# 다른 답안

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix.length == 0) return false;

        for (int i = 0; i < matrix.length; ++i) {
            for (int j = 0; j < matrix[0].length; ++j) {
                if (matrix[i][j] == target) {
                    return true;
                } else if (matrix[i][j] > target) {
                    return false;
                }
            }
        }
        return false;
    }
}
```

