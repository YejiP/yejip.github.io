---
layout: post
title: Advanced S3 AND Athena
description: >

excerpt_separator: <!--more-->
---



# Advanced S3

## S3 MFA-Delete

-  S3에서 중요한 처리하기 전에**MFA (multi factor authentication)** 로 코드 인증하게.. 
- MFA-Delete 이요하기 위해서는 S3 bucket의 versioning을 먼저 enable시킨다.
- objective version 을 영구적으로 삭제할 때, versioning 을 중단할 때 MFA 필요하다.
- Versioning enable과 deleted versions을 list할 때는 MFA 필요 없다. 
- Root account 만이 MFA-Delete를 활성/비활성 할 수 있다. 
- 현재 CLI를 사용해서만 MFA-DELETE를 활성화할 수 있다.



**Hands-on**

일단 버켓부터 만든다. 버켓만들 시 versioning enable해준다. 

root account 로 접속, IAM management => security credentials 가서 root access key 발급받는다. (MFA-Delete가 CLI 환경에서만 가능하기 때문에 CLI에서 Profile 등록해줘야한다. 평소에는 안 하는 것을 추천, 그리고 이 작업을 한 후 에 바로 root access key 삭제할 것을 추천.)

![download](https://user-images.githubusercontent.com/37058233/95749778-11bc7f00-0cd7-11eb-8650-ca417258a960.PNG)
access key, secret, region 입력하는거 나오면 입력하면 된다. 

```
$ aws configure --profile produser
AWS Access Key ID [None] : [여기 access key 입력]
AWS secret Access Key ID [None] : [여기 secret access key 입력]
Default region name [None] : [여기 region 입력]
```

그리고 

```
$ aws s3api put-bucket-versioning --profile [my-root-profile] --bucket [my-bucket-name] --versioning-configuration Status=Enabled,MFADelete=Enabled --mfa [“arn:aws:iam::00000000:mfa/root-account-mfa-device 123456”]
```

이렇게 입력해 주면 된다. [] 로 둘러 쌓인 정보를 입력하면 됨. ([] 이거 빼고 입력). 마지막 줄은, 내 MFA 기기의 arn 정보를 입력해주고, 마지막줄 숫자는 내 기기에서 MFA 코드 받은 것을 쓰면된다. 

그러면 MFA Delete 가 enable 되어서, S3 버켓 내의 object를 삭제를 하지 못한다. (마커 삭제도 불가.)



## S3 Default Encryption vs Bucket Policies

과거의 Encryption 은 Bucket policy 를 이용해, proper headers가 없으면 HTTP 요청을 거부한다.

![pastEnc](https://user-images.githubusercontent.com/37058233/96329797-227c4480-108b-11eb-83c9-1c0176a85e09.PNG)





현재는 쉬워졌다. 그냥 default encryption option 을 사용하면 된다. 

![Current](https://user-images.githubusercontent.com/37058233/96329853-99b1d880-108b-11eb-8d78-61683d987817.PNG)

## S3 Access Logs

- 모든 S3 버켓에 대해 무슨일이 일어나고 있는지 아는게 좋다. 아래처럼 properties에서 access logging 을 enable해준다.

![logging](https://user-images.githubusercontent.com/37058233/96335887-b31c4a00-10b6-11eb-8573-021baf6380e7.PNG)

- monitored bucket과 logging bucket이 같으면 절대 안된다. 사이즈가 기하급수적으로 증가한다. 
- data analysis tool 이나 Amazon Athena를 이용해 분석 가능하다. 

## S3 Replication (CRR & SRR)

-  **Cross Region Replication (CRR) :** 다른 리전의 버켓을 복사할 때. replication across accounts 때 ㄱㅊ
-  **Same Region Replication (SRR) :** 같은 리전의 버켓을 복사할 때.다른 Bucket들에 있는 log를 하나로 합칠 때 ㄱㅊ
-  다른 Account의 버켓이라도 replication 가능하다. 
- Asynchronous 하게 복제한다. (비동기)
- rep enable 전에 있던 파일은 rep안된다.
- delete action은 복제가 안된다. (versioning 여부와 상관없다.)
- 버켓3은 2를 rep하고, 2는 1을 rep한다고 했을 때 사진을 버켓1에 저장하면 2에만 rep되지, 3에는 rep안된다. (chain rep 안됨.)
- management - replication 에서 설정한다.  rep 버켓 설정, 하고 IAM role 붙임, 그러면 IAM롤에 알아서 추가가됨. 아마 디폴트 세팅인가보다.

## S3 Pre-Signed URLs

- SDK나 CLI를 이용해서 pre-signed URL 을 생성할 수 있다.
- GET 뿐 아니라 PUT 도 가능하게 할 수 있다.
  • Users given a pre-signed URL inherit the permissions of the person who generated the URL for GET / PUT

**Hands-on**

아래 링크는 pre-signed URL이지만, Public file이 아니라 access deny된다.

![url](https://user-images.githubusercontent.com/37058233/96336553-a6e6bb80-10bb-11eb-9af7-ef27bc593b49.PNG)

s3 object에 http get 요청에 응답하는 pre-sign URL을 만든다. 디폴트로 3600초 후에 만료된다.

맨 처음 명령은 kms encrypted object와 호환 가능하게 한다.

```
aws configure set default.s3.signature_version s3v4 
aws s3 presign s://bucket이름/s3object -- expires-in 300 --region [region]
```

## S3 Storage

|                                    |      S3 Standard       | S3 Intelligent-Tiering* |     S3 Standard-IA     |    S3 One Zone-IA†     |       S3 Glacier        | S3 Glacier Deep Archive |
| :--------------------------------: | :--------------------: | :---------------------: | :--------------------: | :--------------------: | :---------------------: | :---------------------: |
|      Designed for durability       | 99.999999999% (11 9’s) | 99.999999999% (11 9’s)  | 99.999999999% (11 9’s) | 99.999999999% (11 9’s) | 99.999999999% (11 9’s)  | 99.999999999% (11 9’s)  |
|     Designed for availability      |         99.99%         |          99.9%          |         99.9%          |         99.5%          |         99.99%          |         99.99%          |
|          Availability SLA          |         99.9%          |           99%           |          99%           |          99%           |          99.9%          |          99.9%          |
|         Availability Zones         |           ≥3           |           ≥3            |           ≥3           |           1            |           ≥3            |           ≥3            |
| Minimum capacity charge per object |          N/A           |           N/A           |         128KB          |         128KB          |          40KB           |          40KB           |
|  Minimum storage duration charge   |          N/A           |         30 days         |        30 days         |        30 days         |         90 days         |        180 days         |
|           Retrieval fee            |          N/A           |           N/A           |    per GB retrieved    |    per GB retrieved    |    per GB retrieved     |    per GB retrieved     |
|         First byte latency         |      milliseconds      |      milliseconds       |      milliseconds      |      milliseconds      | select minutes or hours |      select hours       |
|            Storage type            |         Object         |         Object          |         Object         |         Object         |         Object          |         Object          |
|       Lifecycle transitions        |          Yes           |           Yes           |          Yes           |          Yes           |           Yes           |           Yes           |

