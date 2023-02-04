---
layout: post
category: web
tags: netcore
---

 ```
  dotnet new mvc --name [projectname]
  dotnet add package Microsoft.EntityFrameworkCore.SqlServer // to use using Microsoft.EntityFrameworkCore;
 ```

1. models 만들고
   1. user 먼저 만들고, notes. 둘이 One to many relationship 으로 해준다. (user이 list of notes 가진다.)

2. Data/NotesContext.cs 만들어서, user, note context 셋업해준다.
3. program.cs에 model context option 넣어주고
4. seed data해주고
5. Program.cs에 seed data 조건 넣어주고
6. api셋업

Problems

![image-20230131204741109](/Users/yejipark/Library/Application Support/typora-user-images/image-20230131204741109.png)

dotnet dev-certs https --clean
dotnet dev-certs https --trust
Cleaning HTTPS development certificates from the machine. This operation might require elevated privileges. If that is the case, a prompt for credentials will be displayed.
HTTPS development certificates successfully removed from the machine.
Trusting the HTTPS development certificate was requested. If the certificate is not already trusted we will run the following command:
'sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain <<certificate>>'
This command might prompt you for your password to install the certificate on the system keychain.
Password:
The HTTPS developer certificate was generated successfully.



![image-20230131220440744](/Users/yejipark/Library/Application Support/typora-user-images/image-20230131220440744.png)

we have to use actionresult, bc notfound is not a user type.



create 시, object postman으로 못한다. -> asp.net view에서는  asp-items를 이용해 id와 object를 연결해줄 수 있다.
