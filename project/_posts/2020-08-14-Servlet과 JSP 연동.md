---

layout: post

title : HTML&CSS basic

description: >

​	일년만에 servlet과 JSP를 연동해본다. 디자인 또한 중요하다는 것을 깨달았기 때문이다.

excerpt_separator: <!--more-->

---



# JSP & Servlet 연동

Servlet은 로직 구현시에는 편하지만, HTML을 쓰기엔 좀 불편하다. JSP는 반대로 로직 구현시 불편하지만 HTML은 편하다. 그래서 둘을 연동 시킨다.



현재까지 내 프로젝트는 알고리즘의 동작을 보여주기 위해서 Servlet을 사용해서 구동시켰다. 근데 결과 페이지가 너무 보잘 것 없어 보여서 조금의 디자인을 입히고 싶다. 그래서 JSP를 사용해서 결과 페이지를 꾸며보도록 할 것이다. 

[![이런식으로](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile22.uf.tistory.com%2Fimage%2F99E93B335B36F467199443)](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile22.uf.tistory.com%2Fimage%2F99E93B335B36F467199443) 

[출처]([https://starkying.tistory.com/entry/Forward-%EA%B7%B8%EB%A6%AC%EA%B3%A0-Servlet-JSP%EC%9D%98-%EC%97%B0%EB%8F%99](https://starkying.tistory.com/entry/Forward-그리고-Servlet-JSP의-연동))



servlet에서 계산된 result를 forward 시켜 jsp 파일로 보낸다. 그래서 브라우저에 보이게 해보자.



## 기존  (ANN , number package)

### 기존 코드

아래의 코드가 Servlet 파일에 있던 코드다.

```


/**
 * Servlet implementation class n_ml
 */

<span style="color:red"> index.html 파일에서, <form id = "info" action="ml" method="post"> 이 부분이 이 파일과 연결시켜준다.(action 에 들어가게 됨) </span>
@WebServlet("/ml")
public class n_ml extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public n_ml() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		<span style="color:red"> String nn에는 index페이지에서 얻은 픽셀의 정보가 저장되어있다.</span>
		String nn = request.getParameter("key");
		PrintWriter out = response.getWriter();
		
		<span style="color:red"> 여기서 Algorithm execute 한다.</span>
		ann.execute(nn);
		
		<span style="color:red"> 여기서 화면에 보이게 한다. 이게 문제... 페이지가 안 이쁨
		여기서 JSP로 연결해줘야 할 듯.</span>
		out.print(ann.result);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}

```



### 기존 화면

![기존_index](./img/Ann_3.PNG?raw=true "Title")

캔버스에 3을 큼직하게 적고 제발 잘 작동해주거라 하는 경건한 마음으로 submit!을 누른다.

그러면 내 마음에 감동해서 알고리즘이 잘 동작하고 3으로 추정해준다.

![기존_index](./img/Ann_result.PNG?raw=true "Title") 이게 바로 내가 고치고 싶은 것... 드넓은 페이지에 numbersestimation : 3만 써있다ㅎ

여기를 꾸밀 것이다. JSP로!



#### [Bonron]

여기서 부터 시작!

/ --> WebContent 아래 경로를 의미한다. 따라서, 

​		RequestDispatcher rd = request.getRequestDispatcher("/result.jsp");

일케쓰면, WebContent 아래 result.jsp를 불러오는거! 

