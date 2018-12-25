<template>
    <div>
        <h2>Porting to VUE!</h2>
        <div class="card p-3">
            <h4>
                All rooms list
            </h4>
            <div v-for="room in rooms" class="card" v-bind:id="room.id">
                <div class="card-header">
                    <h5 v-on:click="changeRoom(room.id)">{{room.name}}</h5>
                </div>
                <div class="card-body p-2">
                    <p>
                        Creator: {{room.creator.login}}
                    </p>
                </div>
            </div>
        </div>
        <div class="card mt-5">
            <div v-for="(message, i) in activeRoom.messages" class="mb-2">
                <p v-if="i == 0|| activeRoom.messages[i].senderId.id !== activeRoom.messages[i - 1].senderId.id"
                   class="badge badge-danger d-block">
                    {{message.senderId.login}}
                </p>
                <span>{{message.message}}</span>
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
                    messages: []
                }
            }
        },

        created() {
            this.getRooms();
        },

        methods: {
            getRooms() {
                fetch('http://azurix.pl:8080/rooms')
                    .then(res => res.json())
                    .then(data => {
                        this.rooms = data
                    });
            },
            changeRoom(id) {
                fetch('http://azurix.pl:8080/room/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.activeRoom.messages = data
                    });
            }
        }
    }

</script>