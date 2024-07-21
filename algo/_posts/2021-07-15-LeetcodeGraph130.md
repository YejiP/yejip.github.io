# Leetcode 130)  Surrounded Regions

![image](https://user-images.githubusercontent.com/37058233/126050489-27c0d499-1742-48b6-811a-07d459931d87.png)

# 내 답안

```java
class Solution{
    boolean[][] visited;
    public void solve(char[][] board) {
        int a=board.length;
        int b= board[0].length;
        visited= new boolean[board.length][board[0].length];
        for(int j=0;j<board[0].length;j++){
            visited[0][j]=true;
            if(board[0][j]=='O'){
                if(a>1){
                    recursive(1,j,board);}
            }
            visited[board.length-1][j]=true;
            if(board[board.length-1][j]=='O'){
                if(board.length-2>=0)
                recursive(board.length-2,j,board);
            }
        }
        for(int i=0;i<board.length;i++){
             visited[i][0]=true;
            if(board[i][0]!='X'){
                if(b>1){
                recursive(i,1,board);
                }
            }
            visited[i][board[0].length-1]=true;
            
            if(board[i][board[0].length-1]!='X'){
                if(board[0].length-2>=0){
                recursive(i,board[0].length-2,board);}
            }
        }
             
               for(int i=0;i<board.length;i++){
                   for(int j=0;j<board[0].length;j++){
                       if(!visited[i][j]){
                           if(board[i][j]=='O'){
                               board[i][j]='X';
                           }
                       }
                   }
               }
               
               

    }
    
    
    public void recursive(int i , int j, char[][] board){
        if (visited[i][j] || board[i][j]=='X'){
            return;
        }
        
        visited[i][j]=true;

        if(i>0 && i<board.length-1 && j>0 && j<board[0].length-1){
            recursive(i+1,j,board);
            recursive(i-1,j,board);
             recursive(i,j+1,board);    
             recursive(i,j-1,board);}
        }

    //바깥에 닿아있는 O들 중심으로 먼저 살펴본다. 그리고 그 외 INSPECT하면서 O있으면 바로 X로 바꿔주면 될듯
}
```

#  다른 답안

```java
class Solution {
    public void solve(char[][] board) {
        if(board.length == 0 || board[0].length == 0){
            return;
        }
        
        int rows = board.length;
        int cols = board[0].length;
        
        // Any 0 connected to a boundary can't be captured, so
        
        // Start from first and last col, turn 0 to *
        for(int i = 0; i < rows; i++){
            if(board[i][0] == 'O') boundaryDfs(board, i, 0);
            if(board[i][cols - 1] == 'O') boundaryDfs(board, i, cols - 1);
        }
        
         // Start from first and last row, turn 0 to *
        for(int j = 0; j < cols; j++){
            if(board[0][j] == 'O') boundaryDfs(board, 0, j);
            if(board[rows- 1][j] == 'O') boundaryDfs(board, rows - 1, j);
        }
        
        
        // Turn all 0 to X and all * to 0
        for(int i = 0; i < rows; i++){
            for(int j = 0; j < cols; j++){
                if(board[i][j] == 'O') board[i][j] = 'X';
                else if(board[i][j] == '*') board[i][j] = 'O';
            }
        }
    }
    
    private void boundaryDfs(char[][] board, int i, int j){
        // check within bounds
        if(i > board.length || i < 0 || j > board[0].length || j < 0) return;
        
        if(board[i][j] == 'O') board[i][j] = '*';
        
        // traverse surrounding regions(left , right, top, bottomn)
        if(i > 0 && board[i-1][j] == 'O'){
            boundaryDfs(board, i-1, j);
        }
        if(i < board.length - 1 && board[i+1][j] == 'O'){
            boundaryDfs(board, i+1, j);
        }
        if(j > 0 && board[i][j-1] == 'O'){
            boundaryDfs(board, i, j-1);
        }
        if(j < board[0].length - 1 && board[i][j+1] == 'O'){
            boundaryDfs(board, i, j+1);
        }
        return ;
    }
}
```

# 오답

- if문 범위를 잘못생각했다.

```java
if(i>1 && i<board.length-2 && j>1 && j<board[0].length-2){
    recursive(i+1,j,board);
    recursive(i-1,j,board);    
    recursive(i,j+1,board);    
    recursive(i,j-1,board);    }
```

