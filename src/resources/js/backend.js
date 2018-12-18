const api_token = document.getElementById('token_id').innerText;
const user_id = document.getElementById('user_id').innerText;
const url = 'http://azurix.pl:8080/';
let active_room = false;
let active_messages = [];
let local_rooms = [];

/*
* REST API get rooms function
*/
const getRooms = () => {
    fetch(url + 'rooms', {
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
* Renders roms on screen
*
* @param rooms = array of rooms to render
*/
const drawRooms = (rooms) => {
    let html = '';
    rooms = rooms.reverse();
    rooms.forEach((room) => {
        html += '<div class="card p-2 mb-1">' +
            '<button class="btn btn-outline-primary btn-sm d-block mb-2 change-room">' + room['name'] + '</button>' +
            '<span class="d-none">' + room['id'] + '</span>' +
            '<p class="m-0 small">maybe latter</p>' +
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
    roomElement.querySelector('#room-messages').innerHTML = 'here render messages';
    roomElement.querySelector('.new-message').classList.add('d-block'); //Draw `send message` input box
    getRoomMessages(id, true);
    initMessageSend();
};

/*
* Renders room messages on screen
*/
const drawMessages = (messages, scroll) => {
    let html = '';
    const messagesElement = document.querySelector('#room-messages');
    messages.forEach((message) => {
        html += '<p><span>pisze:</span><br>' + message['message'] + '</p>';
    });
    messagesElement.innerHTML = html;
    if (scroll) {
        messagesElement.scrollTop = messagesElement.scrollHeight;
    }
};

/*
* Get room messages with REST API
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
            console.log('error'); //TODO: handle that
        }
    });
};

/*
* Get room messages with REST API
*/
const getRoomMessages = (id, forcescroll) => {
    fetch(url + 'room/' + id, {
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
                    drawMessages(messages, true);
                    active_messages = messages;
                } else if (data[data.length-1]['message'] !== active_messages[active_messages.length-1]['message']) {
                    active_messages = messages;
                    drawMessages(messages, true);
                } else {
                    drawMessages(messages, false);
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
        } else {
            // TODO: handle errors...
            console.log('Not added!');
        }
    });
};

// Needs initialization AFTER message input is rendered on screen
const initMessageSend = () => {
    const sendBtn = document.querySelector('#send-btn');
    sendBtn.addEventListener('click', () => {
        const message = document.querySelector('#new-message-input').value;
        if(message !== ''){
            document.querySelector('#new-message-input').value = '';
            sendMessage(message);
        }
    });
};

// Needs initialization AFTER rooms on screen are rendered
const initRoomChange = () => {
    const changeRoomBtn = document.querySelectorAll(".change-room");

    changeRoomBtn.forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.nextElementSibling.innerHTML;
            const name = button.innerHTML;
            const creator = button.nextElementSibling.nextElementSibling.innerHTML;
            console.log('Changing active room to room_id = ' + id);
            drawRoom(id, name, creator);
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