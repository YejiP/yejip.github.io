---
layout: post
category: web
tags: netcore
title: .Net core에서 Model 생성하기
---

공부 환경 : Mac OS, Visual Studio Code

**전체적인 흐름**

1. [User, Note 모델 클래스 생성하기](#모델-클래스-생성하기)

   - 데이터 어노테이션으로 프로퍼티의 데이터 속성을 표시해준다.

   - one to many 관계로 생성해준다.

2. [NotesContext 클래스 생성하기](#notescontext-클래스-생성하기)

   - DbContext를 상속하는 클래스이다.

   - 생성자는 DbContextOptions< NotesContext> options을 파라미터로 가진다.

   - User에 Note를 아이템을 가지는 dbset을 반환하는 함수가 있다.

3. [Program.cs에서(혹은 Startup.cs) DbContext 상속 객체에 DB타입을 지정해주기](#dbcontext를-상속한-객체에-db-타입을-지정해주기)
   - 이 포스팅에서는 in memory db로 테스트
4. [DB에 데이터가 아예 없을 경우, 자동으로 데이터 생성시키기(선택)](#db에-데이터-생성시키기)

## 모델 클래스 생성하기

**1. 데이터 어노테이션으로 프로퍼티의 데이터 필드 속성을 정해준다.**

- 클래스 프로퍼티이름이 ID인 경우, 자동으로 프라이머리 키로 지정된다. 
- 대괄호[ ]를 사용해 특징을 설정해준다.  => using System.ComponentModel.DataAnnotations;
  - [Key], [Required]
  - [[EmailAddress]
  - [[StringLength(128, MinimumLength = 8)]
  - [[Display(Name = "Phone Number")]
  - [[RegularExpression(@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$", ErrorMessage = "Not a valid phone number")]

**2. One to Many relationship을 표현해주기**

- User은 하나 이상의 Note를 갖는다. -> User class에 Note List 프로퍼티를 넣어준다.

- Note는 오직 한 User만 갖는다. -> Note에 UserID와 User을 프로퍼티로 넣어준다.

  @User.cs

  ```c#
  public class User
  {
    public List<Note> Notes { get; set; }
  }
  ```

  @Note.cs

  ```c#
  public class Note
  {
    public User? User { get; set; }
    public int UserID { get; set; }
  }
  ```

전체코드

@Models/User.cs

```c#
using System.ComponentModel.DataAnnotations;
namespace notes.Models
{
  public class User
  {
    public int ID { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    [StringLength(12, MinimumLength = 3)]
    [Required]
    public string Name { get; set; }
    [Required]
    public string Password { get; set; }
    public List<Note> Notes { get; set; }
  }
}
```

@Models/Note.cs

```c#
using System.ComponentModel.DataAnnotations;
namespace notes.Models;
public class Note
{
  public int ID { get; set; }
  public User? User { get; set; }
  public int UserID { get; set; }
  [Required]
  public string? title { get; set; }
  public string? content { get; set; }
}
```

## NotesContext 클래스 생성하기

@Data/UsersContext.cs

```c#
using Microsoft.EntityFrameworkCore;
using notes.Models;
namespace notes.Data
{
  public class NotesContext : DbContext
  {
    public NotesContext(DbContextOptions<NotesContext> options)
        : base(options)
    {
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Note> Notes { get; set; }
  }
}

```

## DbContext를 상속한 객체에 DB 타입을 지정해주기

- NotesContext객체의 DB 컨텍스트 지정하기

@Program.cs

- in meory database 사용시, 

  ```
  dotnet add package Microsoft.EntityFrameworkCore.InMemory
  ```

  @Program.cs

  ```c#
  builder.Services.AddDbContext<NotesContext>(opt =>
      opt.UseInMemoryDatabase("UsersContext"));
  ```

- Sqlserver 사용시

  @Program.cs

  ```c#
  services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));
  ```

## DB에 데이터 생성시키기

총 두가지 파일

1. Models/SeedData.cs
2. Program.cs

@Models/SeedData.cs

```c#
using Microsoft.EntityFrameworkCore;
using notes.Data;

namespace notes.Models
{
  public static class SeedData
  {
    public static void Initialize(IServiceProvider serviceProvider)
    {
      using (var context = new UsersContext(
          serviceProvider.GetRequiredService<
              DbContextOptions<UsersContext>>()))
      {
        if (context.Users.Any())
        {
          return;
        }

        context.Users.AddRange(
            new User
            {
              Name = "Gary Chester",
              Email = "GaryChester@gmail.com",
              Password = "chesterPasswordISTRONG!"
            },

            new User
            {
              Name = "Randy Kline",
              Email = "Randy@Kline@.com",
              Password = "Qwertyuiop!"
            }

        );
        context.SaveChanges();
      }
    }
  }
}
```

@Program.cs

```c#
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
  var services = scope.ServiceProvider;

  try
  {
    SeedData.Initialize(services);
  }
  catch (Exception ex)
  {
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred seeding the DB.");
  }
}
```
