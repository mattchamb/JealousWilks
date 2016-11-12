import Vue from 'vue'
import view from './view.html'
import wilks from '../../wilks.ts';

var name = 'opponent-lifts-edit-row';
var component = {
    props: ["opponent"],
    template: view,
    data () {
        return {
        };
    },
    computed: {
        wilksCoeff () {
            var coeff = wilks.getCoefficient(this.opponent.gender, this.opponent.bodyweight | 0);
            return coeff.toFixed(2);
        },
        squat: {
            get () {
                return this.opponent.squat;
            },
            set (value) {
                this.$store.commit('updateOpponentSquat', {
                    opponent: this.opponent,
                    value
                });
            }
        },
        benchpress: {
            get () {
                return this.opponent.benchpress;
            },
            set (value) {
                this.$store.commit('updateOpponentBenchpress', {
                    opponent: this.opponent,
                    value
                });
            }
        },
        deadlift: {
            get () {
                return this.opponent.deadlift;
            },
            set (value) {
                this.$store.commit('updateOpponentDeadlift', {
                    opponent: this.opponent,
                    value
                });
            }
        }
    },
    methods: {
    }
};

export { name, component };