# 1. 컴퓨터 Clean Install하기

1. install 하기 전, 컴퓨터 내부 부품 빠진거 있나 살피기
2. bios에서 usb boot priority 설정해주고 clean install 시작.
3. 다 된 후, 
   1. window ud
   2. driver ud
   3. computer name change

[자세히](https://yejip.com/sys/2021-06-20-InstallingWindow/)

# 2. 도메인에 join 해주기

1. AD에 컴퓨터 등록되어있다면, 삭제해주고 15분 정도 기다려주기 (DC끼리 업뎃하기를 기다림)
2. 프로그램 4개정도 manually download (usb Programs 폴더에 있음)
3. gpupdate /force 한 후, office2019 설치랑 보안프로그램 설치 확인

[자세히](https://yejip.com/sys/2021-06-21-joinDomain/)

# 3. AD와 Exchange account 만들기

[AD Account](https://yejip.com/sys/2021-07-14-ADaccount/)

[Exchange Account](https://yejip.com/sys/2021-07-14-EAPaccount/)



컴퓨터 setup 되고, AD와 Exchange account 만든 후에 

1. 사용자 계정으로 로그인
2. 이메일 outlook시작해서 exchange 메일, dc에 정보있어서 autodiscover 이용해서 계정 연결해준다.
3. 메일보내서 체크
4. 엣지랑 파일 unpin
5. (mmc에서 로컬 계정 사용자를 admin그룹에  추가하고, 디폴트 admin 계정 disabled시킨다.)