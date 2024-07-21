---
layout: post
category: web
tags: php
---
# PHP로 Weather Scraper 만들기

- [https://www.weather-forecast.com/](https://www.weather-forecast.com/) 에서 정보를 가져오는 프로그램 만들기.

![weather](https://user-images.githubusercontent.com/37058233/116795435-dc685a80-aa89-11eb-8097-9b6879ede7bb.gif)

- 작동은 하는데, error logs에 에러가 엄청 쌓여서 추천하지 않음. 계속 공부하면서 뭐가 에러를 주는 건지 포스트 할 예정.
- 위 동영상은 2배속 한 것. 실제로는 엄청 느리다.

## **기초 - html에서 php 변수 사용하기**

```html
<div class="alert alert-success" id="info" role="alert"><?php echo $resultData; ?></div>
```

- 이런 식으로 html 문서 내에 **\<?php echo 변수명; ?>** 를 해서 사용한다.

## **1. bootstrap 사용해서 화면 구성**

- 필요한 라이브러리 head에서 불러온다.

- 여기선 bootstrap 4.0.0-alpha 버전을 사용했다.

  ```html
  <!-- Bootstrap CSS -->
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
     <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
  ```

- 나는 점보 트론을 이용해서 화면 구성을 함. [https://v4-alpha.getbootstrap.com/components/jumbotron/](https://v4-alpha.getbootstrap.com/components/jumbotron/)

  ```html
  <div class="jumbotron">
    <h1 class="display-3">Hello, world!</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <p class="lead">
      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </p>
  </div>
  ```

![image](https://user-images.githubusercontent.com/37058233/116795764-2e11e480-aa8c-11eb-8978-34d932fcee3d.png)

## **2. html에서 php로 변수값 전달하기**

- **html**

  - form과 input을 사용해서 php로 변수값을 전달할 수 있다. name 중요!

  ```html
  <form id="cityForm">
      <p><input type="text" name="city"></p>
      <input type="submit" class="btn btn-primary btn-lg">
  </form>
  ```

- **php**

  - input의 name에 저장된 값이 php에서 $_GET[name ] 에 저장된다.

  ```php
  <?php
  if($_GET["city"]){
      //할 일
  } ?>
  ```

## **3. 받아들인 input값으로 url만들기**

- [www.weather-forecast.com](www.weather-forecast.com) 사이트 특징이 url에 도시이름이 개떡같이 들어가있어도 찰떡같이 알아서 바꿔준다.

  - https://www.weather-forecast.com/locations/**losangeles**/forecasts/latest

    https://www.weather-forecast.com/locations**/Los-Angeles**/forecasts/latest

  - 그래서 사용자가 우리 페이지 검색어로 losangeles를 쳐도, 링크에서 Los-Angeles로 저절로 바뀌어서 정보가 있는 페이지에 접근할 수 있다!

- php 코드,

  - 띄어쓰기는 url에서 -로 표시 되기때문에, php의 str_replace함수를 사용해서 바꿔준다.

  ```php
  $city = $_GET["city"];
  $citymodi = str_replace(" ", "-", $city);
  $cityurl ="https://www.weather-forecast.com/locations/".$citymodi."/forecasts/latest";
  ```

## **4. cURL 로 다른 페이지 정보 가져오기**

- file_get_contents() , cURL 둘 다 다른 페이지  정보를 가져올 수 있다.

- file_get_contents()는 php.ini 파일에 다음과 같은 코드를 넣어줘야한다. 난 cURL로 했다. 다음에 file_get_contents로 하고 비교해보면 좋을 듯 싶다.

- ```php
allow_url_fopen = 1 //0 for Off and 1 for On Flag
  allow_url_include = 1 //0 for Off and 1 for On Flag
  ```

- curl사용해서 정보 가져오기

  ```php
  <?php
      $curl = curl_init($cityurl);
  curl_setopt($curl, CURLOPT_FAILONERROR, true);
  curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  $result = curl_exec($curl);
  ?>
  ```

## **5. domDocument로 만들어서 class이름으로 요소에 접근하기**

- $result = curl_exec($curl); 를 loadHTML 함수에 넣어서 String을 domDocument로 만든다.

- [https://www.php.net/manual/en/domdocument.loadhtml.php](https://www.php.net/manual/en/domdocument.loadhtml.php)

  ![image](https://user-images.githubusercontent.com/37058233/116796327-6d423480-aa90-11eb-92c4-1ef90a6e2c1b.png)

- 다음 정보에 접근하고 싶다. f12눌러서 보면, class 이름이 'b-forecast__table-description-content'이다.!

  ![image](https://user-images.githubusercontent.com/37058233/116796393-d5911600-aa90-11eb-867a-008b116be0c4.png)

-  **php코드,** $resultData에 class 이름에 매치되는 컨텐츠 저장.

```php
if(!empty($curl)) {
    $dom = new DOMDocument();
    $res=$dom->loadHTML($result);
    $xpath = new DomXPath($dom);
    $class = 'b-forecast__table-description-content';
    $divs = $xpath->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $class')]");
    $resultData='';
    foreach($divs as $div) {
        $resultData .= $div->nodeValue;
    }
}else{
    echo "no data";}
}
```

- **html코드,** resultData에 저장되어있는 변수 html에서 읽어들이기

  ```html
  <div class="alert alert-success" id="info" role="alert"><?php echo $resultData; ?></div>
  ```

## **전체 코드**

```php+HTML
<?php
if($_GET["city"]){
  $city = $_GET["city"];
  $citymodi = str_replace(" ", "-", $city);
  $cityurl ="https://www.weather-forecast.com/locations/".$citymodi."/forecasts/latest";
  $curl = curl_init($cityurl);
 curl_setopt($curl, CURLOPT_FAILONERROR, true);
 curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
 curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
 curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
 curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
 $result = curl_exec($curl);

if(!empty($curl)) {
$dom = new DOMDocument();
$res=$dom->loadHTML($result);
$xpath = new DomXPath($dom);
$class = 'b-forecast__table-description-content';
$divs = $xpath->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $class')]");
$resultData='';
foreach($divs as $div) {
    $resultData .= $div->nodeValue;
}
}else{
echo "no data";
}
}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
 <head>
   <meta charset="utf-8">
   <title></title>
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

   <!-- Bootstrap CSS -->
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
   <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
 </head>

 <body  background="https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80">
   <div class="container ">
     <div class="jumbotron justify-content-center" style ="text-align:center;background-color: rgba(255, 255, 255, .4);">
       <form id="cityForm">
       <h1 class="display-3">What's the Weather?</h1>
       <p class="lead">Enter the name of a city</p>
       <p><input type="text" class="form-control"  name="city" style="width:50%; margin :0 auto"></p>
       <p class="lead">
         <input type="submit" class="btn btn-primary btn-lg">
       </p>
       </form>
<h1 id="title"><?php echo $city; ?></h1>
       <div class="alert alert-success" id="info" role="alert"><?php echo $resultData; ?></div>
  </div></div>
   <script type="text/javascript">
     if($("#info").text()==""){
  $("#info").css("display","none");
  $("#title").css("display","none");
}else{
$("#info").css("display","block");
  $("#title").css("display","block");
}
   </script>
</body>
</html>
```
