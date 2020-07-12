const socket = io()

const $BtnSendLocation = document.querySelector('#send-location');
const $messages =document.querySelector('#divMessages');


//Templates
const messageTemplate =document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

//options
const {userName, room }=Qs.parse(location.search,{ignoreQueryPrefix:true});

const autoscroll = ()=>{
    //New Message Element
    const $newMessage = $messages.lastElementChild;

    //Get the height of the new message
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight+newMessageMargin;

    //Visible Height
    const visibleHeight =$messages.offsetHeight;

    //Height of messages container
    const containerHeight = $messages.scrollHeight;

    //How far have I scrolled 
    const scrollOffset = $messages.scrollTop+visibleHeight;
    if(containerHeight - newMessageHeight <= scrollOffset){
        $messages.scrollTop = $messages.scrollHeight
    }

    //console.log(newMessageHeight);
    //console.log(newMessageStyles);
}

socket.on('message', (message)=>{
        const html = Mustache.render(messageTemplate,{
            userName:message.userName,
            message: message.text,
            createdAt: moment(message.createdAt).format('h:mm a')
        });
        $messages.insertAdjacentHTML('beforeend',html);
        autoscroll();
    
})
socket.on('locationMessageFromServer',(url)=>{
    const html2 = Mustache.render(locationTemplate,{
        userName:url.userName,
        url: url.url,
        createdAt : moment(url.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend',html2);
})
socket.on('roomData',({room,users})=>{
    console.log(room);
    console.log(users);
    const html = Mustache.render(sidebarTemplate,{
        room:room,
        users:users
    })
    document.querySelector('#sidebar').innerHTML=html;
}
)

document.querySelector('#frmMessage').addEventListener('submit',(e)=>{
    e.preventDefault();
    //const message = document.querySelector('input').value;
    const message = e.target.elements.textMessage.value;
    
    socket.emit("sendMessage",message,(error)=>{
        if(error)
        {
            return console.log(error);
        }
        console.log("The message was delivered");
    });
})

$BtnSendLocation.addEventListener('click',()=>{
    if(!navigator.geolocation)
    return alert("Geolocation is not supported by your browser");

    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        $BtnSendLocation.setAttribute('disabled','disabled');
        socket.emit('sendLocation',{
                "latitude":position.coords.latitude,
                "longitude":position.coords.longitude

        },()=>{
            $BtnSendLocation.removeAttribute('disabled');
            console.log("client shared location successfully");
        }) 
        
    
})
    
})

socket.emit('join', {userName, room}, (error)=>{
    if(error)
    {
        console.log(error);
        alert(error);
        location.href="/"
    }
    
})