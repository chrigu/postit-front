import Vue from 'vue'
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client'

export default ({ store }, inject) => {
  Vue.use(VueSocketio, socketio('http://localhost:4000'), store);
}
