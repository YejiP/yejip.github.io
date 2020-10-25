

## Form

- 사용자로부터 데이터를 입력받기 위한 모든 요소들. (버튼, id, 비밀번호, 전화번호) 

- input, select, form 태그

- input tag는 type 옵션이 무엇이냐에 따라 다양한 input 이 존재

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