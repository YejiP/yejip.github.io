

# Form and Input

#  form 관련 태그들 

- 사용자로부터 데이터를 입력받기 위한 모든 요소들. (버튼, id, 7비밀번호, 전화번호) 

- 폼과 관련된 대부분의 작업은 데이터베이스를 기반으로 한 정보를 저장, 검색, 수정하는 일이다. 입력된 정보는 ASP, PHP, JSP 같은 서버 프로그래밍을 이용한다.

  ```html
  <form action="register.php"> <!--[속성 = "속성값"]-->
      <input type ="text" title ="검색">  <!--폼 요소 -->
  </form>
  ```

- form 태그 속성은 method, name, action, target 이 있다. 

  - **method :** 사용자가 입력한 내용을 어떻게 넘겨줄지 지정. GET과 POST 방식
  - **name :** 폼의 이름을 지정한다.
  - **action :** form 태그 안의 내용들을 처리해 줄 서버사으이 프로그램을 지정한다.
  - **target :** action 속성에서 지정한 스크립트 파일을 현재창이 아닌 다른 위치에 열도록 지정.

- autocomplete 속성은 기본값이 on 이다. 끄기 위해서 다음과 같이 하면 된다.

  ```html
  <form autocomplete = "off"></form>
  ```

- label 태그는 폼요소에 레이블을 붙일 때 사용한다. 두가지 방법이 있다.

  - label 태그 안에 input 태그를 넣는 법.

    ```html
    <label>아이디<input ..></label>
    ```

  - label for 과 input id를 사용해 하나로 묶는 방법

    ```html
    <label for ="user-id">아이디</label>
    
    <input type = "text" id="user-id">
    ```

- fieldset 과 legend는 폼 요소를 그룹으로 만들 때 사용된다. 

  ```html
  <fieldset>
      <legend>name</legend>
      <form>
          <input >
      </form>
  </fieldset>
  ```



# input 태그

- 아래와 같은 형식으로 사용된다.

```html
<input type = "타입명" name = "이름" value = "서버로 넘길 값">
```

