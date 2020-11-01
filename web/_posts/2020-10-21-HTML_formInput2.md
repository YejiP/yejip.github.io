# HTML FORM2

#  input 태그 속성

![ex](https://user-images.githubusercontent.com/37058233/97784296-de3b8900-1be0-11eb-8b60-796730f84cad.PNG)

1. **placeholder :** 힌트를 표시한다.
2. **readonly :** readonly = "readonly", readonly. 이렇게 넣으면 read는 되지만 write안되는 input 이 만들어진다.
3. **min, max, step :** number input 타입에서 사용. min max는 최댓값과 최솟값을 지정한다. spin 박스를 누르면 step 만큼 커진다.
4. **size, minlength , maxlength :** text input 타입에서 사용. size는 input 박스 길이, min maxlength 는 최소 최대 글씨 갯수
5. **autofocus :** 원하는 폼 요소에 마우스 커서 표시할 수 있다.
6. **required :** required ="required" , required. 이렇게 넣으면 필수로 채워야하는 폼이 된다.



# 여러 데이터 나열하기 

## select, optgroup, option :

- 드롭다운 목록 만들기

![select](https://user-images.githubusercontent.com/37058233/97775440-fa6d0500-1ba3-11eb-9089-2772c908b979.PNG)



<select id = "class">
  <optgroup label = "에피타이저">
    <option value = soup >스프</option>
    <option value = salad >샐러드</option>
    <option value = bread >빵</option></optgroup>
  <optgroup label ="본식">
    <option value = "steak">스테이크</option>
    <option value = "pasta">파스타</option>
  </optgroup>
</select>

```html
select, option, optgroup 실습<br>
<select id = "class">
  <optgroup label = "에피타이저">
    <option value = soup >스프</option>
    <option value = salad >샐러드</option>
    <option value = bread >빵</option></optgroup>
  <optgroup label ="본식">
    <option value = "steak">스테이크</option>
    <option value = "pasta">파스타</option>
  </optgroup>
</select>
```

## datalist, option :

- datalist는 text field와 함께 사용이된다. 사용자가 데이터를 입력하면, 데이터 목록에 저장된 값이 뜬다. 그 값으로 선택 가능. 

![datalist](https://user-images.githubusercontent.com/37058233/97775847-39e92080-1ba7-11eb-8f3f-9269eece4647.PNG)

```html
datalist, option 태그
<input type = "text" list = "dlist">
<datalist id = "dlist">
    <option value= "math" label="수학"></option>
    <option value= "science" label="과학"></option>
    <option value= "english" label="영어"></option>
</datalist>
```

## textarea : 

- 여러 줄 입력 텍스트

![textarea](https://user-images.githubusercontent.com/37058233/97775939-e75c3400-1ba7-11eb-9728-5b960abe37ec.PNG)

```html
<textarea name="name" rows="3" cols="30"></textarea>
```


# 기타 폼 요소

## button

-  <button type="submit">전송하기</button> ,타입 submit, reset, button 이 있다.  input type ="button"과 다른 점은, 낭독기가 버튼이 있다는 것을 사용자에게 정확하게 전달할 수 있다는 것이고, 또한 서버에서 훨씬 더 빨리 읽어와 화면에 표시해 준다는 것이다.

  ```html
  <button type="submit">전송하기</button>
  <!--버튼에 이미지를 넣을 수 있다.-->
  <button type="submit"><img src= "src.png">전송하기</button> 
  ```

## progress 

- 진행상태를 본다.

```html
<label for ="progress">study</label>
<progress name = "progress" value ="20" max = "100" ></progress>
```

## meter 

- 진행률과는 다르게 지정된 범위 내에서 해당값이 얼마나 차지하고 있는지 표현. meter 바는 bar에 색을 줌으로서 low, high 에 대한 정보를 줄 수 있다.

![compare](https://user-images.githubusercontent.com/37058233/97784384-8c473300-1be1-11eb-961a-358f6c749ad0.PNG)



```html
<meter value="0.9" min= "0" max = "2.5" low = "0.2" high="0.8">
```

