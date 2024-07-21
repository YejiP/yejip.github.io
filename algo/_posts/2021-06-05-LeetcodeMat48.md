# Leetcode 48) Rotate Image

![image](https://user-images.githubusercontent.com/37058233/120909340-f537d300-c628-11eb-9449-8942f51d76c3.png)

```java
class Solution {
    public void rotate(int[][] matrix) {
        int additional; 
        for(int k=0;k<matrix.length/2;k++){
            for(int i=k;i<matrix.length-1-k;i++){
                additional = matrix[k][i];
                matrix[k][i]=matrix[matrix.length-i-1][k];
                matrix[matrix.length-i-1][k]=matrix[matrix.length-k-1][matrix.length-i-1];
                matrix[matrix.length-k-1][matrix.length-i-1]=matrix[i][matrix.length-k-1]; 
                matrix[i][matrix.length-k-1]=additional; 
            }
        }
    }
}
```

# 다른 답안

```java
class Solution {
    public void rotate(int[][] matrix) {
        transpose(matrix);
        reflect(matrix);
    }

    public void transpose(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int tmp = matrix[j][i];
                matrix[j][i] = matrix[i][j];
                matrix[i][j] = tmp;
            }
        }
    }

    public void reflect(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[i][n - j - 1];
                matrix[i][n - j - 1] = tmp;
            }
        }
    }
}
```

