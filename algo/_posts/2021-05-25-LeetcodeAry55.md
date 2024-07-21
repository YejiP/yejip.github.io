# Leetcode 55) Jump Game

![image](https://user-images.githubusercontent.com/37058233/119577188-fd615a00-bd6e-11eb-8902-cf23d681074a.png)

- [https://yejip.com/algo/2021-05-13-LeetcodeStr139/](https://yejip.com/algo/2021-05-13-LeetcodeStr139/) 여기에서 다른 답안에서 나온 방법으로 풀어봄.

```java
class Solution {
    public boolean canJump(int[] nums) {
        boolean[] position = new boolean[nums.length];
        int hop=nums[0];
        position[0]=true;    
        int i=0;
        while(position[i]==true && i<nums.length){
            for(int j=i;j<=i+nums[i];j++){
                if(j==nums.length){
                    return true;
                }
                position[j]=true;

            }
            i++;
            if(i==nums.length){
                break;
            }
        }
        if(position[nums.length-1]){
            return true;
        }else{
            return false;
        }

    }
}
```

# 다른 풀이

- 그냥 단순하게, for문으로 모든 원소를 순회하고 i+nums[i] 를 변수에 넣어서 이게 끝 인덱스에 닿으면 ㅇㅋ 아니면 false 리턴!

```java
class Solution {
    public boolean canJump(int[] nums) {
        int reachable = 0;
    for (int i=0; i<nums.length; i++) {
        if (i > reachable) return false;
        reachable = Math.max(reachable, i + nums[i]);
    }
    return true;
    }
}
```

