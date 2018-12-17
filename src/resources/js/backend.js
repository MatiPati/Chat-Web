const api_token = document.getElementById('token_id').innerText;
const user_id = document.getElementById('user_id').innerText;
const url = 'http://azurix.pl:8080/'; //TODO: CORS
var local_rooms = [];

const getRooms = () => {
    fetch(url + 'rooms', {
        method: 'GET',
    }).then((res) => {
        res.json().then((data) => {
            if (local_rooms.length !== data.length) {
                local_rooms = data;
                console.log('Rooms refreshed!');
                drawRooms(data);
            }
        });
    });
}

const drawRooms = (rooms) => {
    var html = '';
    rooms = rooms.reverse();
    rooms.forEach((room) => {
        html += '<div class="card p-2 mb-1">' +
            '<button class="btn btn-outline-primary btn-sm d-block mb-2">' + room['name'] + '</button>' +
            '<p class="m-0 small">by ' + room['creatorId'] + '</p>' +
            '</div>'
    });
    document.querySelector('#room-list-box').innerHTML = html;
}

const newRoom = (name) => {
    const data = {
        'creatorId': user_id,
        'name': name
    };
    fetch(url + 'room/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        if (res.status == 200) {
            console.log('Room added!'); // TODO: production delete it!
            getRooms();
        } else {
            console.log('Not added!');
        }
    });
}

const newRoomBtn = document.querySelector('#add-room');
newRoomBtn.addEventListener('click', () => {
    // Get input name of new room
    const name = document.querySelector('#add-room-name').value;
    document.querySelector('#add-room-name').value = '';
    // Call creating function with name
    newRoom(name);
})


// Init functions
getRooms();
setInterval(getRooms, 1000);