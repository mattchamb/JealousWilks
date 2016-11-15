import Vue from 'vue';
import view from './view.html';
import wilks from '../../wilks.ts';
import c3 from 'c3';
import 'c3/c3.css';

var name = "calculators";
var component = {
    template: view,
    data () {
        return {
            gender: 'male',
            total: 100
        };
    },
    computed: {
        chartData () {
            var wilksData = ['wilks'];
            var bwData = ['bw'];

            for(var bw = 30; bw <= 250; bw++) {
                var coeff = wilks.getCoefficient(this.gender, bw);
                bwData.push(bw);
                wilksData.push(this.total * coeff);
            }
            return [bwData, wilksData];
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
            bindto: '#chart',
            data: {
                type: 'spline',
                x: 'bw',
                columns: data,
            },
            axis: {
                x: {
                    label: 'Bodyweight'
                },
                y: {
                    label: 'Wilks'
                }
            },
            legend: {
                show: false
            },
            point: {
                show: false
            }
        });
    }
};

export { name, component };
