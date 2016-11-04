import Vue from 'vue'
import view from './view.html'

import wilks from '../../wilks.ts';



Vue.component('app', {
  template: view,
  data () {
      return {
          a: 123
      };
  }
})