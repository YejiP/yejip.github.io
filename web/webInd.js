window.addEventListener('DOMContentLoaded', function(){
  document.getElementById("subject").innerHTML="&nbsp;&nbsp;&nbsp;ALL";
  jsMain(); });

    window.addEventListener('pageshow', function(event) {
      document.getElementById("subject").innerHTML="&nbsp;&nbsp;&nbsp;ALL";
      jsMain();
    });



function jsMain(){
document.getElementById("html").style.display="block";
document.getElementById("js").style.display="block";
document.getElementById("java").style.display="block";
document.getElementById("db").style.display="block";
document.getElementById("subject").innerHTML="&nbsp;&nbsp;&nbsp;ALL";
var checked = document.getElementsByClassName("title")
for( var j =0;j<checked.length; j++){
checked[j].onmouseover= function(){
if(this.innerHTML=="ALL"){
document.getElementById("html").style.display="block";
document.getElementById("js").style.display="block";
document.getElementById("java").style.display="block";
document.getElementById("db").style.display="block";
document.getElementById("subject").innerHTML="&nbsp;&nbsp;&nbsp;ALL";

}
if(this.innerHTML=="JAVASCRIPT"){
document.getElementById("java").style.display="none";
document.getElementById("html").style.display="none";
document.getElementById("db").style.display="none";
document.getElementById("js").style.display="block";
document.getElementById("subject").innerHTML="&nbsp;&nbsp;&nbsp;JAVASCRIPT";
}
if(this.innerHTML=="JAVA"){
document.getElementById("java").style.display="block";
document.getElementById("html").style.display="none";
document.getElementById("db").style.display="none";
document.getElementById("js").style.display="none";
document.getElementById("subject").innerHTML="&nbsp;&nbsp;&nbsp;JAVA";
}
if(this.innerHTML=="DB"){
document.getElementById("java").style.display="none";
document.getElementById("html").style.display="none";
document.getElementById("db").style.display="block";
document.getElementById("js").style.display="none";
document.getElementById("subject").innerHTML="&nbsp;&nbsp;&nbsp;DB";
}
if(this.innerHTML=="HTML&amp;CSS"){
document.getElementById("java").style.display="none";
document.getElementById("html").style.display="block";
document.getElementById("db").style.display="none";
document.getElementById("js").style.display="none";
document.getElementById("subject").innerHTML="&nbsp;&nbsp;&nbsp;HTML&CSS";}
}
}
}
