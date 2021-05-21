---
layout: post
title: Active Directory users
description: This page will be kept updated.
excerpt_separator: <!--more-->
---

## Active Directory adding users

[https://www.youtube.com/watch?v=i9I5poSokow](https://www.youtube.com/watch?v=i9I5poSokow)

## 1. Admin group

The group that has **default admin rights to Active Directory and Domain Controllers** and provides these rights to Domain Admins and Enterprise Admins, as well as any other members.

## 2. Local admin group

A Local Admin has the permission to do anything but is restricted to one machine

**Source** : [THERE’S ADMIN AND THERE’S ADMIN – DOMAIN ADMINISTRATORS VS LOCAL ADMINISTRATORS](https://www.trinustech.com/blog/theres-admin-and-theres-admin-domain-administrators-vs-local-administrators/)

## 3. Domain admin group

Members of this group have **full control of the domain**. By default, **this group is a member of the Administrators group on all domain controllers, all domain workstations, and all domain member servers at the time they are joined to the domain**. By default, the Administrator account is a member of this group. Because the group has full control in the domain, add users with caution.

## 4. Enterprise admin group

Only appears in the forest root domain.

Members of this group have full control of all domains in the forest. **By default, this group is a member of the Administrators group on all domain controllers in the forest.** By default, the Administrator account is a member of this group. Because this group has full control of the forest, add users with caution.

**Source**: [Default groups](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2003/cc756898(v=ws.10)?redirectedfrom=MSDN)

