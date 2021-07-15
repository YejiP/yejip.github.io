# Leetcode 200) Numbers of Islands

![image](https://user-images.githubusercontent.com/37058233/125580242-596fa808-169c-460b-86a1-633832058f0e.png)

# 내 답안

```java
class Solution {
    int cur=0;
    boolean[][] visited;
    public int numIslands(char[][] grid) {
        visited = new boolean[grid.length][grid[0].length];
        for(int i =0;i<grid.length;i++){
            for(int j=0;j<grid[0].length;j++){
                if(!visited[i][j]){
                    if(grid[i][j]!='0'){++cur;}
                    recursive(i,j,grid);   
                }
            }
        }
        return cur; 
    }

    public void recursive(int i, int j,char[][] grid){
        //아.. 0이 int가 아니라 char다..
        if(visited[i][j]){
            return;
        }
        if(grid[i][j]=='0'){
            visited[i][j]=true;
            return;
        }
        visited[i][j] =true;


        if(i+1<grid.length){
            recursive(i+1,j, grid);
        }
        if(i-1>= 0){
            recursive(i-1,j, grid);
        }
        if(j+1<grid[0].length){
            recursive(i,j+1, grid);
        }
        if(j-1>=0){
            recursive(i,j-1, grid);
        }
    }
}
```

#  다른 답안

```java
class Solution {
    public int numIslands(char[][] grid) {
        int numCols = grid[0].length;
        int numRows = grid.length;
        int numIslands = 0;
        
        for(int i=0; i<numRows; i++){
            for (int j=0; j<numCols; j++){
                if(grid[i][j]=='1'){
                    numIslands++;
                    dfs(grid, i, j);
                }
            }
        }
        
        return numIslands;
        
    }
    
    public void dfs(char[][] grid, int r, int c){
        int numRows = grid.length;
        int numCols = grid[0].length;
        //check if coordinates are valid & it's not '0' (water)
        if(r<0 || c <0 || r>= numRows || c>= numCols || grid[r][c] == '0'){
            return; 
        }
        
        grid[r][c]='0';
        //up
        dfs(grid, r-1, c);
        //down
        dfs(grid, r+1, c);
        //left
        dfs(grid, r, c-1);
        //right
        dfs(grid, r, c+1);
    }
}
```



