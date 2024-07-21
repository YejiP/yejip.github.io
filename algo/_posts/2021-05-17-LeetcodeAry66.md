# Leetcode 66) Plus One

![image](https://user-images.githubusercontent.com/37058233/119087544-28892980-b9bc-11eb-81a4-8465e5786fa6.png)

- 아래 (남이 푼) 다른 풀이가 굉장히 깔끔하다. 그걸 꼭 볼 것!

```java
class Solution {
    public int[] plusOne(int[] digits) {
        int len = digits.length;
            int ind = len-1;
            int now=digits[ind];
            while(now==9){
                if(ind==0){
                    int[] ary =new int[digits.length+1];
                        ary[0]=1;
                    ary[1]=0;
                    //이거 없어야한다. 왜냐면 어차피 다 0이니까.
                    for(int a=2;a<digits.length+1;a++){
                        ary[a]= digits[a-1];
                    }
                    return ary; 
                }
                digits[ind] = 0;
                ind--;
                now = digits[ind];
            }
            digits[ind] = ++digits[ind];
            return digits;
        }    
}
```

# 오답

- 이렇게 하면 안된다. 왜냐하면, constraint에 보면 digits 어레이 길이가 100개 까지 되는데(숫자로 표현하면 100자리수), int의 범위는 2147483647(10자리), long의 범위는 9,223,372,036,854,775,807(19자리) 때문에 표현이 다 안된다.

  ![image](https://user-images.githubusercontent.com/37058233/119087673-60906c80-b9bc-11eb-80bc-101387d9a3e9.png)

```java
class Solution {
    public int[] plusOne(int[] digits) {
        long sum=0;
        for(int i=0;i<digits.length;i++){
            sum+=Math.pow(10,(digits.length-1-i))*digits[i];
        }
        sum++;
        String str = sum+"";
        int[] res = new int[str.length()];
        for(int i =0;i<str.length();i++){
            res[i]=str.charAt(i) - '0';
        }
    return res;
    }
}
```

# 다른 풀이 

```java
class Solution {
    public int[] plusOne(int[] digits) {
        int n = digits.length;
        for(int i=n-1; i>=0; i--) {
        if(digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        
            digits[i] = 0;  
        }
        //초기화시키면 모두 0으로 초기화 되니까, 그냥 이렇게 해도 되구나..
         int[] newNumber = new int [n+1];
         newNumber[0] = 1;
            
        return newNumber;
    }
}
```

