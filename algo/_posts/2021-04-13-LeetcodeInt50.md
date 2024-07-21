# Leetcode50) Power(x,n)

https://leetcode.com/problems/powx-n/

![image](https://user-images.githubusercontent.com/37058233/114621849-1223db80-9c62-11eb-8e34-ba2580a53196.png)

```java
class Solution {
    public double myPow(double x, int n) {       
        double result=1.0;
        boolean positive=true;
        if(n<0){
            positive=false;
            n=-n;
        }
        while(n>0){
            result *= x;
            n--;
        }
        if(positive){
            return result;         
        }else{
            return 1/result;
        }
    }
}
```

![image](https://user-images.githubusercontent.com/37058233/114623283-e7d31d80-9c63-11eb-8c2e-7ee40b8e779e.png)

- 이렇게 하니까, 아주 작은 수는 0이 된다. 아마 정수로 곱해서 나누는 거랑 애초에 분수로 곱하는 거랑 차이가 있나보다.

```java
class Solution {
    public double myPow(double x, int n) {       
        boolean positive=true;
        if(n==0){
            return 1;
        }
        if(n<0){
            positive=false;
            n=-n;
            }
        long num=n;
        double result=1.0;
        while(num>0){
            if(num%2==0){
                x=x*x;
                num=num/2;
            }else{
                result=result*x;
                num--;
            }

        }

        
        if(positive){
            return result;         
        }else{
            return 1.0/result;
        }
    }
        
}

```

- 위 코드랑 뭐가 그렇게 다르다고?

```java
class Solution {
    public double myPow(double x, int n) {       
        double ans =1.0;
        long num = n;
        if(n<0){
            num=-num;
        }
        while (num>0){
            if(num%2 ==0){
                x=x*x;
                num=num/2;
            }else{
                ans=ans*x;
                num=num-1;
            }
        }
        if(n<0){
            return (double)(1.0)/(double)(ans);
        }
            return ans;


    }
}
```

