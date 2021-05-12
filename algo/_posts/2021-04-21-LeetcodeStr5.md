# Leetcode 5) Longest Palindromic Substring

![image](https://user-images.githubusercontent.com/37058233/117896451-75ab2400-b275-11eb-8de6-42fb0131dc7a.png)

1. **홀수일 때**
   - 한 지점에서 i에서 i-k, i+k 위치에 있는 글자들이 같으면 된다.
2. **짝수일 때**
   - 홀수일 때를 착안해서 보면, k-i+1과 k+i 위치에 있는 글자들이 같으면 된다.

- 모든 글자를 순차적으로 다 조사한다. 
- 인덱스의 처음과 마지막 범위를 벗어나지 않게 조건을 준다. 
- 맨 처음 max_str에는 첫번째 위치에 있는 character을 넣어준다. 

```java
class Solution {
    public String longestPalindrome(String s){
        String max_str=""+s.charAt(0);
        int k;
        int max_len=0;
        for(int i=0;i<s.length();i++){
            k=0;
            //홀수 palindrome일 때
            while((i>=k) && (k+i<s.length())){
                if(s.charAt(i-k)==s.charAt(i+k) ){
                    k++;
                }else{
                    break;
                }
            }
            if (2*(k-1)+1 > max_len){
                max_len=2*(k-1)+1;
                max_str = s.substring(i-(k-1),i+(k-1)+1);
                System.out.println(i+k );
            }
			//짝수 palindrome일 때
            k=0;
            while((i-k+1>=0) && (k+i<s.length()) &&(i-k+1<s.length())){
                if(s.charAt(i-k+1)==s.charAt(i+k) ){
                    k++;
                }else{
                    break;
                }
            }

            if (2*(k-1) > max_len){
                max_len=2*(k-1);
                max_str = s.substring(i-(k-1)+1,i+(k-1)+1);

            }
        }
        return max_str;
    }
}
```

1. 종이에 먼저 패턴 쓰고, 일반식 이끌어내기
2. 실행하면서 디버깅하기
3. 앞,끝은 예외 케이스니까 조심해서 해보기

# 다른 정답들

## 가장 빠른 코드

- s의 길이가 극단적일 경우를 고려해 처리해 줌 (string 이 null이거나 , 길이가 1이거나.)
- 나는 charAt(index) 함수를 썼고, 여기선 string을 toCharArray()함수를 사용, 캐릭터 어레이로 바꿔서 썼다.

```java
class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 2) return s;
        char[] str = s.toCharArray();
        int start = 0, len = 0;
        for (int i = 1; i < str.length; i++) {
            int a = i - 1, b = i + 1;
            while (a >= 0 && b < str.length && str[a] == str[b]) {
                a--;
                b++;
            }
            if (b - a - 1 > len) {
                len = b - a - 1;
                start = a + 1;
            }
            if (str[i - 1] != str[i]) continue;
            a = i - 1;
            b = i;
            while (a >= 0 && b < str.length && str[a] == str[b]) {
                a--;
                b++;
            }
            if (b - a - 1 > len) {
                len = b - a - 1;
                start = a + 1;
            }
        }
        return s.substring(start, start + len);
    }
}
```

## 가장 무난한 

```java
class Solution {
    public String longestPalindrome(String s) {
        int start = 0, end =0;
        for(int i=0;i< s.length();i++){
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i+1);
            int len = Math.max(len1, len2);
            if( len > end - start){
                start  = i - (len-1)/2;
                end = i + len/2;
            }
        }
        return s.substring(start, end +1);
    }
    
    private int expandAroundCenter(String s, int i, int j){
        
        int Left = i;int Right = j;
        
        while(Left >= 0 && Right < s.length() && s.charAt(Left) == s.charAt(Right)){
            Left --;
            Right ++;
        }
        return Right - Left -1;
    }
}
```

