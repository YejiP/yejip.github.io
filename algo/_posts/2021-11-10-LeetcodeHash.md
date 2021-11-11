# HashSet, HashMap usage 

## HashSet

- Initialization

  ```java
  Set<Integer> s = new HashSet<>();
  ```

- Adding elements

  ```java
  s.add(1);
  s.add(3);
  ```

- Remove elements

  ```java
  s.remove(1);
  ```

- Check if the element exists

  ```java
  s.contains(1);
  ```

- Iteration

  ```java
  for(int i : s){
      System.out.println(i);
  }
  ```

- Empty

  ```java
  s.isEmpty();
  ```

- Clear

  ```java
  s.clear();
  ```

## HashMap

- Initialization

  ```java
  Map<Integer,Integer> m = new HashMap<>();
  ```

- Adding elements

  ```java
  m.put(1,1);
  m.put(3,2);
  ```

- Delete Key

  ```java
  m.remove(1);
  ```

- Check if the Key exists

  ```java
  m.containsKey(1);
  ```

- Iteration

  ```java
  for (Map.Entry<Integer, Integer> entry : m.entrySet()) {
          System.out.print("(" + entry.getKey() + "," + entry.getValue() + ") ");}
  ```

- clear the hash map

  ```java
  m.clear();
  ```

- Check if the hash map is empty

  ```java
  if (m.isEmpty()) {
          System.out.println("hash map is empty now!");
      }
  ```

  