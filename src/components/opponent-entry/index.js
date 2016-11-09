import Vue from 'vue'
import view from './view.html'

import wilks from '../../wilks.ts';

var id = 0;

Vue.component('opponent-entry', {
    template: view,
    data () {
        return {
            name: null,
            gender: 'male',
            bodyweight: null
        };
    },
    computed: {
        bodyweightInvalid: function() {
            return this.bodyweight === null 
            || this.bodyweight <= 0;
        },
        formInvalid: function() {
            return this.bodyweightInvalid;
        }
    },
    methods: {
        addOpponent: function() {
            if(this.bodyweightInvalid)
                return;
            var currentId = id++;
            this.$emit('addopponent', {
                id: currentId,
                name: this.name || 'Opponent ' + currentId,
                gender: this.gender,
                bodyweight: this.bodyweight,
                squat: null,
                benchpress: null,
                deadlift: null
            });

            this.name = "";
            this.bodyweight = null;
        }
    }
})