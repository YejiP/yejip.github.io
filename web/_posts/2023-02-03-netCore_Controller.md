---
layout: post
category: web
tags: netcore
title: Restful API endpoint setup
---

**Controllers/Api/UserController.cs**

-  controllerBase를 상속한다. 

- class 이름위에 라우트인 [Route("api/[controller]")] 명시해준다. 

  -  [controller] 부분에, 클래스 이름의 UsersController의 앞부분인 users가 대체한다.

- [ApiController]를 명시해준다.

- 앞서 생성했던 NotesContext클래스를 주입해준다. 

  ```c#
    [Route("api/[controller]")]//url will be api/Users/function_name/params
    [ApiController]
    public class UsersController : ControllerBase
    {
      private readonly NotesContext _context;
      public UsersController(NotesContext context)
      {
        _context = context;
      }
      //omit...
    }
  ```

- return type : async는 Task 반환. ActionResult는 반환값이 user아닐때도 받을 수 있다. IEnumerable은 리스트 받을 때.
  - Task<ActionResult< User> > 
    - Async 함수의 리턴 타입으로, User를 리턴값으로 기대하지만 오류나 redirect같은 것을 반환할 수 있다.
  - Task<ActionResult<IEnumerable< User>>> GetUsers()
    - Async 함수의 리턴 타입으로, User list를 리턴값으로 기대하지만 오류나 redirect같은 것을 반환할 수 있다.

- _context.User, _context.Note 로 Users, Notes 테이블에 아주 간편하게 접근해서 테이블 데이터를 CRUD를 할 수 있다. 
  - _context.Users.ToListAsync();
  - _context.Users.Add(user); await _context.SaveChangesAsync();
  - var user = await _context.Users.FindAsync(id);
  - _context.Users.Remove(user);

- Restful API의 7가지 endpoint를 설정해준다. (New와 Edit은 반환하는 데이터가 없으니, 생략)
  1. [Index : [HttpGet]](#index)
  2. New : [HttpGet]
  3. [[Create : [HttpPost]](#create)
  4. [Show : [HttpGet("{id}")]](#show)
  5. Edit : [HttpGet]
  6. [[Update : [HttpPut("{id}")]](#update)
  7. [Destroy : [HttpDelete("{id}")]](#destroy)

## Index

```c#
//Get: localhost:port/api/Users
[HttpGet]
public async Task<ActionResult<IEnumerable<User>>> GetUsers()
{
  return await _context.Users.ToListAsync();
}
```

## Create

```c#
[HttpPost]
public async Task<ActionResult<User>> PostUser(User user)
{
  _context.Users.Add(user);
  await _context.SaveChangesAsync();
  //why new {id = user.ID}?
  return CreatedAtAction("GetUser", new { id = user.ID }, user);
}
```

## Show

```c#
[HttpGet("{id}")]
public async Task<ActionResult<User>> GetUsers(int id)
{
  var user = await _context.Users.FindAsync(id);

  if (user == null)
  {
    //NotFound method is offered by controller base.
    return NotFound();
  }

  return user;
}
```

## Update

```c#
[HttpPut("{id}")]
public async Task<ActionResult> PutUser(int id, User user)
{
  if (id != user.ID)
  {
    return BadRequest();
  }
  _context.Entry(user).State = EntityState.Modified;
  try
  {
    await _context.SaveChangesAsync();
  }
  catch (DbUpdateConcurrencyException)
  {
  }
  return NoContent();
}


```

## Destroy

```c#
[HttpDelete("{id}")]
public async Task<ActionResult<User>> DeleteUser(int id)
{
  User user = await _context.Users.FindAsync(id);
  if (user == null)
  {
    return NotFound();
  }
  _context.Users.Remove(user);
  await _context.SaveChangesAsync();

  return user;
}
```

## 전체코드

@Controllers/Api/UsersController.cs

```c#
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using notes.Models;
using notes.Data; // it loads NotesContext.
/*
Controller : to render your normal views.
ApiController : to return data that is serialized and sent to the client.
*/
namespace notes.Controllers
{
  [Route("api/[controller]")]//url will be api/Users/function_name/params
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly NotesContext _context;
    public UsersController(NotesContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
      return await _context.Users.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUsers(int id)
    {
      var user = await _context.Users.FindAsync(id);

      if (user == null)
      {
        //NotFound method is offered by controller base.
        return NotFound();
      }

      return user;
    }

    [HttpPost]
    public async Task<ActionResult<User>> PostUser(User user)
    {
      _context.Users.Add(user);
      await _context.SaveChangesAsync();
      //why new {id = user.ID}?
      return CreatedAtAction("GetUser", new { id = user.ID }, user);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> PutUser(int id, User user)
    {
      if (id != user.ID)
      {
        return BadRequest();
      }
      _context.Entry(user).State = EntityState.Modified;
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {

      }
      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<User>> DeleteUser(int id)
    {
      User user = await _context.Users.FindAsync(id);
      if (user == null)
      {
        return NotFound();
      }
      _context.Users.Remove(user);
      await _context.SaveChangesAsync();

      return user;
    }
  }
}

```

@Controllers/Api/NotesController.cs

```c#
using notes.Data;
using notes.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace notes.Controllers
{
  [Route("api/[Controller]")]
  [ApiController]
  public class NotesController : ControllerBase
  {
    private readonly NotesContext _context;
    public NotesController(NotesContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Note>>> Index()
    {
      return await _context.Notes.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Note>> Show(int id)
    {
      var note = await _context.Notes.FindAsync(id);
      if (note == null)
      {
        return NotFound();
      }
      return note;
    }

    [HttpPost]
    public async Task<ActionResult> Create(Note note)
    {
      _context.Notes.Add(note);
      await _context.SaveChangesAsync();
      return CreatedAtAction("Show", new { id = note.ID }, note);
    }


    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, Note note)
    {
      if (id != note.ID)
      {
        return BadRequest();
      }
      _context.Entry(note).State = EntityState.Modified;
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {

      }

      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Note>> Delete(int id)
    {
      //Note note = await _context.Notes.FindAsync(id);
      var note = await _context.Notes.FindAsync(id);
      if (note == null)
      {
        return NotFound();
      }
      _context.Notes.Remove(note);
      await _context.SaveChangesAsync();
      return note;
    }
  }
}

```

