//addUser(id, name,room); return user
//removeUser(id)  return user
//getUser(id) return user
//getUserList(room)return array of users

class Users{
    
constructor(){
    this.users = [];
}
 addUser(id, name, room){
    var user = {id,name,room};
    this.users.push(user);
    return user
}

removeUser(id){
    //return user
    var user = this.getUser(id);
    if(user){
        this.users = this.users.filter((user)=>user.id!==id);
    }
    return user;
}

getUser(id){
    //return user
    return this.users.filter((user)=> user.id===id )[0];
}

getUsersList(room){
    //return array 
    var users = this.users.filter((user)=>user.room===room);
    var namesArray = users.map((user)=>user.name);

    return namesArray;
}


}//class end

module.exports = {
    Users
}