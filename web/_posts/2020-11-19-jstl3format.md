---
layout: post
category: web
tags: spring
---
# JSTL format 문법

- jsp 파일 머리부분에 다음과 같은 페이지 지시자를 써준다.

```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
```

- 태그 라이브러리를 꼭! 불러와야지 쓸 수 있다. 만약 라이브러리 설정 안 했다면 [JSTL 기본설정편](http://yejip.com/web/2020-11-19-jstl1기본설정/)으로 가서 보면서 세팅하시길
- 서버에서 jsp로 데이터를 보내는 방법은 [서버에서 JSP로 데이터 전송](http://yejip.com/web/2020-11-12-spring4/)에 적었다. 혹시 이해 못하신 분들은 가서 보시길…

##  **JSTL FORMAT  날짜, 시간**

**컨트롤러 자바**

```java
@Controller
public class JSTLController {
    @RequestMapping("/jstlformat")
    public String jstlformat(Model model){
        //이거 실무에서 잘 안 쓴다.그냥 단순하게 테스트 하는 용
        Date today = new Date();
        model.addAttribute("today",today);
        return "jstlformat";
    }
}
```

**jsp파일**

```jsp
<div class ="wrapper">
    <h1>[JSTL Formatting Library]</h1>
    <h2>* 날짜, 시간 출력</h2>
    <fmt:formatDate value = "${today}" type="date"/><br>
    <fmt:formatDate value = "${today}" type="time"/><br>
    <fmt:formatDate value = "${today}" type ="both"/><br>
    <fmt:formatDate value = "${today}" type ="date" pattern="yyyy년 MM월 dd일 E요일"/><br>
    <fmt:formatDate value = "${today}" type ="time" pattern ="hh시  mm분 ss초"/><br>
```

**결과**

<img width="486" alt="1119sp3-1" src="https://user-images.githubusercontent.com/37058233/99906005-d5d5fa00-2d17-11eb-9fb1-3a153cce0d74.PNG">

## **JSTL FORMAT  수치,데이터**

**컨트롤러 자바**

```java
@Controller
public class JSTLController {
    @RequestMapping("/jstlformat")
    public String jstlformat(Model model){
        double num1 = 1234.234;
        double num2 = 99.9;
        double num3 = 0.1;

        model.addAttribute("num1",num1);
        model.addAttribute("num2",num2);
        model.addAttribute("num3",num3);
        return "jstlformat";
    }
}
```

**jsp파일**

```jsp
<fmt:formatNumber value = "${num1}" pattern="#,###.00" /><br>
<fmt:formatNumber value = "${num2}" pattern="#,###.00"  /><br>
<fmt:formatNumber value = "${num2}" pattern="#,###.##"  /><br>
<fmt:formatNumber value = "${num3}" pattern="0.0%"/><br>
```

**결과**

<img width="408" alt="1119sp3-2" src="https://user-images.githubusercontent.com/37058233/99906003-d53d6380-2d17-11eb-9ae0-bbda9318fc17.PNG">



체력이 딸려서 살짝 불친절한 포스팅이었당.. 사진의 결과와 매칭해서 쓰면 된다..ㅎ
