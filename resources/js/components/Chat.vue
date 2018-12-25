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

            <div id="active-room">
                <span id="active-room-id"></span>
                <div class="header">
                    <p id="active-room-name">{{activeRoom.name}}</p>
                    <p id="active-room-creator">{{activeRoom.creator.login}}</p>
                    <p id="active-room-users">
                        <span id="roomUsers">
                            <span v-for="user in activeRoom.users" class="badge badge-secondary small">{{user.user.login}}</span>
                        </span>
                        <span
                                class="badge badge-success position-relative"
                                id="addFormShow" style="bottom: -0.8px;"><i
                                class="bx bx-plus-circle" title="Add user to room"></i>
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
                <div id="room-messages"></div>
                <div class="new-message d-flex">
                    <div class="form-group mb-0">
                        <input type="text" id="new-message-input" class="form-control">
                    </div>
                    <button class="btn btn-primary" id="send-btn">Send</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                rooms: [],
                activeRoom: {
                    name: '',
                    creator: {},
                    users: [],
                    messages: []
                }
            }
        },

        created() {
            // Get all rooms user is in
            this.getRooms();
            setInterval(() => {
                this.getRooms()
            }, 1000);
        },

        methods: {
            getRooms() {
                fetch('http://azurix.pl:8080/rooms')
                    .then(res => res.json())
                    .then(data => {
                        this.rooms = data
                    });
            },
            changeRoom(room) {
                // Change active room
                this.activeRoom = room;
                // Get active room users
                this.getActiveRoomUsers();
                // Get active room messages by API
                this.getActiveRoomMessages();
            },
            getActiveRoomUsers() {

                fetch('http://azurix.pl:8080/room/' + this.activeRoom.id + '/users')
                    .then(res => res.json())
                    .then(data => {
                        this.activeRoom.users = data
                    });
                setTimeout(() => {
                    this.getActiveRoomUsers(this.activeRoom)
                }, 1000);
            },
            getActiveRoomMessages() {
                fetch('http://azurix.pl:8080/room/' + this.activeRoom.id)
                    .then(res => res.json())
                    .then(data => {
                        this.activeRoom.messages = data
                    });
                setTimeout(() => {
                    this.getActiveRoomMessages(this.activeRoom)
                }, 1000);
            },
            createRoom(name) {
                fetch('http://azurix.pl:8080/room')
            }
        }
    }

</script>