import Vue from 'vue'
import store from './store';
import router from './router';

import './uikit/css/uikit.css'
import './uikit/js/uikit.js'

import './styles/util.css'
import './styles/transitions.css'

var componentNames = [
    require("./components/app"),
    require("./components/opponent-entry"),
    require("./components/my-stats-entry"),
    require("./components/opponent-row"),
    require("./components/opponent-lifts-edit-row"),
    require("./components/competition")
];

componentNames.forEach(n => {
    Vue.component(n.name, n.component);
});

const root = new Vue({
    el: "#app",
    router,
    store
});
