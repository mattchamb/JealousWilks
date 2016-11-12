import Vue from 'vue'
import view from './view.html'
import wilks from '../../wilks.ts';

var name = 'opponent-row';
var component = {
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
            this.$store.commit('removeOpponent', this.opponent);
        }
    }
};

export { name, component };