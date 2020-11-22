# JSTL format 문법

##  JSTL FORMAT

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Insert title here</title>
    </head>
    <body>
        <div class ="wrapper">
            <h1>[JSTL Formatting Library]</h1>
            <h2>* 날짜, 시간 출력</h2>
            <fmt:formatDate value = "${today}" type="date"/><br>
            <fmt:formatDate value = "${today}" type="time"/><br>
            <fmt:formatDate value = "${today}" type ="both"/><br>
            <fmt:formatDate value = "${today}" type ="date" pattern="yyyy년 MM월 dd일 E요일"/><br>
            <fmt:formatDate value = "${today}" type ="time" pattern ="hh시  mm분 ss초"/><br>

            <h2>* 수치 형식 데이터 출력</h2>
            <fmt:formatNumber value = "${num1}" pattern="#,###.00" /><br>
            <fmt:formatNumber value = "${num2}" pattern="#,###.00"  /><br>
            <fmt:formatNumber value = "${num2}" pattern="#,###.##"  /><br>
            <fmt:formatNumber value = "${num3}" pattern="0.0%"/><br>

        </div>
    </body>
</html>
```



## **Controller**

```java
package sesoc.intern.jstl;
import java.util.List;
import java.util.Map;
import java.util.Date;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import sesoc.intern.jstl.vo.Friend;
@Controller
public class JSTLController {
    @RequestMapping("/jstlcore")
    public String jstl(Model model) {
        String str1 = "Korea";
        String str2 = null;
        String str3 = "";
        int num = 12345;
        String tag = "<marquee>이것은 태그입니다.</marquee>";
        Friend friend = new Friend("삼장법사", 45,"01021553300");
        List<String> list= new ArrayList<>();
        list.add("apple");
        list.add("pear");
        List<Friend> flist= new ArrayList<>();
        flist.add(new Friend("손오공",24,"0103242"));
        flist.add(new Friend("오공손",24,"0103242"));
        //map은 interface라서 객체를 생성할 수 없다. 그래서 Hashmap으로 instance를 설정해누다.
        Map<String, Friend> map = new HashMap<String, Friend>();
        map.put("kang",new Friend("강감찬",45,"02-123-4535"));
        map.put("kim",new Friend("강동원",75,"02-123-4535"));
        map.put("Lee",new Friend("이예지",55,"02-123-4535"));

        map.put("choi",new Friend("최봉",32,"02-123-4535"));
        list.add("pear");


        //model에 데이터 담기
        model.addAttribute("str1",str1);
        model.addAttribute("str2",str2);
        model.addAttribute("str3",str3);
        model.addAttribute("num",num);
        model.addAttribute("friend",friend);
        model.addAttribute("tag",tag);
        model.addAttribute("fruit",list);
        model.addAttribute("flist",flist);
        model.addAttribute("map",map);

        return "jstlcore";
    }

    @RequestMapping("/jstlformat")
    public String jstlformat(Model model){
        double num1 = 1234.234;
        double num2 = 99.9;
        double num3 = 0.1;
        //이거 잘 안쓰고 그레고리안 캘린더 어쩌구 그거 쓴다. 이건 그냥 단순하게 테스트 하는 용이라 쓴다.
        Date today = new Date();
        model.addAttribute("today",today);
        model.addAttribute("num1",num1);
        model.addAttribute("num2",num2);
        model.addAttribute("num3",num3);
        return "jstlformat";

    }
    @RequestMapping("/jstlfunc")
    public String jstlfunc(Model model) {
        String str = "abc 가나다 ans ==ABS";
        String hobby = "reading watchingTv";
        String gender = "man";
        String searchItem ="content";

        model.addAttribute("str",str);
        model.addAttribute("hobby",hobby);
        model.addAttribute("gender",gender);
        model.addAttribute("searchItem",searchItem);
        return "jstlfunc";

    }

}
```

