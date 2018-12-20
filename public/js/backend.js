const api_token = document.getElementById('token_id').innerText;
const user_id = document.getElementById('user_id').innerText;
const url = 'http://azurix.pl:8080/';
let active_room = false;
let active_messages = ['1', '2', '3'];
let local_rooms = [];
let messagesCount = 20;

/*
* REST API get rooms function
*/
const getRooms = () => {
    fetch(url + 'user/' + user_id + '/rooms', {
        method: 'GET',
    }).then((res) => {
        res.json().then((data) => {
            if (local_rooms.length !== data.length) {
                local_rooms = data;
                console.log('Rooms refreshed and rendered!');
                drawRooms(data);
                initRoomChange();
            }
        });
    });
};

/*
* Send message with REST API
*
* @param message = string message
*/
const sendMessage = (message) => {
    const roomId = document.querySelector('#active-room-id').innerHTML;
    fetch(url + 'room/' + roomId + '/message?senderId=' + user_id + '&message=' + message, {
        method: 'POST',
        headers: {
            "Content-Type": "text/plain"
        },
    }).then((res) => {
        if (res.status === 200) {
            console.log('Message send!');
            getRoomMessages(roomId, true);
        } else {
            console.log('Message cannot be sent!'); //TODO: handle that
        }
    });
    messagesCount++;
};

/*
* Delete message with REST API
*
* @param message = string message
*/
const deleteMessage = (id) => {
    fetch(url + 'room/' + active_room + '?messageId=' + id, {
        method: 'DELETE'
    }).then((res) => {
        if (res.status === 200) {
            console.log('Message deleted!');
            getRoomMessages(active_room, true);
        } else {
            console.log('Message cannot be deleted!'); //TODO: handle that
        }
    });
    messagesCount++;
};

/*
* Get room users with REST API
*/
const getRoomUsers = (id) => {
    fetch(url + 'room/' + id + '/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        res.json().then((data) => {
            drawRoomUsers(data);
        });
    });
};

/*
* Add user to room with REST API
*/
const addUser = (userId) => {
    fetch(url + 'room/' + active_room + '/add/user?userId=' + userId, {
        method: 'POST'
    }).then((res) => {
        if (res.status === 200) {
            res.json().then((data) => {
                if (data === 200) {
                    console.log('User added!');
                    $('#roomAddForm').addClass('d-none');
                    $('#roomAddInput').val = '';
                }
            });
        } else if (res.status === 404) {
            document.querySelector('#roomAddUserErrors').innerHTML = 'This user already is in this room!';
            setInterval('document.querySelector(\'#roomAddUserErrors\').innerHTML = \'\';', 2000);
        }
    });
};

/*
* Get room messages with REST API
*/
const getRoomMessages = (id, forcescroll) => {
    fetch(url + 'room/' + id + '?count=' + messagesCount, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        res.json().then((data) => {
            let messages = data.reverse();
            if (messages.length === 0) {
                drawMessages(messages, true);
            } else {
                if (forcescroll) {
                    drawMessages(messages, true, true);
                    active_messages = messages;
                } else if (data[data.length - 1]['message'] !== active_messages[active_messages.length - 1]['message']) {
                    messagesCount++; //TODO: -/+ if deleted/added handle
                    getRoomMessages(id, forcescroll);
                    active_messages = messages;
                    drawMessages(messages, true);
                } else {
                    //drawMessages(messages, false);
                }
            }
        });
    });
    if (active_room === false) {
        setTimeout(refreshMessages, 1000);
    }
    active_room = id;
};
const refreshMessages = () => {
    getRoomMessages(active_room, false);
    getRoomUsers(active_room);
    setTimeout(refreshMessages, 1000);
};

/*
* Creating new room with REST API
*/
const newRoom = (name) => {
    fetch(url + 'room/new?creatorId=' + user_id + '&name=' + name, { //TODO: Patryk must change to `creatorId`
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        if (res.status === 200) { //200 api response = OK! (room created)
            console.log('Room added!'); // TODO: production delete it!
            getRooms();
        } else if (res.status === 404){
            // TODO: handle errors...
            document.querySelector('#roomCreateErrors').innerHTML = 'You got a room with that name!'
            setInterval('document.querySelector(\'#roomCreateErrors\').innerHTML = \'\';', 2000);
        }
    });
};
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

// Needs initialization AFTER message input is rendered on screen
const initMessageSend = () => {
    const sendBtn = document.querySelector('#send-btn');
    sendBtn.addEventListener('click', () => {
        const message = document.querySelector('#new-message-input').value;
        if(message !== ''){
            send();
        }
    });
    // Use enter to send
    document.addEventListener("keypress", function onEvent(event) {
        if (event.key === "Enter") {
            send();
        }
    });

    //Send function
    const send = () => {
        const message = document.querySelector('#new-message-input').value;
        if(message !== ''){
            document.querySelector('#new-message-input').value = '';
            sendMessage(message);
        }
    }
};

// Needs initialization AFTER rooms on screen are rendered
const initRoomChange = () => {
    const changeRoomBtn = document.querySelectorAll(".change-room");
    changeRoomBtn.forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.nextElementSibling.innerHTML;
            const name = button.innerHTML;
            const creator = button.nextElementSibling.nextElementSibling.innerHTML;
            messagesCount = 20;
            console.log('Changing active room to room_id = ' + id);
            getRoomUsers(id);
            drawRoom(id, name, creator);
            document.querySelector('#active-room').classList.remove('d-none');
        });
    });
};

// `Add new room` button initialization
const newRoomBtn = document.querySelector('#add-room');
newRoomBtn.addEventListener('click', () => {
    // Get input name of new room
    const name = document.querySelector('#add-room-name').value;
    document.querySelector('#add-room-name').value = '';
    // Call creating function with name
    newRoom(name); // Call REST API function
});



// Init functions
getRooms();
setInterval(getRooms, 1000);