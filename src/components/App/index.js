import Vue from 'vue'
import view from './view.html'

Vue.component('app', {
  template: view,
  data () {
      return {
          a: 123
      };
  }
})