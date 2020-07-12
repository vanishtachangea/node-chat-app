const {addUser,users} = require('../src/utils/users')

test('Should Add item to list Array',()=>{
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

     expect(users).toEqual([ { id: 22, userName: 'john', room: 'talk' },
    { id: 23, userName: 'john3', room: 'talk' },
    { id: 25, userName: 'john3', room: 'talk -room2' } ]); 
   // expect(users).toEqual([ { id: 22, userName: 'john', room: 'talk' }]);
})
