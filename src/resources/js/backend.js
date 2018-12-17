const api_token = document.getElementById('token_id').innerText;
const user_id = document.getElementById('user_id').innerText;
const url = 'http://azurix.pl:8080/'; //TODO: CORS


const newRoom = (name) => {
    const data = {
        'api_token': api_token,
        'user_id': user_id,
        'name': name
    };
    fetch(url + 'room/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        console.log(res);
    });
}

const newRoomBtn = document.querySelector('#add-room');
newRoomBtn.addEventListener('click', () => {
    // Get input name of new room
    const name = document.querySelector('#add-room-name').value;
    // Call creating function with name
    newRoom(name);
})