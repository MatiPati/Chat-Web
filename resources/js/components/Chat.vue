<template>
    <div id="chat-app">
        <div class="left-col">
            <div class="profile-box">
                <div class="text-center">
                    <i class='bx bx-id-card h1 mb-0'></i>
                    <p class="m-0" id="user_login">
                        LOGIN TBD
                    </p>
                    <a href="/"><i class='bx bx-home'></i></a>
                    <a href="/logout"><i class='bx bx-log-out'></i></a>
                </div>
            </div>
            <div id="room-list-box">

                <!-- Draw all rooms user is in -->
                <div class="card room-to-change" v-for="room in rooms" v-on:click="changeRoom(room)">
                    <a class="d-block change-room-name">{{room.name}}</a>
                    <p class="small room-creator">{{room.creator.login}}</p>
                </div>

            </div>
            <div class="new-room-box">
                <div class="card p-3">
                    <div class="form-group">
                        <input type="text" class="form-control" id="add-room-name" placeholder="Name of new room">
                    </div>
                    <button id="add-room" class="btn btn-primary">Create new room</button>
                    <p class="mb-0 badge badge-danger" id="roomCreateErrors"></p>
                </div>
            </div>
        </div>
        <div class="right-col">

            <div id="active-room" v-show="activeRoom.visible">
                <span id="active-room-id"></span>
                <div class="header">
                    <p id="active-room-name">{{activeRoom.name}}</p>
                    <p id="active-room-creator">{{activeRoom.creator.login}}</p>
                    <p id="active-room-users">
                        <span id="roomUsers">
                            <span v-for="user in activeRoom.users" class="badge badge-secondary small mr-1">{{user.user.login}}</span>
                        </span><span class="badge badge-success position-relative" id="addFormShow"
                                     style="bottom: -0.8px;">
                            <i class="bx bx-plus-circle" title="Add user to room"></i>
                        </span>
                    </p>
                    <div class="add-form d-none form-group d-none mt-2" id="roomAddForm">
                        <div class="d-flex">
                            <input type="text" id="roomAddInput" class="form-control m-0" placeholder="User login">
                            <button class="btn btn-sm btn-success" onclick="addUser($(this).prev().val())">Add new user
                                to room
                            </button>
                        </div>
                        <p class="mb-0 badge badge-danger" id="roomAddUserErrors"></p>
                    </div>
                </div>
                <div id="room-messages">
                    <div v-for="message in activeRoom.messages">
                        <p class="message-sender">
                            <span class="badge-primary badge">{{message.senderId.login}}</span>
                        </p>
                        <p class="message-body">{{message.message}}</p>
                    </div>
                </div>
                <div class="new-message d-flex">
                    <div class="form-group mb-0">
                        <input type="text" class="form-control" v-model="newMessage" v-on:keydown.enter="sendMessage">
                    </div>
                    <button class="btn btn-primary" v-on:click="sendMessage()">Send</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    export default {
        props: ['userId'],

        data() {
            return {
                newUserInput: false,
                rooms: [],
                activeRoom: {
                    visible: false,
                    name: '',
                    creator: {},
                    users: [],
                    messages: []
                },
                newMessage: ''
            }
        },

        // On site load and VUE created
        created() {
            // Get all rooms user is in
            this.getRooms();
        },

        methods: {
            getRooms() {
                fetch('http://azurix.pl:8080/rooms')
                    .then(res => res.json())
                    .then(data => {
                        this.rooms = data
                    });
                setTimeout(() => {
                    this.getRooms()
                }, 2000);
            },
            changeRoom(room) {
                // Change active room
                this.activeRoom = room;
                // Get active room users
                this.getActiveRoomUsers();
                // Get active room messages by API
                this.getActiveRoomMessages();
                // Set flag to show active room
                this.activeRoom.visible = true;
            },
            getActiveRoomUsers() {
                fetch('http://azurix.pl:8080/room/' + this.activeRoom.id + '/users')
                    .then(res => res.json())
                    .then(data => {
                        this.activeRoom.users = data
                    });
                setTimeout(() => {
                    this.getActiveRoomUsers(this.activeRoom)
                }, 2000);
            },
            getActiveRoomMessages() {
                fetch('http://azurix.pl:8080/room/' + this.activeRoom.id)
                    .then(res => res.json())
                    .then(data => {
                        this.activeRoom.messages = data.reverse()
                    });
                setTimeout(() => {
                    this.getActiveRoomMessages(this.activeRoom)
                }, 1000);
            },
            sendMessage() {
                fetch('http://azurix.pl:8080/room/' + this.activeRoom.id + '/message?senderId=' + this.userId + '&message=' + this.newMessage, {
                    method: 'POST'
                }).then(res => {
                    if (res.status === 200) {
                        console.log('Message sent!');
                        // Clear new message Var
                        this.newMessage = '';
                        // Synchronize messages
                        this.getActiveRoomMessages();
                    } else {
                        console.log('Message not sent!');
                    }
                });
            },
            createRoom(name) {
                fetch('http://azurix.pl:8080/room')
            }
        }
    }

</script>