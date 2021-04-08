---
layout: post
title: IP address
description: 
excerpt_separator: <!--more-->
---

# IP Addressing

```
IPv4, IPv6,CIDR notation,Subnet, DHCP, APIPA
```

## **IPv4** 

- **Internet Protocol Version 4 (IPv4) Addressing**

  ```
  ex) 172.248.8.5
  ```

- **Dotted-decimal notation**
- **32-bits in length**
  - IPv4 consists of 4 octets(0~255). 
  - Each octet is divided by dot.

## **IPv4 traits**

```
subnet mask, CIDR notation, Class a, Class b, Class c , public IP, private IP ,special IP
```

- **Subnet mask** 

  - It defines network portion(1) and host portion(0).
  - '1' is filled from the left side in order. 

  <img src ="https://user-images.githubusercontent.com/37058233/113943690-06df3480-97b8-11eb-97d7-c9b31b2f8974.png" width = 400px>

- **CIDR notation** 
  - It is a compact representation of an IP address and subnet mask.
  - CIDR stands for **C**lassless **I**nter-**D**omain **R**outing.
  - It represents the number of '1's in binary notation.

![image](https://user-images.githubusercontent.com/37058233/113943111-d77bf800-97b6-11eb-8d21-c34d54b1e81d.png)



- **Class A, B, and C**

  - IPv4 is divided into two part. Network and Host. Big companies like Microsoft owns Class A IP. From my understanding, They would have lots of resources to serve people, meaning that hosts who hold info should be a lot.  

  ![img](https://static.spiceworks.com/attachments/cms/0000/1253/Screen%20Shot%202016-07-06%20at%202.49.18%20PM.png)

  ![image](https://user-images.githubusercontent.com/37058233/113663013-134f7a00-965e-11eb-82b1-e5d7d8e1b9d5.png)

- **Public IP**

  - Routable
  - It must be purchased before use through your Internet Service Provider (ISP).
  - ![image](https://user-images.githubusercontent.com/37058233/113663947-c40a4900-965f-11eb-8953-a3b9d846171a.png)

-  **Private IP**

  - Non-routable
  - Network Address Translation (NAT) will enable computers with private IP connect to the internet by  matching private IPs to one public IP.

  ![image](https://user-images.githubusercontent.com/37058233/113947932-9852a480-97c0-11eb-9254-b1406b0bc7bf.png)

  

- **special IP**
  - Loop back address 
    - 127.x.x.x range 
    - ex)127.0.0.1
  - Automatic Private IP Addresses (APIPA) 
    - static IP address and cannot reach a DHCP server
    - Range of 169.254.x.x
    - If you get IP range of this, it means that your DHCP is not working. (Not possible to connect to internet)

## **Data flow - IPv4**

- **Unicast :** single sender,  one recipient

  <img src="https://user-images.githubusercontent.com/37058233/113950097-6e4fb100-97c5-11eb-8c60-341ab83c13b6.png" width = 400>

- **Multicast :** single sender, multiple recipients

  <img src="https://user-images.githubusercontent.com/37058233/113950302-d1414800-97c5-11eb-809e-15ace886ea7c.png" width = 400>

- **Broadcast :** single sender, recipients

<img src="https://user-images.githubusercontent.com/37058233/113950023-334d7d80-97c5-11eb-8234-f967aaabefa0.png" width =400>

## **Assigning IP Address**

- **Type**
  - Static
  - Dynamic

- **Components of  IP Address**
  - IP Address 
  - Subnet Mask 
  - Default Gateway 
  - Server addresses
    - DNS or WINS

- **DHCP**

  - Dynamic Host Control Protocol (DHCP) 

  - Provides clients with IP, Subnet mask, Default gateway, DNS server, WINS server, Other variables needed for VoIP

    <img src="https://user-images.githubusercontent.com/37058233/113951896-5ed26700-97c9-11eb-974a-5a71266ac814.png" width=400>

- **APIPA**
  - Automatic Private IP Address (APIPA)
  - Devices with no static IP, and no DHCP access
  - Allows a network device to self-assign an IP address from the 169.254.0.0/16 network
  - Non-routable

## **subnetting**

- Borrowing bits from the host portion and adding them to the network portion. It enables original pool of network to be separated, which is secure and better use of IP Address.

- More efficient use of IP addresses than classful default.

  ![image](https://user-images.githubusercontent.com/37058233/113666408-19485980-9664-11eb-8338-fe247c93eba7.png)

- **classful subnet**

  - Default, Only one network

- **classless subnet**

  - More than 1 network. Total number of available IPs decreases as the first and last IP in each subnet are for Network ID and Broadcast respectively.  
  - Borrow host's section in subnet mask.

- The way to calculate the number of subnets and IPs according to CIDR

![image](https://user-images.githubusercontent.com/37058233/113951301-2a11e000-97c8-11eb-9789-15e1d53982db.png)

## **IPv6**

- IPv4 is running out, due to lots of devices using WIFI.
- Enough IPv6 addresses for every person on the planet (5 x 10^28)
- IPv6 does not need DHCP to assign its IP. It uses auto configuration to discover the current network and selects its own host ID based on its **MAC** using the EUI64 process

## **Address type**

- Globally routable unicast addresses s
  -  Begins with 2000 to 3999
-  Link-local address 
  - Begins with FE80
-  Multicast addresses
  - Begins with FF

## **Data flow**

- **Unicast** and **Multicast** are similar to IPv4.

- **Anycast**

  - one to the nearest ones

    ![image](https://user-images.githubusercontent.com/37058233/113953101-eae58e00-97cb-11eb-8d25-c19196ad995a.png) 