- 굉장히 여러가지 type 이 있다. hidden, text, search, tel, url, email, password, range, radio , checkbox... 등등

  - ## **hidden**

  ```
  <input type="hidden" name ="이름"  value = "서버로 넘길 값">
  ```

  - ## **text type **

    text, password, search, url , email, telephone등이 있다. 

  ![text](https://user-images.githubusercontent.com/37058233/97587009-46059e80-1a3e-11eb-94a0-7e41dc387d1c.png)

  ```html
  <input type="hidden" name ="이름"  value = "서버로 넘길 값">
  <label>텍스트 타입 : <input type="text" name = "user-id" size = "10" value = "type" maxlength="10" ></label><br>
  <label>패스워드 타입 : <input type="password" name = "user-pw" maxlength="10"></label><br>
  <label>search 타입 : <input type="search"></label><br>
  <label>url 타입 : <input type="url" ></label><br>
  <label>email 타입 : <input type="email" ></label><br>
  <label>tel 타입 : <input type="telephone" ></label>
  ```

  - ## **number** 

  ![number](https://user-images.githubusercontent.com/37058233/97587438-bb716f00-1a3e-11eb-9ad0-5fc176fbddf3.PNG)

  ```html
  <label>number 타입 : <input type="number" min ="1" max = "5" value="1" ></label><br>
  <label>range 타입  하 중 상: <input type="range" min ="1" max = "3" value="1" ></label><br>
  ```

  - ## **radio checkbox** 

    radio는 하나만 선택할 수 있으므로, 선택지 input의 name이 다 같은 이름이다. 

  ![radio](https://user-images.githubusercontent.com/37058233/97582934-b1993d00-1a39-11eb-98df-fa30f9cab522.PNG)

  ```html
  Radio
  <label><input type="checkbox" name = "menu1" value = "타코">타코</label>
  <label><input type="checkbox" name = "menu2" value = "샐러드">샐러드</label>
  <label><input type="checkbox" name = "menu3" value = "샐러드">탄산수</label>
  
  <!-- radio는 하나만 고를 수 있어서 같은 name을 준다. -->
  Checkbox
  <label><input type="radio" name = "menu1" value = "타코">타코</label>
  <label><input type="radio" name = "menu1" value = "샐러드">샐러드</label>
  <label><input type="radio" name = "menu1" value = "샐러드">탄산수</label>
  <br>
  
  ```

  - ## **날짜와 시간** 

  ![date](https://user-images.githubusercontent.com/37058233/97585810-e5c22d00-1a3c-11eb-81c7-e97d5ba5cbf6.PNG)

  ```html
  date 타입: <input type="date">
  <br><br>
  month 타입: <input type="month">
  <br><br>
  year 타입: <input type="year">
  
  <br><br>time 타입: <input type="time" value="09:00">
  <br><br>
  date time 타입: <input type="datetime" value="2016-09-09T09:00">
  <br><br>
  date time local 타입: <input type="datetime-local" value="2016-09-09T09:00">
  ```

  - ## **버튼** 

    submit , reset, image, button  은 클릭하면 js 로 넘어간다.

  ![button](https://user-images.githubusercontent.com/37058233/97586160-4a7d8780-1a3d-11eb-8bcc-d2fba6eeedd9.PNG)

  - ## **기타** : 

    색, 첨부파일

​	

![기타](https://user-images.githubusercontent.com/37058233/97595856-756cd900-1a47-11eb-906c-14faae7110b8.PNG)

```html
색을 정해주세요: <input type = "color" value="#00ff00">
<br>
첨부파일: <input type="file">
```

# input 실습

![form](https://user-images.githubusercontent.com/37058233/97106564-daea5e00-1705-11eb-8916-4007cbae3dfc.PNG)



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    input[type="image"]{
      height: 50px
    }
    </style>
</head>
<body>
    <div><!-- 보이면안되거나, 양이 많거나, 파일첨부의 경우 -->
        <form action="" method="post" enctype="multipart/form-data"> <!-- 인풋타입 파일이 있을때 꼭 get 방식이랑 멀티타입파트 해준다. -->
          <fieldset>


          <legend>회원 가입을 위한 기본 정보</legend>

            <label for="username">아이디 : <input type="text" name="username" id="username" placeholder="사용자 이름"></label><br>
            <label for="userpwd">비밀번호 : <input type="password" name="userpwd" id="userpwd" ></label><br>
            <label for="gender">
                <input type="radio" name="gender" value="여성" checked>여
                <input type="radio" name="gender" value="남성">남
            </label><br>
            <label for="hobby">
                <input type="checkbox" name="hobby" value="패러글라이딩">패러글라이딩
                <input type="checkbox" name="hobby" value="스킨스쿠버">스킨스쿠버
                <input type="checkbox" name="hobby" value="라이딩">라이딩
                <input type="checkbox" name="hobby" value="책읽기">책읽기
                <input type="checkbox" name="hobby" value="잠자기">잠자기
            </label><br>
            <label for="phone">
                <select name="phone1" id="">
                    <option>02</option>
                    <option>031</option>
                    <option>041</option>
                    <option>051</option>
                </select> -
                <input type="number" name="phone2" placeholder="-를 제외한 숫자8자리 ">
            </label><br>
            <label for = "introduce">
            <textarea name = "introduce" id ="" cols = "30" rows ="10"></textarea><br>
          </lable>
            <label for = "picture">사진첨부 :
              <input type ="file" name ="pic"><br></label>
          <label for="done">
            <input type="submit" value="회원가입"> <!-- 데이터를 서버로 전송함 -->
            <input type="reset"  value="취소">
            <input type="image" src = "./button.png" alt = click>
            <!--인풋 타입 이미지는 실제로 데이터를 전송한다. submit 과 비슷한 역할 함-->
          </label>

</fieldset>

<fieldset>
  <legend>연습</legend>
  <input type="button" value = "전송"> 그냥 버튼이고, js와 연동할 때 편하다.
</fieldset>
        </form>

    </div>
</body>
</html>

```

name 이란 속성은 하나로 묶을 때 사용한다.

post 쓸 때 : 보이면안되거나, 양이 많거나, 파일첨부할 때

