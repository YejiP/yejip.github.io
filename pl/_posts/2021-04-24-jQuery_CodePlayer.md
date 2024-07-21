---
layout: post
tags: js
---
# jQuery CodePlayer

**◇ jQuery 실습 포스팅 시리즈 ◇**

1. [이미지 한칸씩 앞당기기 실습](https://yejip.com/pl/2020-12-12-jquery실습1/)
2. [마우스 on/off 실습](https://yejip.com/pl/2020-12-13-jquery실습3/)
3. [야매 트위터 - 글자수 세기 실습](https://yejip.com/pl/2020-12-13-jquery실습4/)
4. *jQuery CodePlayer 실습 - 현재 글*

- html , css, javascript 코드를 입력하면 output을 보여주는 페이지를 만들 것이다.

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/37058233/116137640-a3467980-a688-11eb-986a-38095c3935a6.gif)

- 아래에서 체험!

<iframe src="../html/210424jQueryCodePlayer.html"  width = "100%" height ="1000px"></iframe>

## 토글 버튼으로 화면에 추가/제거 하기

- button 안 텍스트와 display의 id를 맞춰서 버튼이 클릭되면 그 id와 연결될 수 있게 함.
- display들을 table안에 넣어 table cell로 만들었다.

```html
<nav>
<h1 style="display:inline ; padding :10px;">CodePlayer</h1>
<div>
  <ul>
    <li><button>HTML</button></li>
    <li><button>CSS</button></li>
    <li><button>JavaScript</button></li>
    <li><button>Output</button></li>
  </ul>
</div>
</nav>

<div class = "container"><table>
  <tr>
  <td class = "display" id="HTML">HTML<textarea></textarea></td>
  <td class = "display" id="CSS">CSS<textarea></textarea></td>
  <td class = "display" id="JavaScript">JavaScript<textarea></textarea></td>
<td class = "display" id ="Output">Output<iframe id ="out"></iframe></td></tr>
</table>
```

- 토글 버튼으로 조건에 따라 **display : none, table-cell** 을 걸어준다.

```javascript
$("button").click(function(){
    if($("#"+$(this).html()).css("display")=="none"){
        $("#"+$(this).html()).css("display","table-cell");
    }else{
        $("#"+$(this).html()).css("display","none");
    }
})
```

- **table-layout : fixed**를 해줘야지 셀 내용의 길이와 상관없이 크기가 일정하다.

```html
<style>
    table{
        width: 100%;
        height: 800px;
        table-layout: fixed;

    }
    td textarea {
        height :100%;
        width:100%
    }
    td{
        padding:20px;
    }

    .display{
        background-color: pink;

    }
</style>
```

## 코드들이 output에 보이게 하기

- iframe을 이용한다.

```html
<td class = "display" id ="Output">Output<iframe id ="out"></iframe></td></tr>
```

```javascript
$("textarea").on('keyup',function(){
    var content = $(this).val();
    if($(this).parent().attr("id")=="HTML"){
        $("iframe").contents().find("body").html(content)
    }else if($(this).parent().attr("id")=="CSS"){
        $("iframe").contents().find("head").append("<style>"+content+"</style>")

    }else if($(this).parent().attr("id")=="JavaScript"){
        $("iframe").contents().find("head").append("<script>"+content);
    }
})
```

## **전체코드**

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Code Player</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

        <script>
            $(function(){
                $("#CSS").css("display","none");
                $("#JavaScript").css("display","none");


                $("button").click(function(){
                    if($("#"+$(this).html()).css("display")=="none"){
                        $("#"+$(this).html()).css("display","table-cell");
                    }else{
                        $("#"+$(this).html()).css("display","none");
                    }
                })

                $("textarea").on('keyup',function(){
                    var content = $(this).val();
                    if($(this).parent().attr("id")=="HTML"){
                        $("iframe").contents().find("body").html(content)
                    }else if($(this).parent().attr("id")=="CSS"){
                        $("iframe").contents().find("head").append("<style>"+content+"</style>")

                    }else if($(this).parent().attr("id")=="JavaScript"){
                        $("iframe").contents().find("head").append("<script>"+content);
                    }
                })
            })
        </script>

        <style>
            .container{
                width: 100%;
            }
            table{
                width: 100%;
                height: 800px;
                table-layout: fixed;

            }
            td textarea {
                height :100%;
                width:100%
            }
            td{
                padding:20px;
            }

            .display{
                background-color: pink;

            }
            nav > div{
                display : inline-block;
                margin: 0 auto;
            }
            ul > li{
                display : inline-block;
                margin: 0
            }

            iframe{
                height: 100%;
                width:100%;
                background: white;
            }
            nav{
                background-color: grey;
            }
        </style>

    </head>
    <body>
        <nav>
            <h1 style="display:inline ; padding :10px;">CodePlayer</h1>
            <div>
                <ul>
                    <li><button>HTML</button></li>
                    <li><button>CSS</button></li>
                    <li><button>JavaScript</button></li>
                    <li><button>Output</button></li>
                </ul>
            </div>
        </nav>

        <div class = "container"><table>
            <tr>
                <td class = "display" id="HTML">HTML<textarea></textarea></td>
                <td class = "display" id="CSS">CSS<textarea></textarea></td>
                <td class = "display" id="JavaScript">JavaScript<textarea></textarea></td>
                <td class = "display" id ="Output">Output<iframe id ="out"></iframe></td></tr>
            </table>
        </div>


    </body>
</html>
```
