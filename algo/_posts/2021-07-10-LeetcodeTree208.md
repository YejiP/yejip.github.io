# Leetcode 208) Implement Trie (Prefix Tree)

![image](https://user-images.githubusercontent.com/37058233/125367186-8d159480-e32c-11eb-8427-dd3532eee25f.png)

# 내 답안

```java
class Trie {
    Map<Character,Trie> map;
    List<String> words= new ArrayList<>();
    boolean leaf=false;
    public Trie() {
        map= new HashMap<>();        
    }

    /** Inserts a word into the trie. */
    public void insert(String word) {        
        //System.out.println(word.charAt(0));
        words.add(word);
        if(word==""){
            return;}
        //System.out.println(word);
        Trie tmp = map.get(word.charAt(0));

        if(tmp!=null){
            if(word.length()<2){
                leaf=true;
                return;
            }else{
                tmp.insert(word.substring(1));
            }
        }else{
            tmp= new Trie();
            map.put(word.charAt(0),tmp);

            if(word.length()>=2){
                tmp.insert(word.substring(1));
            }else{
                leaf=true;
                return;
            }

        }        
    }

    /** Returns if the word is in the trie. */
    public boolean search(String word) {
        if(words.contains(word)){
            return true;
        }
        return false;
    }

    /** Returns if there is any word in the trie that starts with the given prefix. */
    public boolean startsWith(String prefix) {
        if(prefix=="")return true;
        boolean res=false;
        if(prefix.length()==1){
            if(map.get(prefix.charAt(0))!=null){
                res=true;
            }
        }else{
            Trie tmp = map.get(prefix.charAt(0));
            if(tmp==null)return false;
            res = (map.get(prefix.charAt(0))!=null) && tmp.startsWith(prefix.substring(1));

        }
        return res;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * boolean param_2 = obj.search(word);
 * boolean param_3 = obj.startsWith(prefix);
 */
```

#  다른 답안

```java
class Trie {
    private TrieNode root;

    private class TrieNode{
        boolean end;
        TrieNode[] children;

        public TrieNode(){
            this.end = false;
            this.children = new TrieNode[26];
        }
    }

    /** Initialize your data structure here. */
    public Trie() {
        root = new TrieNode();
    }

    /** Inserts a word into the trie. */
    public void insert(String word) {
        int n = word.length();
        TrieNode tn = root;
        for(int i = 0; i < n; i++){
            int cur = word.charAt(i) - 'a';
            if(tn.children[cur] == null){
                tn.children[cur] = new TrieNode();
            }
            tn = tn.children[cur];
        }
        tn.end = true;
    }

    /** Returns if the word is in the trie. */
    public boolean search(String word) {
        int n = word.length();
        TrieNode tn = root;
        for(int i = 0; i < n; i++){
            if(tn == null) return false;
            int cur = word.charAt(i) - 'a';
            if(tn.children[cur] == null){
                return false;
            }
            else tn = tn.children[cur];
        }
        return tn.end;
    }

    /** Returns if there is any word in the trie that starts with the given prefix. */
    public boolean startsWith(String prefix) {
        int n = prefix.length();
        TrieNode tn = root;
        for(int i = 0; i < n; i++){
            if(tn == null) return false;
            int cur = prefix.charAt(i) - 'a';
            if(tn.children[cur] == null){
                return false;
            }
            else tn = tn.children[cur];
        }
        return true;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * boolean param_2 = obj.search(word);
 * boolean param_3 = obj.startsWith(prefix);
 */
```



# 오답

- function call 이 너무 많아서 아마 마지막 테스트 통과를 못한 듯.

```java
class Trie {

    /** Initialize your data structure here. */
    //[a,b,c,...z] => [f,f,f,...f]이렇게 초기화 해놓고, 들어오면 [t,]이렇게 매치?  => 그러면 초반에 메모리가 너무 많이 나가서 안될듯
    //trie안에 trie가 있게..재귀적으로
    //map을 두개 만들자. search 할때와 prefix 조사할 때의 map이 다르게 해야지 search 할 때 더 편할듯? 음.근데 그러면, 재귀하면서 계속 만들어져서.. 나는 하나만 만들고싶은데
    Map<Character,Trie> map;
    //   ArrayList<String> wordDict;
    boolean leaf=false;


    public Trie() {
        map= new HashMap<>();        
    }

    /** Inserts a word into the trie. */
    public void insert(String word) {
        //System.out.println(word.charAt(0));
        if(word==""){
            return;}
        //System.out.println(word);
        Trie tmp = map.get(word.charAt(0));

        if(tmp!=null){
            if(word.length()<2){
                leaf=true;
                return;
            }else{
                tmp.insert(word.substring(1));
            }
        }else{
            tmp= new Trie();
            map.put(word.charAt(0),tmp);

            if(word.length()>=2){
                tmp.insert(word.substring(1));
            }else{
                leaf=true;
                return;
            }

        }        
    }

    /** Returns if the word is in the trie. */
    public boolean search(String word) {
        if(word=="")return true;
        boolean res=false;
        if(word.length()==1){
            if(map.get(word.charAt(0))!=null && leaf){
                return true;
            }else{
                return false;
            }
        }else{
            if(map.get(word.charAt(0))==null)return false;
            Trie tmp = map.get(word.charAt(0));
            res = (map.get(word.charAt(0))!=null) && tmp.search(word.substring(1));
        }
        return res;
    }

    /** Returns if there is any word in the trie that starts with the given prefix. */
    public boolean startsWith(String prefix) {
        if(prefix=="")return true;
        boolean res=false;
        if(prefix.length()==1){
            if(map.get(prefix.charAt(0))!=null){
                res=true;
            }
        }else{
            Trie tmp = map.get(prefix.charAt(0));
            if(tmp==null)return false;
            res = (map.get(prefix.charAt(0))!=null) && tmp.startsWith(prefix.substring(1));

        }
        return res;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * boolean param_2 = obj.search(word);
 * boolean param_3 = obj.startsWith(prefix);
 */
```

