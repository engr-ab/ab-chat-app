
var isRealString = (string)=>{  
return typeof string === 'string' && string.trim().length >0 ;
};

var isUniqueUserName = (name,users)=>{
    var result =true;
if(users.length>0){ 
   users.forEach((user)=>{ 
       if(user.name.trim().toUpperCase()===name.trim().toUpperCase()){
         return result=false; 
       }
   });//foreach
   
}//if end
return result;
};

module.exports ={
    isRealString,
    isUniqueUserName
}