import Vue from 'vue'
import App from './App.vue'

const app = new Vue({
  render: h => h(App)
})

function init (ev) {
  document.removeEventListener(ev.type, init)
  app.$mount('#app')
  console.log('Hello.')
}

document.addEventListener('DOMContentLoaded', init, false)
