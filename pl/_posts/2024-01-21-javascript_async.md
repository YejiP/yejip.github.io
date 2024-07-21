---
layout: post
category: pl
title: "Learning Asynchronous code step by step"
tags: javascript
---
<ol>
<li><b> Problem situation and simple solution.</b></li>
<li>Dig deeper, what's Promise?</li>
<li>Dig deeper in Angular direction, what's Observable?</li>
</ol>

When I first joined the company as a fresh junior software developer(I am still..), I was told to focus on delivery for few months,then I will have time to learn later.(? I still don't get it.)
🚩🚩🚩🚩🚩🚩🚩Then this code was born.

```javascript
function groupPeopleByAge(fromAge : number, toAge:number): Person[]{
  let peopleGroup : Person[] = [];
  //Async block, I use angular
  this.sandbox.pipe(first()).subscribe((peopleInfo : Person[])=>{
    peopleGroup = peopleInfo.filter((person)=> fromAge  <= person.age && person.age <= toAge);
  })
  return peopleGroup;
}
```

Back then, this made sense to me. First, I declare peopleGroup array in the function block.
then inside Async block, I can assign value to peopleGroup array, which will filter person objects whose age key's values are between fromAge to toAge. Next, return the peopleGroup! I will have all the peopleGroup in my array. Correct? Well, I did not know I was wrong before someone pointed it out like few months later...

Why is this wrong? because coding world is not generous, it does not wait for the async block to be completed. Hmm. like Korea.. not generous..
If we are lucky enough, we might get the correct results. However, let's say this async code takes so long to complete, then the code will not wait for it and just return undefined.

To fix the code, I have to change the structure.

Let's say, the way I wanted to use it was something like below,

```javascript
function assignDuties(): void{
  let children = this.getPeopleByAge(0,17);
  this.doHomework(children);
  this.goSchool(children);

  let adults =  this.getPeopleByAge(18,Infinity);
  this.goWorkToEarnMoneyAndPayBills(adults);
  this.manageWorkStress(adults);
  this.dealWithExistentialismThoughts(adults);
  this.protectBoundary(adults);
}
```

Let's say I want to
1. run doHomework and GoSchool to children array that was returned by getPeopleByAge function
2. run goWorkToEarnMoneyAndPayBills, manageWorkStress, dealWithExistentialismThoughts, and protectBoundary for adults array. (Tho, my adult life is pretty awesome.. not lying.)

The problem is, this array might be empty because of the timing issue. We can achieve the same thing by using callback function like this.

```javascript
function groupPeopleByAge(fromAge : number, toAge:number, callbacks[]: (()=>void)[]){
  let peopleGroup : Person[];
  //Async block, I use angular
  this.sandbox.pipe(first()).subscribe((peopleInfo : Person[])=>{
    peopleGroup = peopleInfo.filter((person)=> fromAge  <= person.age && person.age <= toAge);
    callbacks.forEach((f) => f(peopleGroup))
  })
}
```

```javascript
function assignDuties(): void{
  this.groupPeopleByAge(0,17,[this.doHomework, this.goSchool]);

  this.groupPeopleByAge(18,Infinity,[this.goWorkToEarnMoneyAndPayBills,this.manageWorkStress, this.dealWithExistentialismThoughts, this.protectBoundary])
}
```

Something like this.
There might be a better way, I will have to learn more. Then I will come back and add it later.
Next time, I will write post about Promise.
