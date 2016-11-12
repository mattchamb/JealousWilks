import Vue from 'vue';
import view from './view.html';
import wilks from '../../wilks.ts';
import ordinal from 'ordinal';
import {mutate} from '../../util';


import '../../uikit/css/components/accordion.css'
import '../../uikit/js/components/accordion.js'

var name = "competition";
var component = {
    template: view,
    methods: {
    },
    computed: {
        squat: mutate(state => state.myStats.squat, "updateMySquat"),
        benchpress: mutate(state => state.myStats.benchpress, "updateMyBenchpress"),
        deadlift: mutate(state => state.myStats.deadlift, "updateMyDeadlift"),
        bodyweight: function() {
            return this.$store.state.myStats.bodyweight || 0;
        },
        userTotal: function() {
            return (this.$store.state.myStats.benchpress || 0) 
                + (this.$store.state.myStats.squat || 0) 
                + (this.$store.state.myStats.deadlift || 0);
        },
        userWilks: function() {
            var userCoeff = wilks.getCoefficient(this.$store.state.myStats.gender, this.bodyweight | 0);
            return this.userTotal * userCoeff;
        },
        placements: function() {
            var placements = this.$store.state.opponents.map(function(opp) {
                var total = (opp.benchpress || 0) + (opp.squat || 0) + (opp.deadlift || 0);
                var coeff =  wilks.getCoefficient(opp.gender, opp.bodyweight);
                var oppWilks = total * coeff;
                var requiredTotal = this.userWilks <= oppWilks ? wilks.requiredLift(this.$store.state.myStats.gender, this.$store.state.myStats.bodyweight, oppWilks).toFixed(2) + "kg" : "";
                return {
                    isTheUser: false,
                    name: opp.name,
                    total: total,
                    wilks: oppWilks,
                    totalRequiredToMatch: requiredTotal
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
        },
        editableOpponents: function() {
            return this.$store.state.opponents.map(op => {
                return {
                    id: op.id,
                    bodyweight: op.bodyweight,                    
                    name: op.name,
                    gender: op.gender,
                    squat: op.squat,
                    benchpress: op.benchpress,
                    deadlift: op.deadlift
                }
            });
        }
    }
};

export { name, component };
