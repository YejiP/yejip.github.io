# jQuery 효과들

[https://api.jquery.com/](https://api.jquery.com/) 이 페이지에 잘 나와있다. 검색한 후 무슨 함수 써야하는지 감이 오면 jquery api에서 찾아서 잘 사용하면 된다.

## **Ex1) fadeOut**

- 클릭하면 fadeout되면서 사라지게 하기.

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/37058233/115617695-913e9280-a2a6-11eb-9a7f-4982410db7e7.gif) 

- [https://api.jquery.com/fadeOut/](https://api.jquery.com/fadeOut/) 이 문서에 자세하게 나와있다. 

  - .fadeOut()을 사용하면 된다. 

  - .fadeOut("slow") 이렇게 fade out하는 속도까지 바꿀 수 있다.

  - .fadeOut("slow",function(){ alert("FadeOut has finished")}) 이렇게 fadeout이 끝나면 다른 코드를 실행할 수도 있다. (callback 함수로) 

    

- 전체 코드

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>jQuery Hands-on</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <style>
    .shape{
      width:100px;
      height:100px;
      background-color: blue;
      margin: 10px;
      display : inline-block;
    }
    </style>
  </head>
  <body>
    <div class = "shape"></div>
    <div class = "shape"></div>
    <div class = "shape"></div>

    <script type="text/javascript">
    $(".shape").click(function(){
      $(this).fadeOut();
    })
    </script>
  </body>
</html>
```

## **Ex2) fadeOut**

- 토글버튼으로 fadein fadeout 시키기

  ![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/37058233/115619743-217dd700-a2a9-11eb-8d04-7802f4499ce5.gif)

```html
<head>
    <meta charset="utf-8">
    <title>jQuery Hands-on</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <style>
        .shape{
            width:100px;
            height:100px;
            background-color: blue;
            margin: 10px;
        }
        .circle{
            border-radius: 50%;
            background-color: green;
        }
    </style>
</head>
<body>
    <button>Toggle Button</button>
    <div class = "shape"></div>


    <script type="text/javascript">
        $("button").click(function(){
            if($(".shape").css("display")=="none"){
                $(".shape").fadeIn();
            }else{
                $(".shape").fadeOut();

            }
        })
    </script>
</body>
```

- callback 함수 이용하는 경우

  ```javascript
  var textShowing = true;
  
  $("#toggle").click(function() {
      if (textShowing) {
          $("#text").fadeOut(function() {
              textShowing = false;
          });
      } else {
          $("#text").fadeIn(function() {
              textShowing = true;
          });
      }
  });
  ```

## **Ex3) Animate 함수 이용하기**

- ​	animate 로 동그라미의 특성값을 바꿔 움직이는 것 처럼 보이게 한다.
  - 동그라미의 높이, 너비, 좌측 마진 값을 바꿨다. + 색

![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/37058233/115636241-577b8500-a2c2-11eb-986f-2e76a38185fc.gif)

-  [https://api.jquery.com/animate/](https://api.jquery.com/animate/)

```
animate({attr1: value1,
		attr2 : value2,
		attr3 : value3},
		2000, //milliseconds
		function(){
		}//callback function. animate가 끝나면 실행할 함수!
		)
```



```javascript
$(".circle").click(function(){
      $(this).animate({width:"300px",
      height:"300px",
      marginLeft :"200px",
    },2000, function(){
      $(this).css("background","blue");
    })

  })
```



- 전체 코드

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>jQuery Hands-on</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <style>
    .shape{
      width:100px;
      height:100px;
      background-color: blue;
      margin: 10px;
    }
    .circle{
      border-radius: 50%;
      background-color: green;
    }
    </style>
  </head>
  <body>
    <div class = "shape circle"></div>

    <script type="text/javascript">
    $(".circle").click(function(){
      $(this).animate({width:"300px",
      height:"300px",
      marginLeft :"200px",
    },2000, function(){
      $(this).css("background","blue");
    })

  })

    </script>
  </body>
</html>

```

