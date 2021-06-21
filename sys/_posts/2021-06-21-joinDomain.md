# 도메인에 조인하기

## 로컬 컴퓨터에서

**도메인 조인하기**

Control panel > System and Securtiy > System > Advanced System Settings > Computer Name > Change > Join a domain > restart

## 도메인 컨트롤러에서

restart하면 도메인 컨트롤러에 컴퓨터가 나타난다. 

그러면 재빠르게 Computer => workstation 그룹으로 넣는다.

Description에 사용자 이름 추가한다.

## 로컬 컴퓨터에서

cmd admin 권한으로 열고 gpupdate /force 한다.

mmc에서 사용자 이름의 로컬 어드민 계정 추가하고, 디폴트로 있는 Administrater account를 비활성화 한다 (보안상 그게 좋다.) 

mmc => Add Remove Snap-in => Local Users and Groups(Local) => ok 하면 console root 아래에 Local Users and Groups(Local)이 뜬다.

Group으로 가서 Administrators 그룹 더블 클릭, Add 를 눌러서 user을 add해준다. (이미 Active Directory에 계정을 만들어놨다.)  그리고 디폴트로 주어지는 admin 계정을 삭제한다.

