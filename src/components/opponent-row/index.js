import Vue from 'vue'
import view from './view.html'

import wilks from '../../wilks.ts';

var id = 0;

Vue.component('opponent-row', {
    props: ["opponent"],
    template: view,
    data () {
        return {
        };
    },
    computed: {
        totalWilksScore: function() {
            var coeff = wilks.getCoefficient(this.opponent.gender, this.opponent.bodyweight);
            return this.totalWeight * coeff;
        },
        totalWeight: function() {
            return (this.opponent.benchpress || 0) + (this.opponent.squat || 0) + (this.opponent.deadlift || 0);
        }
    },
    methods: {
        removeOpponent: function() {
            this.$emit('removed', this.opponent);
        }
    }
})