import Vue from 'vue';
import view from './view.html';
import c3 from 'c3';
import 'c3/c3.css';

var name = 'chart-test';
var component = {
    template: view,
    data () {
        return {
        };
    },
    computed: {
        chartData () {
            var user = this.$store.state.myStats;
            var data = {
                names: ['YOU'],
                squats: [user.squat],
                benchpresses: [user.benchpress],
                deadlifts: [user.deadlift]
            };
            var opponents = this.$store.state.opponents;
            opponents.forEach(opp => {
                data.names.push(opp.name);
                data.squats.push(opp.squat);
                data.benchpresses.push(opp.benchpress);
                data.deadlifts.push(opp.deadlift);
            });

            return [
                ['name', ... data.names],
                ['Squat', ... data.squats],
                ['Benchpress', ... data.benchpresses],
                ['Deadlift', ... data.deadlifts],
            ];
        }
    },
    watch: {
        chartData(newVal) {
            var chart = this.$data._chart; 
            if(!chart) return;
            chart.load({
                columns: newVal
            });
        }
    },
    mounted: function() {
        var data = this.chartData;
        this.$data._chart = c3.generate({
            bindto: '#asdf',
            data: {
                type: 'bar',
                x: 'name',
                columns: data,
                groups: [
                    //['Squat', 'Benchpress', 'Deadlift']
                ],
            },
            axis: {
                x: {
                    type: 'category' // this needed to load string x value
                },
                y: {
                    label: 'Weight (kg)'
                }
            }
        });
    }
};

export { name, component };