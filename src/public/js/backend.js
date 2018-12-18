/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/backend.js":
/*!*********************************!*\
  !*** ./resources/js/backend.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var api_token = document.getElementById('token_id').innerText;
var user_id = document.getElementById('user_id').innerText;
var url = 'http://azurix.pl:8080/';
var active_room = false;
var active_messages = ['1', '2', '3'];
var local_rooms = [];
/*
* REST API get rooms function
*/

var getRooms = function getRooms() {
  fetch(url + 'rooms', {
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
* Renders roms on screen
*
* @param rooms = array of rooms to render
*/


var drawRooms = function drawRooms(rooms) {
  var html = '';
  rooms = rooms.reverse();
  rooms.forEach(function (room) {
    html += '<div class="card p-2 mb-1">' + '<button class="btn btn-outline-primary btn-sm d-block mb-2 change-room">' + room['name'] + '</button>' + '<span class="d-none">' + room['id'] + '</span>' + '<p class="m-0 small">maybe latter</p>' + '</div>';
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
/*
* Renders room messages on screen
*/


var drawMessages = function drawMessages(messages, newMessage, forceScroll) {
  var html = '';
  var messagesElement = document.querySelector('#room-messages');
  messages.forEach(function (message) {
    html += '<p><span>pisze:</span><br>' + message['message'] + '</p>';
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
};
/*
* Get room messages with REST API
*/


var getRoomMessages = function getRoomMessages(id, forcescroll) {
  fetch(url + 'room/' + id, {
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
}; // Needs initialization AFTER message input is rendered on screen


var initMessageSend = function initMessageSend() {
  var sendBtn = document.querySelector('#send-btn');
  sendBtn.addEventListener('click', function () {
    var message = document.querySelector('#new-message-input').value;

    if (message !== '') {
      document.querySelector('#new-message-input').value = '';
      sendMessage(message);
    }
  });
}; // Needs initialization AFTER rooms on screen are rendered


var initRoomChange = function initRoomChange() {
  var changeRoomBtn = document.querySelectorAll(".change-room");
  changeRoomBtn.forEach(function (button) {
    button.addEventListener('click', function () {
      var id = button.nextElementSibling.innerHTML;
      var name = button.innerHTML;
      var creator = button.nextElementSibling.nextElementSibling.innerHTML;
      console.log('Changing active room to room_id = ' + id);
      drawRoom(id, name, creator);
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

/***/ }),

/***/ 1:
/*!***************************************!*\
  !*** multi ./resources/js/backend.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\xampp_new\htdocs\Chat-Web\src\resources\js\backend.js */"./resources/js/backend.js");


/***/ })

/******/ });