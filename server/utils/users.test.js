const expect = require('expect');
const {Users} = require('./users');

describe('users class:', ()=>{
    var users ; // defining outside so that it will be available in each finctions below
    //run before each test case
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name: 'u1',
            room: 'node'
        },{
            id:'2',
            name: 'u2',
            room: 'java'
        },{
            id:'3',
            name: 'u3',
            room: 'node'
        }];  
    });

it('Should add new user', ()=>{
    var user ={
        id:'123',
        name: 'cd',
        room: 'node'
    };

    var users = new Users();
    var resultUsers = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([resultUsers]);
});

it('Should return names for node room', ()=>{

    var userList = users.getUsersList('node');
    expect(userList).toEqual(['u1','u3']);
});

it('Should return names for java room', ()=>{
    var userList = users.getUsersList('java');
    expect(userList).toEqual(['u2']);
});

it('Should remove a user', ()=>{
    var id ='2';
     var user = users.removeUser(id);
     expect(user.id).toBe(id);
     expect(users.users.length).toBe(2);
});

it('Should not remove a user', ()=>{
    var id ='200';
    var user = users.removeUser(id);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
});

it('Should  find a user', ()=>{
    var userId ='2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
});

it('Should not find a user', ()=>{
    var userId ='900';
    var user = users.getUser(userId);
    expect(user).toNotExist();// mean it is undefined
});

});