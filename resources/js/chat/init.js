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