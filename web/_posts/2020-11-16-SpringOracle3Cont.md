---
layout: post
category: web
tags: spring
---
# Spring과 Oracle DB 연결 - JSP,Controller 설정

- Oracle DB를 연결하기 위한 환경 세팅은 거의 끝났다.  이제 **Repository 객체를 Controller 객체에서 어떻게 사용**하고, **JSP와 Controller가 어떻게 상호작용하는지** 보도록 해보자. 전체 코드는 다음번, guestbook 구현하기에서 자세하게 보도록 할 것이다.

![overall](https://user-images.githubusercontent.com/37058233/99876696-b7023580-2c3b-11eb-843c-dbf64d0c51e2.PNG)

# Repository 객체를 Controller 객체에서 사용

- 이전 포스트인  [Spring과 Oracle DB 연결 - 구현](http://yejip.com/web/2020-11-16-SpringOracle2DB/)에서 repository 객체인 guestbookMapper를 만들었다. 이것을 controller 객체에서 사용하는 방법은 다음과 같다.

- **repository 객체 생성하기**

  - @Autowired를 사용하면, Spring에서 객체를 던져줌으로 약한 결합을 가능하게 한다.

  ```java
  @Autowired
  GuestbookMapper gm;
  ```

- **repository 객체 사용**

  ```java
  List<GuestBookVO> list = gm.selectAll(); //그냥 펑소대로 사용하면 된다.
  ```

- 다음과 같이 사용할 수 있다.

```java
@Controller
public class GuestbookController {
    @Autowired
    GuestbookMapper gm;
    @RequestMapping("/list")
    public String list(Model model) {
        List<GuestBookVO> list = gm.selectAll();
        model.addAttribute("list",list);
        return "list";
    }
```

# JSP와 CONTROLLER의 상호작용

-  jsp파일은 src/main/webapp/WEB-INF/views에 생성하고, Controller는 src/main/java에 패키지 아래에 생성해준다.

![folder](https://user-images.githubusercontent.com/37058233/99876694-b5387200-2c3b-11eb-9857-27c20e35bc7e.PNG)

## **mainController와 index.jsp**

- 이 프로젝트의 컨트롤러는 총 두개다. mainController와 guestbookController. 그냥 의미상 나눠놓은 것이지, 합쳐도 별 상관은 없다

- class 명 위에 @Controller (어노테이션 controller)라고 쓰면 컨트롤러 객체를 선언할 수 있다.

  ```java
  @Controller
  public class MainController {}
  ```

- controller 객체의 함수 위에는 @RequestMapping 이라는 키워드를 쓴다. 아래 코드를 보면 RequestMapping("/") 라고 되어있는데 이것은 **jsp에서 '/' 요청이 들어오면 이 함수를 실행하라** 라는 뜻이다.
- '/'요청은 처음 시작될 때 들어간다.
- return type은 string이고, **"index"를 리턴**하고 있는데, 이는 **함수를 실행하고 그 후 index.jsp 페이지를 보여달라**는 것이다.
- 위 설명처럼 jsp와 controller 객체는 단방향 소통이 아니라 **양방향 소통**이다.

```java
package sesoc.intern.guestbook2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class MainController {
	@RequestMapping("/")
	public String index() {
		return "index";
	}
}
```

## **index.jsp와 guestbookController**

1. **index.jsp에서 list라는요청을 보내면**
2. **guestbookController.java의 @RequestMapping("/list") 함수와 매핑**이되어 코드가 실행되고, 그 후
3.  **return 한 페이지인 list.jsp** 페이지를 보여준다.<img width="594" alt="1116sp19" src="https://user-images.githubusercontent.com/37058233/99877503-05b2ce00-2c42-11eb-9760-acb7067a52ce.PNG">

```java
package sesoc.intern.guestbook2;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import sesoc.intern.guestbook2.dao.GuestbookMapper;
import sesoc.intern.guestbook2.vo.GuestBookVO;
@Controller
public class GuestbookController {
    @Autowired
    GuestbookMapper gm;
    @RequestMapping("/list")
    public String list(Model model) {
        List<GuestBookVO> list = gm.selectAll();
        model.addAttribute("list",list);
        return "list";
    }
```

다음 시간에는 guestbook을 spring으로 구현하는 시간을 가질 것이다. -끝-
