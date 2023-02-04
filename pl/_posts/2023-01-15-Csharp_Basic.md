---
layout: post
category: pl
tags: java
---

Format

```c#
namespace namespaceName {
  class className{
    public void output(){
      //code
    }
  }
}
```



data 

object, array, and string  are stored in Heap. 

type casting from non-reference type to reference type is called 'boxing', opposite way is called 'unboxing.'



Console.WriteLine("Hello");

int myNum = 5;

double myDoubleNum = 5.99D;

char myLetter = 'D';

bool myBool = true;

string myText = "Hello";

int[,] numbers = { {1, 4, 2}, {3, 6, 8} }; // numbers[0, 2]



GetLength() => 다차원 배열 길이 셀 때. 

Length => 배열의 모든 요소를 다센다

MyMethod(child3: "John", child1: "Liam", child2: "Liam");



Enum

-  To reduce the probaility of invalid constants.
- Generally defined directly into namespace.

```c#
enum Coffee = {'Americano','Espresso', 'Latte'};
Coffee americano = coffee.Americano
Console.WriteLine(americano);
```

Iterating enum

foreach, Enum.GetValues(typeof(enum_name))

```c#
namespace EnumPractice{
  //Define enum inside the namespace.
  enum Coffee = {'Americano', 'Espresso', 'Latte'};
  class EnumClass{
    public void OutputAll(){
      foreach (Coffee c in Enum.GetValues(typeof(Coffee))){
        Console.WriteLine(c);
      }
    }
  }
}
```



String interpolation

```c#
string name = "Callie"
Console.WriteLine( $"hi, {name}");
```

Taking an input

```c#
string saveToVariable = Console.ReadLine();
```

escape characters

```c#
Console.WriteLine("C:\\Users\\ComputerUser\\Desktop\\AFile.doc"); // with backslashes 
Console.WriteLine(@"C:\Users\ComputerUser\Desktop\AFile.doc"); // with @ symbol
```

parse and try parse

```c#
int InputNum = int.Parse("3");

//TryParse returns boolean value whether the parse was successful or not. 
//The value will save value into the second param. 
//If Parse is not successful, It will set output value as 0.
int res;
int.TryParse("3",out res) 
```



comparison

```c#
//string comparison, == is fine!! nice . 
if(todaysDay == "Monday"){
  
}
```



array sort

```c#
Array.sort(ary);
int l =  ary.Length;
```



Arguments can be passed by **reference**, instead of by value. Pass references with the `ref` keyword. Changes made in a method for a reference affects the original value outside the method.

```c#
static void PlayerDamaged(ref int playerHealth)
{
    playerHealth = playerHealth - 20;
}
int playerHealth = 100;
PlayerDamaged(ref playerHealth); // Pass playerHealth as reference parameter. 
Console.WriteLine(playerHealth); // Output: 80
```



```c#
class Card
{
    // Note: This example uses get-set properties. The upcoming section 
    // “Get-Set Properties” covers why and how they are used.
    public string Name{ get; set; }
    public int Value { get; set; }
    public string Suit { get; set; } = "Heart"; // Set a default value of "Heart"
}
```





extended class

```c#
string aWord= "Hello"; 
//when the args does not contain keyword this 
StringExtensionStatic.ToStarBox(aWord);
//when the args does contain keyword this, Class name is not used!!
aWord.ToStarBox();
// Output: 
// *******
// *Hello*
// *******

public static class StringExtensionStatic
{
    public static void ToStarBox(string text)
    {
        string starLine= "**";
        for (int i = 0; i < text.Length; i++)
        {
            starLine += "*";
        }
        Console.WriteLine(starLine); 
        Console.WriteLine($"*{text}*"); 
        Console.WriteLine(starLine);
    } 
}

public static class StringExtensionExample
{
    public static void ToStarBox(this string text)
    {
        string starLine= "**";
        for (int i = 0; i < text.Length; i++)
        {
            starLine += "*";
        }
        Console.WriteLine(starLine); 
        Console.WriteLine($"*{text}*"); 
        Console.WriteLine(starLine);
    } 
}


```





https://www.csharpstudy.com/DS/dynamic-array.aspx

```c#
// Array : The same as Java 
int ary[] = new int[5];
ary[0]=1

// List : The same as Java
List<int> myList = new List<int>();
myList.Add(90);
myList.Add(88);
myList.Add(12);
myList.Remove(12);
myList.Sort();
myList.Count;
//MyList.Insert(index, item)
MyList.Insert(0, -1);
MyList.RemoveAt(0)
int val = myList[1];

// ArrayList : Returned element type is an object, so we have to do type casting.
ArrayList al = new ArrayList();
al.add(23);
int val = (int) al[0]
  
// SortedList
SortedList<int, string> list = new SortedList<int, string>();
list.Add(1001, "Tim");
list.Add(1020, "Ted");

foreach (KeyValuePair<int, string> kv in list)
{
    Console.WriteLine("{0}:{1}", kv.Key, kv.Value);
}

//Queue, q.Enqueue(element);, q.Dequeue(); 
Queue<int> q = new Queue<int>();
q.Enqueue(120);


int next = q.Dequeue(); // 120
next = q.Dequeue(); // 130

//Stack, s.Push(element); s.Pop();
Stack<double> s = new Stack<double>();
s.Push(10.5);
s.Push(3.54);
s.Push(4.22);

double val = s.Pop(); //4.22

//Hashtable, ht.add(element,element); ht.Contains(element); ht[key];
Hashtable ht = new Hashtable();
ht.Add("irina", "Irina SP");
ht.Add("tom", "Tom Cr");

if (ht.Contains("tom"))
{
    Console.WriteLine(ht["tom"]);
}

//Dictionary, d.add(key,val); d.TryGetValue(key, out val); 
Dictionary<int, string> emp = new Dictionary<int, string>();
emp.Add(1001, "Jane");
emp.Add(1002, "Tom");
emp.Add(1003, "Cindy");

string name = emp[1002];
Console.WriteLine(name);

//Linkedlist, LinkedListNode, ll.AddLast(item); LinkedListNode lln = ll.Find(item)
LinkedList<string> list = new LinkedList<string>();
list.AddLast("Apple");
list.AddLast("Banana");
list.AddFirst("Lemon");
list.AddAfter(node,"Lsemon");            
LinkedListNode<string> node = list.Find("Banana");
LinkedListNode<string> newNode = new LinkedListNode<string>("Grape");

// 새 Grape 노드를 Banana 노드 뒤에 추가
list.AddAfter(node, newNode);

// 리스트 출력
list.ToList<string>().ForEach(p => Console.WriteLine(p));

// Enumerator 리스트 출력
foreach (var item in list)
{
    Console.WriteLine(item);
}

```

