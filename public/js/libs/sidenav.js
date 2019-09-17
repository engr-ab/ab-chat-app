
// function openNav() {
//   document.getElementById("sidenavDiv").style.width = "250px";
// }

function closeNav() {
  document.getElementById("sidenavDiv").style.width = "0";
}
$('#sidenavBtn').on('click',function(){
  
    var width = document.getElementById("sidenavDiv").style.width;
    if(width=="200px"){
      document.getElementById("sidenavDiv").style.width = "0px";
    }else{
      document.getElementById("sidenavDiv").style.width = "200px";
    } 
});
