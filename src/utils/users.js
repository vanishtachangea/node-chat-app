const users=[]
const addUser = ({id, userName, room})=>{
    //Clean the data
    userName = userName.trim().toLowerCase();
    room  = room.trim().toLowerCase();

    //validate the data
    if(!userName || !room)
    {
        return {
            error:'User Name and room are required!'
        }
    }
    //Check for existing User 
    const existingUser =users.find((user)=>{
        return user.room === room && user.userName ===userName
    })

    //validate username
    if(existingUser){
        return{
            error:"username is in use"
        }
    }
    //Store User
    const user ={id, userName, room}
    users.push(user)
    console.log("inside add user");
    console.log(user);
    return {user};
}

const removeUser =(id)=>{
    const index = users.findIndex((user)=>{
        return user.id ===id
    })
    if(index !==-1)
        return users.splice(index,1)[0];
}

const getUser=(id)=>{
    return users.find((user)=> user.id ===id)
}
const getUsersInRoom=(room)=>{
    return users.filter((user)=> user.room === room)
}

module.exports ={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    users
}
/*

addUser({
    id:22,
    userName:'John',
    room:"talk"
})

addUser({
    id:23,
    userName:'John3',
    room:"talk"
})

addUser({
    id:25,
    userName:'John3',
    room:"talk -room2"
})


 console.log(users);

const res = addUser({
    id:33, 
    userName:'John2',
    room:'talk'
})
console.log(res);
console.log(users);

const removedUser = removeUser(33);
console.log("After removing user")
console.log(removedUser);
console.log(users);
console.log("getUser")
const user = getUser(25);
console.log(user);
console.log("serss");
const list = getUsersInRoom("talk77");
console.log(list) 
*/