---
layout: post
title: Joining a domain
description: This page will be kept updated.
excerpt_separator: <!--more-->
---

## **How to add users to a domain**

**from the official docs,**

- **To add a domain user or group**
  1. In the **Users / Groups** window, click **Add.**
  2. In the **Enter User or Group names** dialog box, select domain users or groups by doing one of the following:
     - In the **Enter User or Group names** field, type a user or group that exists in the domain or as a local user or group on the computer. Then click **Check Names** to resolve it to the full existent name.
     - Click **Find** to open the standard **Select Users or Groups** dialog box. Then select domain users or groups.
  3. Click **OK**. The domain users or groups are added.

[source - ms docs](https://docs.microsoft.com/en-us/microsoft-desktop-optimization-pack/medv-v1/how-to-configure-a-domain-user-or-groupmedvv2)

- **from HO and reference - How to add users to active directory**

1. In Active Directory Users and Computers, right click and click new.
2. add a user. done

[Reference Page](https://www.server-world.info/en/note?os=Windows_Server_2019&p=active_directory&f=4)

[Domain Controllers vs Active Directory](https://adamtheautomator.com/domain-controller-vs-active-directory/#Domain_Controllers)

## **How to join PCs to a domain**

[How to join PCs to a domain](https://win10faq.com/join-windows-10-to-domain/)

- **Window Server**

  - Windows Server is the platform for building an infrastructure of connected applications, networks, and web services, from the workgroup to the data center. [source - ms docs](https://docs.microsoft.com/en-us/windows-server/)

  - Don't get confused by the one we are using at home. 

    ![image](https://user-images.githubusercontent.com/37058233/113041131-72892800-914e-11eb-8cf4-2638bba2fd7c.png)

- **What is domain?**

  - Domain is a network that enables all users on the same network to use any computer on the network.

- **Then, How to join PCs to a domain?**

  1. On the **Start** screen, type **Control Panel**, and then press ENTER.

  2. Navigate to **System and Security**, and then click **System**.

     <img src = "https://user-images.githubusercontent.com/37058233/113042221-c6484100-914f-11eb-9f17-4b7028014e57.png" width = 400>

  3. Under **Computer name, domain, and workgroup settings**, click **Change settings**.

     <img src = "https://user-images.githubusercontent.com/37058233/113042447-0e676380-9150-11eb-8ddf-2a7ac89ed150.png" width = 400>

  4. On the **Computer Name** tab, click **Change**.

  5. Under **Member of**, click **Domain**, type the name of the domain that you wish this computer to join, and then click **OK**.

     ![image](https://user-images.githubusercontent.com/37058233/113069076-6e700100-9174-11eb-815d-fadd63d200b8.png)

     - The ID and PWD are registered on the domain. so you can join the domain!(?)

     ![image](https://user-images.githubusercontent.com/37058233/113069219-b68f2380-9174-11eb-81c8-b3c354bdd380.png)

     

  6. Click **OK**, and then restart the computer

- My personal computer does not belong to any domain, because it is not added to any active directory domain but my work computer does. I made a screen shot of other post. [source - groovypost.com]([https://www.groovypost.com/howto/join-a-windows-10-client-domain/](https://www.groovypost.com/howto/join-a-windows-10-client-domain/))

  [source - ms docs](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/deployment/join-a-computer-to-a-domain)

## **How to create an email address using Exchange (2019)**

[This post has good info!](https://help.fasthosts.co.uk/app/answers/detail/a_id/3207/~/outlook-2019-setup-for-exchange-2019-and-professional-mailboxes)

[source : Youtube Video](https://www.youtube.com/watch?v=gbUtKZiLnKk)

## **What is WSUS?**

- Windows Server Update Services
- It provides latest Microsoft product updates

[source - ms docs](https://docs.microsoft.com/en-us/windows-server/administration/windows-server-update-services/deploy/deploy-windows-server-update-services)

