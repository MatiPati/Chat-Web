/*
* Renders user connected roms on screen
*
* @param rooms = array of rooms to render
*/
const drawRooms = (rooms) => {
    let html = '';
    rooms = rooms.reverse();
    rooms.forEach((room) => {
        html += '<div class="card p-2 mb-1">' +
            '<button class="btn btn-outline-primary btn-sm d-block mb-2 change-room text-left">' + room['room']['name'] + '</button>' +
            '<span class="d-none">' + room['room']['id'] + '</span>' +
            '<p class="m-0 small">by ' + room['room']['creator']['login'] + '</p>' +
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
        users.forEach( (user) => {
            usersHtml += '<span class="badge badge-secondary small">' + user['user']['login'] + '</span> ';
        });
    } else{
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
        if (message['senderId']['login'] !== lastSender) {
            html += '<p class="mb-0 mt-3 h5"><span class="badge-primary badge">' + message['senderId']['login'] + '</span></p>';
        }
        html += '<p class="mb-0 delete-p" oncontextmenu="deleteMessage(' + message['id'] + ');return false;">' + message['message'] + '</p>';
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
