import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

export default function({ store }) {
Vue.use(new VueSocketIO({
    debug: false,
    connection: 'https://safe-shelf-95823.herokuapp.com/', // localhost был. точка входа для сокетов
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}))
}