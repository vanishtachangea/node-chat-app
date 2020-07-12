# Chat-Application

A real-time Chat Application

### User Stories

- User can log in to a Room by entering a UserName and Room Name
--If the room does not exist, a new room is created. Else, the user joins other users on the room. 
--If UserName already exists, the user will be prompted to enter a new UserName
- User enters Room and he can actually see all the users in the specific room on the sidebar. 
- User can send a message to all users in the specific room. This message is emitted to all the users in the room
- User can leave the room by closing the window. The user name no longer appears on the side bar user list


### Technical Design and Architecture
1. Use of Websocket for realtime update of information from Server to Client, using socket.io, which uses the Observer Design Pattern.

### How to run the app locally
```sh
npm run start
```

### How it works 
[live Site](https://vc-node-chat-app-heroku.herokuapp.com/)

### Live Version of Application


### Next Steps
1. Unit Testing
2. Frontend using React
3. Improve it to become a copy of Slack
5. Deploy to AWS instead of heroku




