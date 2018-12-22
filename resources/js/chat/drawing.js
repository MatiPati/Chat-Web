/*
* Renders user connected roms on screen
*
* @param rooms = array of rooms to render
*/
const drawRooms = (rooms) => {
    let html = '';
    rooms = rooms.reverse();
    rooms.forEach((room) => {
        html += '<div class="card room-to-change">' +
            '<a class="d-block change-room-name">' + room['room']['name'] + '</a>' +
            '<span class="room-id">' + room['room']['id'] + '</span>' +
            '<p class="small room-creator">by ' + room['room']['creator']['login'] + '</p>' +
            '</div>';
    });
    document.querySelector('#room-list-box').innerHTML = html;
};

/*
* Renders active room on screen
*
* @param rooms = array of rooms to render
*/
const drawRoom = (id, name, creator) => {
    const roomElement = document.querySelector('#active-room');
    roomElement.querySelector('#active-room-id').innerHTML = id; //TODO: maybe delete later
    roomElement.querySelector('#active-room-name').innerHTML = name; //Render room name
    roomElement.querySelector('#active-room-creator').innerHTML = creator; //Render room creator
    roomElement.querySelector('#room-messages').innerHTML = 'Loading messages...';
    roomElement.querySelector('.new-message').classList.add('d-block'); //Draw `send message` input box
    getRoomMessages(id, true);
    initMessageSend();
};

/*
* Renders room users from active room on screen
*/
const drawRoomUsers = (users) => {
    let usersHtml = '';
    if (Array.isArray(users)) {
        users.forEach((user) => {
            usersHtml += '<span class="badge badge-secondary small">' + user['user']['login'] + '</span> ';
        });
    } else {
        usersHtml = '<span>Nie ma żadnych gości!</span>';
    }
    document.querySelector('#roomUsers').innerHTML = usersHtml;
};

/*
* Renders active room messages on screen
*/
const drawMessages = (messages, newMessage, forceScroll) => {
    let html = '';
    const messagesElement = document.querySelector('#room-messages');
    let lastSender = '';
    messages.forEach((message) => {
        //Every message drawing
        if (message['senderId']['login'] === user_login) {
            if (message['senderId']['login'] !== lastSender) {
                html += '<p class="message-sender me"><span class="badge-primary badge"><i class=\'bx bx-id-card\'></i> ' + message['senderId']['login'] + '</span></p>';
            }
            html += '<p class="message-body me delete-p" oncontextmenu="deleteMessage(' + message['id'] + ');return false;">' + message['message'] + '</p>';
        } else{
            if (message['senderId']['login'] !== lastSender) {
                html += '<p class="message-sender"><span class="badge-primary badge">' + message['senderId']['login'] + '</span></p>';
            }
            html += '<p class="message-body delete-p" oncontextmenu="deleteMessage(' + message['id'] + ');return false;">' + message['message'] + '</p>';
        }
        lastSender = message['senderId']['login'];
    });
    messagesElement.innerHTML = html;
    if (newMessage) {
        if (forceScroll) {
            messagesElement.scrollTop = messagesElement.scrollHeight;
        } else {
            const fromBottom = document.querySelector('#room-messages').scrollHeight - (document.querySelector('#room-messages').scrollHeight - document.querySelector('#room-messages').scrollTop);
            console.log(fromBottom);
            if (fromBottom > 110) { // Don't scroll if user scrolled up enough
                messagesElement.scrollTop = messagesElement.scrollHeight;
            } else {
                console.log('You got new message down there!'); //TODO: front end event handle
            }
        }
    }
};
