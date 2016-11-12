import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

var mutations = {};

var componentMutations = [
    require("./components/my-stats-entry/mutations"),
    require("./components/opponent-entry/mutations"),
    require("./components/opponent-lifts-edit-row/mutations"),
];

componentMutations.forEach(x => {
    Object.assign(mutations, x.default);
});

function getInitialState() {
    var savedState = localStorage.getItem("state");
    if(savedState) {
        return JSON.parse(savedState);
    }
    return {
        myStats: {
            name: null,
            gender: 'male',
            bodyweight: null,
            squat: null,
            benchpress: null,
            deadlift: null,
        },
        opponents: []
    };
}

const store = new Vuex.Store({
    state: getInitialState(),
    mutations: mutations,
    strict: process.env.NODE_ENV !== 'production'
});

store.subscribe((mutation, state) => {
    var data = JSON.stringify(state);
    localStorage.setItem("state", data);
});

export default store;