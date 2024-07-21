# CentOS에 TOMCAT 설치해 WAR파일 배포하기

https://hgko1207.github.io/2020/10/12/linux-7/

```
//파일 다운 받은 것 풀어주고
sudo tar zxvf apache-tomcat-8.5.68.tar.gz

//firewall 8080번 포트 열어준다.
sudo firewall-cmd --permanent --add-port=8080/tcp
```

- 환경 변수는 etc/profile 에서 설정해준다. 

  ```
  sudo vi /etc/profile
  ```

- /etc/profile 파일

  ```
  JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.292.b10-1.el8_4.x86_64/jre/bin/java
  PATH=$PATH:$JAVA_HOME/bin
  export JAVA_HOME PATH
  ```

- tomcat 실행

  ```
  ./bin/startup.sh
  ps -ef|grep tomcat //tomcat이 성공적으로 실행됐는지 
  ```

- firewall 재확인하기

  ```
  sudo firewall-cmd --state 
  sudo firewall-cmd --permanent --zone=public --list-ports
  sudo firewall-cmd --reload
  sudo firewall-cmd --zone=public --query-port=8080/tcp
  ```

  https://www.programmersought.com/article/58814610302/

![image](https://user-images.githubusercontent.com/37058233/126238327-b4717618-c941-4a63-b24c-80416e179715.png)

준비된 war 파일을 tomcat - webapps 에 넣어준다.

![image](https://user-images.githubusercontent.com/37058233/126239676-a6d5592f-b31f-4c18-afba-d437e6577c74.png)

![image](https://user-images.githubusercontent.com/37058233/126239700-eddda135-c606-4e21-bb68-a4d564c8a4cb.png)

