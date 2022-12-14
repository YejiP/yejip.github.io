---
layout: post
category: web
tags: spring
---
# To Do List - main 페이지

- 맨 처음에 뜨는 화면, DB에서 정보 가져와서 화면에 뿌려주기

  1. XMLHttpRequest객체의 open 메소드를 사용,

  <img src="https://user-images.githubusercontent.com/37058233/132779290-b9a0a8b0-0ebb-4f2f-8819-be20d8fd9993.png" width="400">

  - 첫번째 파라미터에 GET, POST, PUT,DELETE를 넣을 수 있다.

  - 두번째 파라미터에는 URL 을넣는다.

    => 그러면, @webServlet("/url") 링크가 있는 서블릿 파일의 doGet, doPost, doPut, doDelete 메소드가 불러진다!

![image](https://user-images.githubusercontent.com/37058233/132779656-2ed626d6-9a3e-40bd-abaf-8ae65d50deab.png)

2. XMLHttpRequest에 addEventListener 로 load가 되면, 함수가 실행되게.

   - this.responseText에 open 메소드로 실행된 자바파일의 결과가 전달된다.

   - taskById.java파일에서, json String으로 전달된 결과가 this.responseText로 받아진다.

     ![image](https://user-images.githubusercontent.com/37058233/132780321-9c162a5d-a684-4a2a-a943-14b61772430d.png)

   - 이 결과를 JSON.parse를 사용해 parse하고, for문을 돌며 값들을 꺼내준다.

<img src="https://user-images.githubusercontent.com/37058233/132779781-217044dd-17e1-4afa-b356-e62abb811c6e.png" width = 400px>

![image](https://user-images.githubusercontent.com/37058233/132780107-09ffbe92-44f8-48b9-a7bc-f15dc536bf57.png)

https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

## 전체 코드

**Servlet 전체 코드**

```java
/**
 * Servlet implementation class taskById
 */
@WebServlet("/task/*")
public class taskById extends HttpServlet {
    private static final long serialVersionUID = 1L;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public taskById(){
        super();
        // TODO Auto-generated constructor stub
    }
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // TODO Auto-generated method stub
        TaskDao dao= new TaskDao();

        String target = req.getPathInfo();

        String id= target.split("/")[1];
        String status = target.split("/")[2];

        dao.taskUpdate(id,status);
        ArrayList<Task> all = dao.taskShow();

        PrintWriter out = resp.getWriter();
        out.println("[");
        for(int i=0;i<all.size() ;i++) {
            ObjectMapper objectMapper =new ObjectMapper();
            String json = objectMapper.writeValueAsString(all.get(i));
            out.println(json);
            if(i!=all.size()-1) {
                out.println(",");
            }
        }
        out.println("]");
        out.close();
    }
}
```

**DAO taskShowType 전체 코드**

```java
public ArrayList<Task> taskShowType(String t){
    ArrayList<Task> tasks = new ArrayList<>();
    Connection conn=null;
    PreparedStatement ps=null;
    ResultSet rs =null;
    try {
        Class.forName("com.mysql.jdbc.Driver");
        conn=DriverManager.getConnection(dburl,dbUser,dbpasswd);
        String sql="SELECT * FROM`TODO` WHERE TYPE = ?";
        ps =conn.prepareStatement(sql);
        ps.setString(1, t);
        rs= ps.executeQuery();
        while(rs.next()) {
            int id = rs.getInt(1);
            String title = rs.getString(2);
            String name = rs.getString(3);
            int sequence = rs.getInt(4);
            String type = rs.getString(5);
            String regdate = rs.getString(6);
            Task task = new Task(id,title, name,sequence,type,regdate);
            tasks.add(task);
        }
    }catch(Exception e) {
        e.printStackTrace();
    }finally{
        if(conn!=null) {
            try {
                conn.close();
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        if(ps!=null) {
            try {
                ps.close();
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        if(rs!=null) {
            try {
                rs.close();
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }
    return tasks;
}
```

**JSP 파일 전체 코드**

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="ISO-8859-1">
        <title>Your Goals</title>
        <style>
            body{
                background-color : #B8B9B9;}
            .name{
                background-color : #104493;
                color:white;
                padding  : 10px;
                margin : 5px;
            }
            .list{
                margin : 2px;
                padding  : 10px;
                background-color :#B2D1D8;
                width : parent;
            }
            .col{
                float: left;
                width: 30%;
                background-color : white;
                margin:1%;}
            .title{
                font-size:1.5em;
                font-style:"bold";
            }
            #addNew{
                width :16%;
                height :50px;
                background-color : #5D6399;
                color : white;
                font-size : 1.2em;
                margin-left: 5%;
            }
            #archive{
                width :16%;
                height :50px;
                background-color : #B6B6F0;
                color : white;
                font-size : 1.2em;
            }
            #menu{
                margin-right : 5%;
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div id = "menu">
            <button id = "addNew"  onclick="window.location='write.jsp'";>Add New Todo</button>
            <button id = "archive"  onclick="window.location='archive.jsp'";>Go to Archive</button>
        </div>
        <div class = "container">
            <div class="col">
                <div class="name">TODO</div>
                <p id="todo">
                </p>
            </div>
            <div class="col">
                <div class="name">DOING</div>
                <p id="doing" >
                </p>
            </div>
            <div class="col">
                <div class="name" >DONE</div>
                <p id="done">
                </p>
            </div>
        </div>
        <script>
            window.addEventListener('load', init);
            function init(){
                show();
            }
            function show(a,b){
                var todos = "";
                var doing = ""
                var done = ""
                var oReq = new XMLHttpRequest();
                oReq.addEventListener("load",function(){
                    var myArr = JSON.parse(this.responseText);
                    for(let i =0;i<myArr.length;i++){
                        if(myArr[i]["type"]=="todo"){
                            todos +="<div class= 'list'>";
                            todos +="<div class='title'>"+myArr[i]["title"]+"</div>";
                            todos +="Name: "+myArr[i]["name"];
                            todos +=" Priority: "+myArr[i]["sequence"];
                            todos +=" Date: "+ myArr[i]["regdate"].slice(0, 10);
                            todos +="<button class='todo' onclick='buttonClick(this)' data-class='todo' data-id = "+myArr[i]["bigint"]+"><img width='10px' src='https://image.flaticon.com/icons/png/512/57/57116.png'></button></div>";
                            todos +="<br>";

                        }else if(myArr[i]["type"]=="doing"){
                            doing+="<div class= 'list'>";
                            doing +="<div class='title'>"+myArr[i]["title"]+"</div>";
                            doing +="Name: "+myArr[i]["name"];
                            doing +=" Priority: "+myArr[i]["sequence"];
                            doing +=" Date: " + myArr[i]["regdate"].slice(0, 10);
                            doing +="<button  class='doing' onclick='buttonClick(this)' data-class='doing' data-id = "+myArr[i]["bigint"]+"><img width='10px' src='https://image.flaticon.com/icons/png/512/57/57116.png'></button></div>";
                            doing +="<br>";
                        }else if(myArr[i]["type"]=="done"){
                            done+="<div class= 'list'>";
                            done +="<div class='title'>"+myArr[i]["title"]+"</div>";
                            done +="Name: "+myArr[i]["name"];
                            done +=" Priority: "+myArr[i]["sequence"];
                            done +=" Date: "+ myArr[i]["regdate"].slice(0, 10);
                            done +="<button  class='done' onclick='buttonClick(this)'  data-class='done' data-id = "+myArr[i]["bigint"]+"><img width='10px' src='https://toppng.com/uploads/preview/resolution-980980-up-right-arrow-icon-11553443930wzqvsrgc6t.png'></button></div>";
                            done +="<br>";
                        }
                    }
                    document.getElementById("todo").innerHTML = todos;
                    document.getElementById("doing").innerHTML = doing;
                    document.getElementById("done").innerHTML = done;
                });

                if(a!=undefined){
                    //todo doing
                    oReq.open("PUT", "task"+"/"+a +"/"+b, true);
                    oReq.setRequestHeader('Content-type','application/json; charset=utf-8');
                    oReq.send();
                }
                else{
                    oReq.open("POST","task");
                    oReq.send();
                }

            }
            function buttonClick(e){
                var clicked = e.getAttribute("data-class");
                var id= e.getAttribute("data-id");
                show(id,clicked);
            }



        </script>
    </body>
</html>
```
