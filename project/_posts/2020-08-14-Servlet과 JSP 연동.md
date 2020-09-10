---
ㄴ
layout: post

title : servlet and JSP

description: >

	일년만에 servlet과 JSP를 연동해본다. 디자인 또한 중요하다는 것을 깨달았기 때문이다.

excerpt_separator: <!--more-->

---



# JSP 와 Servlet 연동

Servlet은 로직 구현시에는 편하지만, HTML을 쓰기엔 좀 불편하다. JSP는 반대로 로직 구현시 불편하지만 HTML은 편하다. 그래서 둘을 연동 시킨다.



현재까지 내 프로젝트는 알고리즘의 동작을 보여주기 위해서 Servlet을 사용해서 구동시켰다. 근데 결과 페이지가 너무 보잘 것 없어 보여서 조금의 디자인을 입히고 싶다. 그래서 JSP를 사용해서 결과 페이지를 꾸며보도록 할 것이다. 

[![이런식으로](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile22.uf.tistory.com%2Fimage%2F99E93B335B36F467199443)](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile22.uf.tistory.com%2Fimage%2F99E93B335B36F467199443) 

[출처](["https://starkying.tistory.com/entry/Forward-%EA%B7%B8%EB%A6%AC%EA%B3%A0-Servlet-JSP%EC%9D%98-%EC%97%B0%EB%8F%99])



servlet에서 계산된 result를 forward 시켜 jsp 파일로 보낸다. 그래서 브라우저에 보이게 해보자.



## 1. ANN 프로젝트 페이지에 JSP 추가하기

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

![기존_index](https://user-images.githubusercontent.com/37058233/90485466-7beef280-e172-11ea-881a-5f06a27cada5.PNG)

캔버스에 3을 큼직하게 적고 제발 잘 작동해주거라 하는 경건한 마음으로 submit!을 누른다.

그러면 내 마음에 감동해서 알고리즘이 잘 동작하고 3으로 추정해준다.

![기존_index](https://user-images.githubusercontent.com/37058233/90485511-9032ef80-e172-11ea-8882-e0cd17ad494f.PNG) 이게 바로 내가 고치고 싶은 것... 드넓은 페이지에 numbersestimation : 3만 써있다ㅎ

여기를 꾸밀 것이다. JSP로!





## 시작

### a.

/ : WebContent 아래 경로를 가리킨다. 따라서, RequestDispatcher rd = request.getRequestDispatcher("/result.jsp");

위와 같이 쓰면, WebContent 아래 result.jsp를 불러오는거다.



### b.

servlet 파일에서 jsp로 forward 해주면 된다. 

다음과 같은 흐름을 가지고 있다.

 

1. Index 페이지에서 사용자가 입력한 값 받고, Servlet에 전달해주기
2. Servlet에서  전달받은 값을 인풋으로 넣어 java 객체를 실행해 output 구하기
3. output 결과를 JSP 파일로 전달해 HTML 문법을 사용해 화면 보여주기





1) Index에서 servlet으로 전달해주는 코드 (Index.html)

```HTML
	  <div align = center><canvas id="canvas" width="100" height="100" style= " border:solid 1px red;"></canvas></div><br/>
<form id = "info" action="ml" method="post">

```
form 태그에서 action="ml", method = "post"라고 되어있다. 바로 이 부분이 servlet과 연동시켜준다. 

servlet 시작 부분에 @WebServlet("/ml") 가 있다. 이걸로 보아선 action = "servlet명" 으로 가이드 해주는 것 같다.



2) servlet의 인풋을 java 객체에 넣어서 output 얻기 --> 코드 짤 때, static으로 해놓아서 객체 생성하지 않고도 메모리에 올라가 있다. 객체 만들지 않고 함수 사용했다.

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		**** index.html 에서 받은 인풋을 이렇게 nn 에 저장한다.
		String nn = request.getParameter("key");


​		
​		****ann.excute 하면, nn의 값을 인풋으로 훈련된 모델이 output을 계산한다.
​		ann.execute(nn); **************************************************************
​		
​		request.setAttribute("result", ann.result);
​		RequestDispatcher rd = request.getRequestDispatcher("/result.jsp");
​	    rd.forward(request, response);
​	
	}


3) output을 request.setAttribute로 저장하고, requestDispatcher을 사용해서 jsp 파일로 포워딩해준다. 

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		String nn = request.getParameter("key");
		ann.execute(nn);
		request.setAttribute("result", ann.result);
		RequestDispatcher rd = request.getRequestDispatcher("/result.jsp");
	    rd.forward(request, response);
	
	}


4) jsp 파일을 최선을 다해 만든다. 난 디자이너가 아니니 이정도는 괜찮지 않을까라는 합리화를 해본다.

 ![ANN after](https://user-images.githubusercontent.com/37058233/90485712-dc7e2f80-e172-11ea-8f15-17d0732dadb9.PNG)

여전히 좀 휑하지만 사실 내맘에는 쏙 든다. 초안 감성을 좋아한다.





## 2. SUDOKU 페이지에 JSP 추가하기

위와 같은 방식으로 하면 된다. 추가하고 싶은건, jsp 에서의 문법.

JAVA 코드일 경우, <%%> 안에 넣어준다. 그리고 out.print(HTML 문법)을 사용하면 HTML 을 화면에 쓸 수 있다.

```
<% cell[][] ary = (cell[][])request.getAttribute("answer"); %>
<div class = design>
<table style="margin: 0 auto;width:400px ; height:400px" border="1"  >
<% 
for (int l= 0; l <81;l++) {
	int q = l/9;
	int w = l%9;	
	if (w==0) {
		out.print("<tr>");
		out.print("\n");
}
	if (q%3==0 && w==0 && q!=0) {
		out.print("<tr>");
		out.print("\n");

	} 
	
	out.print("<td>");
	out.print( ary[q][w].get_value());
	out.print("</td>");

}
%></table></div>
<br>

</body>
```



JSP 전과 후 비교

*전*

![sudoku](https://user-images.githubusercontent.com/37058233/90492955-bd849b00-e17c-11ea-88b1-8415b4bd6af2.PNG)

*후*

![SUDOKU_AFTER](https://user-images.githubusercontent.com/37058233/90493044-d9883c80-e17c-11ea-9adb-0d4bdc7ebc8c.PNG)



어쨌든 바뀐게 나으니까 만족스럽다....ㅎ....