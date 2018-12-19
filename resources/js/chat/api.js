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
    messagesCount++;
};

/*
* Get room users with REST API
*/
const getRoomUsers = (id) => {
    fetch(url + 'room/' + id + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        res.json().then((data) => {
            drawRoomUsers(data);
        });
    });
}

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
                } else if (data[data.length-1]['message'] !== active_messages[active_messages.length-1]['message']) {
                    messagesCount++; //TODO: -/+ if deleted/added handle
                    getRoomMessages(id, forcescroll);
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