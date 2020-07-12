const generateMessage = (userName,text) => {
    return {
        userName,
        text: text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (userName, url) => {
    return {
        userName,
        url: url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage, generateLocationMessage
}