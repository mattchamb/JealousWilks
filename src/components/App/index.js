import Vue from 'vue';
import view from './view.html';
import './styles.css';
import wilks from '../../wilks.ts';
import ordinal from 'ordinal';


var name = "app";
var component = {
    template: view,
    data () {
        return {
            gender: 'male',
            bodyweight: null,
            squat: null,
            benchpress: null,
            deadlift: null,
            opponents: []
      };
    },
    methods: {
        addOpponent: function(data) {
            this.opponents.push(data);
        },
        removeOpponent: function(opponent) {
            var index = this.opponents.indexOf(opponent);
            this.opponents.splice(index, 1);
        },
        importOpponents: function(opponents) {
            for(var i = 0; i < opponents.length; i++) {
                this.opponents.push(opponents[i]);
            }
        }
    },
    computed: {
        userTotal: function() {
            return (this.benchpress || 0) + (this.squat || 0) + (this.deadlift || 0);
        },
        userWilks: function() {
            var userCoeff = wilks.getCoefficient(this.gender, this.bodyweight | 0);
            return this.userTotal * userCoeff;
        },
        placements: function() {
            var placements = this.opponents.map(function(opp) {
                var total = (opp.benchpress || 0) + (opp.squat || 0) + (opp.deadlift || 0);
                var coeff =  wilks.getCoefficient(opp.gender, opp.bodyweight);
                var oppWilks = total * coeff;
                return {
                    isTheUser: false,
                    name: opp.name,
                    total: total,
                    wilks: oppWilks,
                    totalRequiredToMatch: this.userWilks <= oppWilks ? wilks.requiredLift(this.gender, this.bodyweight, oppWilks).toFixed(2) : total.toFixed(2)
                };
            }.bind(this)).concat({
                isTheUser: true,
                name: "YOU",
                total: this.userTotal,
                wilks: this.userWilks,
                totalRequiredToMatch: ''
            });
            placements.sort(function(a, b) {
                return b.wilks - a.wilks;
            });
            for(var i = 0; i < placements.length; i++) {
                placements[i].place = ordinal.english(i + 1);
            }
            return placements;
        }
    }
};

export { name, component };
