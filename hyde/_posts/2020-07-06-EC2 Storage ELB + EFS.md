---
layout: post
title: EC2 Storage EBS + EFS
description: >
  EBS(elastic block store) 와 EFS(elastic file system) 에 대한 기초.
excerpt_separator: <!--more-->
---

EC2 에서 데이터 저장해 놓고, 갑자기 종료되면 데이터도 다 날라간다. 이를 방지하기 위해서 ebs에 따로 저장한다. (Network drive임)


# EBS (Elastic Block Store)
  : AZ에 한정되어 있다.
  : Provision capacity 로 돈을 낸다.
  : Volume type - size, throughtput, IOPS(I/O operations per sec) 에 맞춰 고른다.)
    1. GP2(SSD) : 일반적으로 사용됨.
    2. IO1(SSD) : 퍼포먼스가 가장 좋다. (low latency, high throughput)
    3. STI(HDD) : 저렴, intensive workloads에 적합하다.
    4. SCI(HDD) : 가장저렴. less frequently accessed workload.

  : EC2 만들 때 , Add storage 에서 추가 가능하다.
  : EBS를 EC2 폴더에  mount 하기.
    lsblk : Attached drive 보여준다.
    sudo file -s /dev/xvd_ --> data 라고 뜨면, file system 없는거라 만들어야 한다. (아니 기억이 안나 여기 확인 하기)
    sudo mkfs -t ext4 /dev/xvdb
    sudo mkdir /data
    sudo mount /dev/xvdb/data
    이 코드 다시 확인해라


## GP2
    대부분의 workload에 추천.
    system boot volume 임.
    1 GiB - 16 TiB
    low latency(지연 최소화)
    small gp2 volumes는 3000 IOPS 까지 burst 가능.
    1GB 당 3 IOPS 가능. <= 16,000 iops. (5,334GB에 맥스다.)

## IO1
    중요한 비지니스 앱(16,000 IOPS per volume 보다 더 사용하는 앱, iops퍼포먼스가 유지되어야하는 앱)에 적합. (성능이 제일 좋아서 그런가부다)
    IOPS 맨첨에 제공된다. MIN 100 - MAX 64,000 (Nitro instances) , MAX 32,000 (other instances)
    provisioned IOPS : 요청된 Volume size (in GiB) =  50:1
    4 GiB - 16 TiB

## ST1
    저렴한 가격에 일관되고 빠른 throughput 이 필요할 때
    시스템 부트 볼륨 불가.
    500 GiB - 16 TiB
    Max IOPS 는 500

## SC1
    자주는 사용하지 않지만 큰 볼륨을 위한 Throughput oriented storage.
    시스템 부트 볼륨 불가. (GP2, IO1만 부트 볼륨 가능)
    500 GiB - 16 TiB
    Max IOPS 는 250 (확실히 ST1 보다 느리다.)


## EBS 와 Instance Store
    Instance store
      물리적으로 장비에 붙어있다.
      장점 : I/O performance가 ebs보다 낫다. (당연..), 리부트해도 데이타 안 지워진다.
      단점 : stop/termination 시 삭제된다. resize 불가하고 backup 본인이 해야한다.



# EFS(Elastic File System)
  :멀티 AZ 가능. cf) EBS는 한 AZ 안에서만..
  :NFSv4.1 프로토콜 사용. (std way to mount)
  :window 에서는 mount 안됨. Linux 만..
  :POSIX file system (linux)

  :EFS scale
    1000s of concurrent NFS Clients
    자동으로 petabyte scale까지 간다.

  :Performance mode
    general purpose : latency sensitive use case (web server)
    max I/O : higher latency,highly parallel (big data, media processing.)

  :storage tiers (move file after N days)
    std : 자주 접근되는 파일에
    Infrequent access (EFS-1A) : 파일 불러올 때 돈냄.

  EFS는 NFS 인데, 다른 AZ에서도 EC2 Instance 접근 가능하게 해준다.
  life cycle에서 며칠동안 접근 안하면 inf access로 바꾸게 하는 옵션 있다.


# EBS/EFS 정리
EBS
  1. 한번에 하나의 instance 에 붙는다.
  2. AZ level 에 국한된다.
  3. gp2 : disk 사이즈 증가시 , io 증가한다.
  4. io1 l IO를 독립적으로 증가시킬 수 있다
  5. EBS 볼륨을 다른 AZ로 옮길 시, Snapshot 가져와서 다른 AZ에 복구시킨다.

EFS

  1. 100~1000...개 Instance 가능하다.
  2. LINUX에서 돌아간다.
  3. Multi AZ!



종이에 글씨 좀 잘쓰자!
