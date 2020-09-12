---
layout: post
title: HTMLandCSS
description: > HTML와 CSS로 코딩은 대충 해봤지만 정확하게는 모르는 나를 위한 공부...

excerpt_separator: <!--more-->
---

# HTMLandCSS 

# CSS 기초

1. **글자 크기 표현**

   px,  em,  %



2. **색 표현**

aqua, black, blue, fuchsia, gray, green, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow

rgb(255,10,0)

\#ffcc00



3. **CSS와 HTML 연결**

```
1. 파일 외부에 CSS 파일 있는 경우
<link href="common.css" rel="stylesheet" type="text/css" />
이런 식으로 CSS파일을 불러올 수 있다.

2.파일 안에 CSS 넣는 경우 (비추)
<style type="text/css">
  h1{
  }
</style>
```



## 선택자

1. **요소 선택자**

: 요소명을 적어서 나타내는 선택자.

```
h1 {
	color : red;
}
```



2. **ID 선택자**

: id 속성을 가진 요소를 선택하는 선택자

```
#abc {
	color:red;
}
```



3. **class 선택자**

: class 속성을 가진 요소를 선택하는 선택자

```
.abc {
	color:red;
}
```



**쉼표로 한번에 스타일 주기**

```

p, div, h1 {
	color :red;

}
```



**후손 선택자**

```
.box .name{
	color : red;
}
```



**선택자 우선순위**

1. 같은 단계 선택자라면, 나중에 선언된게 우선으로 적용된다. 
2. 후손 선택자라면, 더 많은 단계로 표현된 선택자가 우선으로 적용된다.
3. id 선택자는 class나 요소 선택자보다 우선순위가 높다.

```
예시)
p {
	color : blue;
	font-size :12px;

}

div p{
	color : red
}

이 경우, font size가 12이고 red인 글자가 탄생.
```



## 글자

- color - 글자 색을 지정.
- font-family - 글자의 서체를 지정.
- 서체의 종류
  - 세리프(serif) - 꺽쇠가 있는 서체, 가독성을 보다 높여 줌.
  - 산세리프(sans-serif) - 꺽쇠가 없는 서체, 심플하고 깔끔한 서체.
  - 모노스페이스(monospace) - 글자들의 너비가 동일한 서체, 코딩 작업 등에 주로 사용.
  - 커시브(cursive) - 필기체.
  - 판타지(fantasy) - 장식이 많은 서체, 제목 같은 일부 영역에 유용.
- 웹 안전 서체는 대부분의 PC에 내장되어 있는 서체.
- font-size - 글자의 크기를 지정.
- font-style - 이텔릭과 같은 스타일을 지정.
- font-weight - 글자의 굵기를 조절.
- font-variant - 영문자 소문자를 작은 대문자로 변경.
- line-height - 줄 높이
- font - 글자 관련 속성의 축약 버전. font-family, font-style, font-size, font-weight, line-height를 한 번에 지정할 수 있음. 단 속성들의 순서가 중요.



출처 - WEBBER STUDY