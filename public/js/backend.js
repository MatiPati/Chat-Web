"use strict";

var api_token = document.getElementById('token_id').innerText;
var user_id = document.getElementById('user_id').innerText;
var url = 'http://azurix.pl:8080/';
var active_room = false;
var active_messages = ['1', '2', '3'];
var local_rooms = [];
var messagesCount = 20;
/*
* REST API get rooms function
*/

var getRooms = function getRooms() {
  fetch(url + 'user/' + user_id + '/rooms', {
    method: 'GET'
  }).then(function (res) {
    res.json().then(function (data) {
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


var sendMessage = function sendMessage(message) {
  var roomId = document.querySelector('#active-room-id').innerHTML;
  fetch(url + 'room/' + roomId + '/message?senderId=' + user_id + '&message=' + message, {
    method: 'POST',
    headers: {
      "Content-Type": "text/plain"
    }
  }).then(function (res) {
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


var getRoomUsers = function getRoomUsers(id) {
  fetch(url + 'room/' + id + '/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    res.json().then(function (data) {
      drawRoomUsers(data);
    });
  });
};
/*
* Add user to room with REST API
*/


var addUser = function addUser(userId) {
  fetch(url + 'room/' + active_room + '/add/user?userId=' + userId, {
    method: 'POST'
  }).then(function (res) {
    res.json().then(function (data) {
      if (data == 200) {
        console.log('User added!');
        $('#roomAddForm').addClass('d-none');
        $('#roomAddInput').val = '';
      }
    });
  });
};
/*
* Get room messages with REST API
*/


var getRoomMessages = function getRoomMessages(id, forcescroll) {
  fetch(url + 'room/' + id + '?count=' + messagesCount, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    res.json().then(function (data) {
      var messages = data.reverse();

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

var refreshMessages = function refreshMessages() {
  getRoomMessages(active_room, false);
  getRoomUsers(active_room);
  setTimeout(refreshMessages, 1000);
};
/*
* Creating new room with REST API
*/


var newRoom = function newRoom(name) {
  fetch(url + 'room/new?creatorId=' + user_id + '&name=' + name, {
    //TODO: Patryk must change to `creatorId`
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    if (res.status === 200) {
      //200 api response = OK! (room created)
      console.log('Room added!'); // TODO: production delete it!

      getRooms();
    } else {
      // TODO: handle errors...
      console.log('Not added!');
    }
  });
};
/*
* Renders roms on screen
*
* @param rooms = array of rooms to render
*/


var drawRooms = function drawRooms(rooms) {
  var html = '';
  rooms = rooms.reverse();
  rooms.forEach(function (room) {
    html += '<div class="card p-2 mb-1">' + '<button class="btn btn-outline-primary btn-sm d-block mb-2 change-room text-left">' + room['room']['name'] + '</button>' + '<span class="d-none">' + room['room']['id'] + '</span>' + '<p class="m-0 small">by ' + room['room']['creator']['login'] + '</p>' + '</div>';
  });
  document.querySelector('#room-list-box').innerHTML = html;
};
/*
* Renders active room on screen
*
* @param rooms = array of rooms to render
*/


var drawRoom = function drawRoom(id, name, creator) {
  var roomElement = document.querySelector('#active-room');
  roomElement.querySelector('#active-room-id').innerHTML = id; //TODO: maybe delete later

  roomElement.querySelector('#active-room-name').innerHTML = name; //Render room name

  roomElement.querySelector('#active-room-creator').innerHTML = creator; //Render room creator

  roomElement.querySelector('#room-messages').innerHTML = 'here render messages';
  roomElement.querySelector('.new-message').classList.add('d-block'); //Draw `send message` input box

  getRoomMessages(id, true);
  initMessageSend();
};

var drawRoomUsers = function drawRoomUsers(users) {
  var usersHtml = '';

  if (Array.isArray(users)) {
    users.forEach(function (user) {
      usersHtml += '<span class="badge badge-secondary small">' + user['user']['login'] + '</span> ';
    });
  } else {
    usersHtml = '<span>Nie ma żadnych gości!</span>';
  }

  document.querySelector('#roomUsers').innerHTML = usersHtml;
};
/*
* Renders room messages on screen
*/


var drawMessages = function drawMessages(messages, newMessage, forceScroll) {
  var html = '';
  var messagesElement = document.querySelector('#room-messages');
  var lastSender = '';
  messages.forEach(function (message) {
    if (message['senderId']['login'] != lastSender) {
      html += '<p class="mb-0 mt-3 h5"><span class="badge-primary badge">' + message['senderId']['login'] + '</span></p>';
    }

    html += '<p class="mb-0">' + message['message'] + '</p>';
    lastSender = message['senderId']['login'];
  });
  messagesElement.innerHTML = html;

  if (newMessage) {
    if (forceScroll) {
      messagesElement.scrollTop = messagesElement.scrollHeight;
    } else {
      var fromBottom = document.querySelector('#room-messages').scrollHeight - (document.querySelector('#room-messages').scrollHeight - document.querySelector('#room-messages').scrollTop);
      console.log(fromBottom);

      if (fromBottom > 110) {
        // Don't scroll if user scrolled up enough
        messagesElement.scrollTop = messagesElement.scrollHeight;
      } else {
        console.log('You got new message down there!'); //TODO: front end event handle
      }
    }
  }
}; // Needs initialization AFTER message input is rendered on screen


var initMessageSend = function initMessageSend() {
  var sendBtn = document.querySelector('#send-btn');
  sendBtn.addEventListener('click', function () {
    var message = document.querySelector('#new-message-input').value;

    if (message !== '') {
      send();
    }
  }); // Use enter to send

  document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
      send();
    }
  }); //Send function

  var send = function send() {
    var message = document.querySelector('#new-message-input').value;

    if (message !== '') {
      document.querySelector('#new-message-input').value = '';
      sendMessage(message);
    }
  };
}; // Needs initialization AFTER rooms on screen are rendered


var initRoomChange = function initRoomChange() {
  var changeRoomBtn = document.querySelectorAll(".change-room");
  changeRoomBtn.forEach(function (button) {
    button.addEventListener('click', function () {
      var id = button.nextElementSibling.innerHTML;
      var name = button.innerHTML;
      var creator = button.nextElementSibling.nextElementSibling.innerHTML;
      messagesCount = 20;
      console.log('Changing active room to room_id = ' + id);
      getRoomUsers(id);
      drawRoom(id, name, creator);
      document.querySelector('#active-room').classList.remove('d-none');
    });
  });
}; // `Add new room` button initialization


var newRoomBtn = document.querySelector('#add-room');
newRoomBtn.addEventListener('click', function () {
  // Get input name of new room
  var name = document.querySelector('#add-room-name').value;
  document.querySelector('#add-room-name').value = ''; // Call creating function with name

  newRoom(name); // Call REST API function
}); // Init functions

getRooms();
setInterval(getRooms, 1000);
