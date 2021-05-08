# Secret Diary 프로젝트

- 아래와 같이 동작하는 아주아주 간단한 다이어리를 php와 mySQL을 이용해 만들어 볼 것이다.
- 전체 코드는 맨 아래에!

![ezgif com-gif-maker](https://user-images.githubusercontent.com/37058233/117530516-6fc1f400-af92-11eb-8cad-b45a03d4d7db.gif)

# Diary.php - 로그인/회원가입 페이지

![image](https://user-images.githubusercontent.com/37058233/116922284-fe88e680-ac09-11eb-9add-b69c4913c6a1.png)

## **1. PHP - login/signup toggle**

![loginSignup](https://user-images.githubusercontent.com/37058233/117551672-14c4e700-affc-11eb-84e0-85db3387e01c.gif)

- 아래 파란 글씨를 누르면 log in을 할지, signup을 할지 바뀐다.

-  파란색 글씨를 누를 때 파란 글씨 컨텐츠를 읽어서 모드를 바꿔주면 된다. 

  - 파란색 log in 글씨를 누르면, 초록색 버튼에 log in 이 나오고 파란색 글씨는 sign up으로 바뀐다. 그리고 현재 내가 할 활동도 log in 이다. 

- hidden input에 현재 상태가 signup 인지 login인지 표시해 버튼이 눌릴때 이 정보도 같이 php로 넘어가게 한다.

  **javascript 코드**

  - choice는 파란 글씨, go는 초록 버튼.
  
  ```javascript
  $("#choice").click(function(){
      var temp=$("#go").text();
      $("#go").text($(this).text());
      $(this).text(temp);
      if($(this).text()=="Log In!"){
          $("#toggleText").text("Interested? Sign up now.");
          $('input[name="what"]').val("sign");
      }else{
          $("#toggleText").text("Log in using your username and password.");
          $('input[name="what"]').val("log");
      }
  })
  ```

  **html 코드**
  
  ```html
  <p><a class="btn btn-success btn-lg" id="go"  role="button">Sign Up!</a></p>
  <p><a class="btn btn-link btn-lg font-weight-bold" id="choice" href="#" role="button">Log In!</a></p>
  <input type="hidden" name="what" value="sign">
  ```

## **2. mySQL,PHP - DB connect**

- cPanel에서 만든 데이터 베이스에 접속한다.

- **php코드**

  ```php
  $link = mysqli_connect("localhost","username" ,"pwd","dbname");
  if(mysqli_connect_error()){
      $success= "There was an error connecting to the database";
      die("There was an error connecting to the database");
  }else{
      //코드 실행
  }
  ```

## **3. PHP mySQL - Sign Up** 

### **Sign up시, DB에 레코드 저장하기**

- password_hash를 통해 비밀번호를 강력하게 암호화해 저장한다.

- 나중에 login 할 때, password_verify()라는 함수를 사용해 매치되는지 확인할 수 있다. 

  **php 코드**

  ```php
  $secure_pwd = password_hash($_POST['pwd'], PASSWORD_DEFAULT);
  $query = sprintf("INSERT INTO `diary` (email,password,content) VALUES ('%s','%s','%s')",mysqli_real_escape_string($link,$_POST['email']), $secure_pwd,"");
  ```

### **sign up 시, DB에 있는 이메일과 중복인지 확인**

- select query로 email 조회한 후 결과가 있으면 중복.

  **php 코드**

  ```php
  $query = sprintf("SELECT email FROM `diary`
      WHERE email='%s'",mysqli_real_escape_string($link,$_POST['email']));
  $result=mysqli_query($link,$query);
  $row=mysqli_num_rows($result);
  if($row>0){
      $success ="<p>This ID is already taken. Please try other</p>";}
  ```

## **4. PHP mySQL - Log In**

- DB에 email과 pwd 조회해 인풋과 일치하면 writing.php로 보낸다.

  - query 는 다음과 같다. 

    ```php
    $query = sprintf("SELECT * FROM `diary`
        WHERE email='%s'", mysqli_real_escape_string($link,$_POST['email']));
    $result=mysqli_query($link,$query);
    ```

  - select문은 mysqli 객체들이 return 된다. 그래서 mysqli_fetch_array함수를 사용해 php에서 사용할 수 있게 바꿔줘야한다.

    ```php
    $result=mysqli_query($link,$query);    
    $ans = mysqli_fetch_array($result);
    ```

  - password_verify()를 이용해 비밀번호가 맞는지 체크한다.

    ```php
     password_verify($_POST['pwd'], $db_pwd) // 두개가 같으면 true 반환.
    ```

  **php 코드**

  ```php
  $query = sprintf("SELECT * FROM `diary`
      WHERE email='%s'", mysqli_real_escape_string($link,$_POST['email']));
  $result=mysqli_query($link,$query);
  $row=mysqli_num_rows($result);
  if ($row>0){
      $ans = mysqli_fetch_array($result);
      $db_pwd = $ans['password'];
      if ( password_verify($_POST['pwd'], $db_pwd)){
          $_SESSION['email'] =$_POST['email'];
          if($_POST['cookie']=="checked"){
              setCookie("id",$_POST['email'],time()+60*60*24);
          }
          header("Location: ../writing.php");
      }else{
          $success= "<p>ID and PWD don't match.</p>";}
  }else{
      $success= "<p>No such ID.</p>";
  }
  ```

## **5. PHP - Session**

- session_start()로 세션을 만들고, 로그인이나 회원가입 후에, 세션 변수에 email을 넣어준다.

  **php 코드**

  ```php
  session_start();
  $_SESSION['email'] =$_POST['email'];
  ```

## **6. PHP - Cookie**

- 로그인하거나, 가입할 때 쿠키에 체크돼있으면 cookie setup을 해준다.

- **html 코드**

  ```html
  <label>
      <input type="checkbox" name="cookie"  value="checked">&nbsp;Stay logged in</label>
  ```

  **php 코드**

  ```php
  if($_POST['cookie']=="checked" ){
  	setCookie("id",$_POST['email'],time()+60*60*24);}
  ```

- 사용자가 로그인 페이지에 접속했는데, 쿠키가 이미 저장돼있다면, cookie에 있는 email값(id)을 session 변수에 저장해주고 바로 일기 쓰는 페이지인 writing.php로 넘어간다.

  **php코드**

  ```php
  session_start();
  if($_COOKIE["id"]){
      $_SESSION['email'] =$_COOKIE["id"];
      header("Location: ../writing.php");
  }
  ```

# writing.php

![image](https://user-images.githubusercontent.com/37058233/117551480-1215c200-affb-11eb-9b56-c9da3660febd.png)

## 1. 글 저장하기

- update쿼리로 content 내용을 저장해준다.

  - textarea name이 content다.

  ```php
  if(array_key_exists('content',$_POST)){
      //추가 눌렀을 때!
      $query = sprintf("UPDATE `diary` SET content= '%s' WHERE email='%s' LIMIT 1",                    mysqli_real_escape_string($link,$_POST['content']),$_SESSION['email']);
      $result=mysqli_query($link,$query);
      $ans = mysqli_fetch_array($result);
      header("Refresh:0");
  }
  ```

- 저장 후, form 이 sent되면서 textarea가 reset된다. textarea에 글을 없애고 싶지 않기 때문에 page refresh를해서 db에 저장된 데이터가 화면에 불러오게한다. (위 코드의 header("Refresh:0")이 그 역할을 해준다.)

## 2. 로그아웃 하기

- 로그아웃 버튼을 누르면 form이 보내진다. 

- 쿠키를 unset하기 위해서 과거의 시간으로 설정한다.

- session_destroy()를 해도 $_SESSION 의 값은 남아 있어서 이것도 초기화 해준다.

  ```php
  if($_GET){
      session_destroy();
      $_SESSION = array();
      setCookie("id","",time()-60*60);
      header("Location: ../Diary.php");
      exit;
  }
  ```

# 전체 코드

## **Diary.php**

```php+HTML
<?php
session_start();
if($_COOKIE["id"]!=""){
    $_SESSION['email'] =$_COOKIE["id"];
    header("Location: ../writing.php");
}else{
    $success ="";
    if(array_key_exists('email',$_POST) AND array_key_exists('pwd',$_POST)){
        $link = mysqli_connect("localhost",username ,pwd,dbname);
        if(mysqli_connect_error()){
            $success= "There was an error connecting to the database";
            die("There was an error connecting to the database");
        }
        $success ="log";

        if($_POST['what']=="log"){
            $query = sprintf("SELECT * FROM `diary`
    WHERE email='%s'", mysqli_real_escape_string($link,$_POST['email']));
            $result=mysqli_query($link,$query);

            $row=mysqli_num_rows($result);
            if ($row>0){
                $ans = mysqli_fetch_array($result);
                $db_pwd = $ans['password'];

                if ( password_verify($_POST['pwd'], $db_pwd)){
                    $_SESSION['email'] =$_POST['email'];
                    if($_POST['cookie']=="checked"){
                        setCookie("id",$_POST['email'],time()+60*60*24);
                    }
                    header("Location: ../session.php");
                }else{
                    $success= "<p>ID and PWD don't match.</p>";}
            }else{
                $success= "<p>No such ID.</p>";
            }
        }
        if($_POST['what']=="sign"){
            $query = sprintf("SELECT email FROM `diary`
    WHERE email='%s'",mysqli_real_escape_string($link,$_POST['email']));
            $result=mysqli_query($link,$query);
            $row=mysqli_num_rows($result);
            if($row>0){
                $success ="<p>This ID is already taken. Please try other</p>";
            }else{
                $secure_pwd = password_hash($_POST['pwd'], PASSWORD_DEFAULT);
                $query = sprintf("INSERT INTO `diary` (email,password,content) VALUES ('%s','%s','%s')",
                                 mysqli_real_escape_string($link,$_POST['email']), $secure_pwd,"");
                if (mysqli_query($link,$query)){
                    $_SESSION['email'] =$_POST['email'];
                    if($_POST['cookie']=="checked" ){
                        setCookie("id",$_POST['email'],time()+60*60*24);
                    }
                    $success= "<p>good</p>";
                    header("Location: ../writing.php");
                }else{
                    $success= "<p>Problem occured, Please try it later</p>";
                }
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Secret Diary</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
        <style>
            html{
                height:100%;
            }
            body{
                background-image: url("https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1190&q=80");
                background-repeat: no-repeat;
                background-size: cover ;
                height:100%;
                padding:10%;
            }
        </style>
        <script>
            $(function(){
                if($("#warning").text()==""){
                    $("#warning").css("display","none");
                }else{
                    $("#warning").css("display","block");
                }
                $("#choice").click(function(){
                    var temp=$("#go").text();
                    $("#go").text($(this).text());
                    $(this).text(temp);
                    if($(this).text()=="Log In!"){
                        $("#toggleText").text("Interested? Sign up now.");
                        $('input[name="what"]').val("sign");
                    }else{
                        $("#toggleText").text("Log in using your username and password.");
                        $('input[name="what"]').val("log");
                    }
                })
                $("#go").click(function(){
                    var ok=true;
                    var warn="";
                    //빠진것만 validation. db 조회는 php로 넘긴다.
                    if($("#email").val()==""){
                        ok=false;
                        warn+="Email is required.<br>";
                    }
                    if($("#pwd").val()==""){
                        ok=false;
                        warn+="Password is required";
                    }
                    $("#warning").html( warn);
                    warn+='<?php echo "$success"; ?>';
                    $("#warning").html( warn);

                    //if all good, then form submit
                    if(ok){
                        $("form").submit();
                    }
                })
            })
        </script>
    </head>
    <body>
        <div class="container col-4 align-self-center" style="text-align:center;color:white; min-width:500px">
            <h1>Secret Diary</h1>
            <p class="lead font-weight-bold">Store your thoughts permanantly and securely.</p>
            <div class="alert alert-danger"id="warning" role="alert"><?php echo $success; ?></div>
            <p id="toggleText">Interested? Sign up now.</p>
            <form method="POST">
                <p>
                    <input type="email" id="email" name="email" class="form-control" placeholder="Your Email">
                    <input type="password" id="pwd" name="pwd" class="form-control" placeholder="Password" >
                </p>
                <p class="lead">
                    <label>
                        <input type="checkbox" name="cookie"  value="checked">&nbsp;Stay logged in</label>
                <p><a class="btn btn-success btn-lg" id="go"  role="button">Sign Up!</a></p>
                <p><a class="btn btn-link btn-lg font-weight-bold" id="choice" href="#" role="button">Log In!</a></p>
                <input type="hidden" name="what" value="sign">
                </p>
            </form>
        </div>

    </body>
</html>

```

## **writing.php**

```php+HTML
<?php
session_start();
if($_SESSION['email']){
    if($_GET){
        session_destroy();
        $_SESSION = array();
        setCookie("id","",time()-60*60);
        header("Location: ../Diary.php");
        exit;
    }
}else{
    echo "<script>alert('로그인 먼저 하세요!')</script>";
}
$link = mysqli_connect("localhost","username" ,"pwd","dbname");
if(mysqli_connect_error()){
    $success= "There was an error connecting to the database";
    die("There was an error connecting to the database"); }else{
    $query = sprintf("SELECT content FROM `diary`
    WHERE email='%s'", mysqli_real_escape_string($link,$_SESSION['email']));
    $result=mysqli_query($link,$query);
    $row=mysqli_num_rows($result);
    if ($row>0){
        $ans = mysqli_fetch_array($result);
    }else{
        echo "<script>alert('SQL not working')</script>";
    }

    if(array_key_exists('content',$_POST)){
        //추가 눌렀을 때!
        $query = sprintf("UPDATE `diary` SET content= '%s' WHERE email='%s' LIMIT 1",                    mysqli_real_escape_string($link,$_POST['content']),$_SESSION['email']);
        $result=mysqli_query($link,$query);
        $ans = mysqli_fetch_array($result);
        header("Refresh:0");
    }
}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>diary page</title>

        <style>
            html{
                height:100%;
            }
            body{
                background-image: url("https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1190&q=80");
                background-repeat: no-repeat;
                background-size: cover ;
                height:100%;
                padding:5%;
                text-align: center;
            }
            h1{
                color:white;
            }
            #saveMe{
                width : 30%;
                height : 30px;
            }

            textarea{
                opacity:0.5 ;
            }

            #logout{
                background : pink;
                width : 100px;
                height : 30px;
                position: absolute;
                top : 15px;
                right : 15px;
            }
        </style>
    </head>
    <body>
        <form id = 'end'><button type="submit" id="logout" name="logout">LOG OUT</button></form>
        <div><h1>Welcome <?php echo $_SESSION['email']; ?> !</h1></div>
        <form id="myText" method="POST">
            <p><textarea id="myTextarea" name="content" rows="20" cols="50"> <?php echo $ans['content']; ?></textarea></p>
            <input type="button" name="save" value="save" id="saveMe">
        </form>

        <script type="text/javascript">
            document.getElementById("saveMe").onclick = function() {
                document.getElementById("myText").submit();
            };
        </script>
    </body>
</html>

```



