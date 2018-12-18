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
var url = 'http://azurix.pl:8080/'; //TODO: CORS

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
    html += '<div class="card p-2 mb-1">' + '<button class="btn btn-outline-primary btn-sm d-block mb-2 change-room">' + room['name'] + '</button>' + '<span class="d-none">' + room['id'] + '</span>' + '<p class="m-0 small">by ' + room['creatorId'] + '</p>' + '</div>';
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

  initMessageSend();
};
/*
* Get room messages with REST API
*
* @param message = string message
*/


var sendMessage = function sendMessage(message) {
  var roomId = document.querySelector('#active-room-id').innerHTML;
  var data = {
    'sender_id': user_id,
    //TODO: update when Patryk gives newer version...
    'message': message
  };
  fetch(url + 'room/' + roomId + '/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (res) {
    if (res.status === 200) {
      console.log('Send!');
    } else {
      console.log('error'); //TODO: handle that
    }
  });
};
/*
* Get room messages with REST API
*/


var getRoomMessages = function getRoomMessages(id, ammount) {} //TODO

/*
* Creating new room with REST API
*/
;

var newRoom = function newRoom(name) {
  var data = {
    'creatorId': user_id,
    'name': name
  };
  fetch(url + 'room/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
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
    sendMessage(message);
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