import Vue from 'vue';
import { mapState } from 'vuex';
import view from './view.html';
import {mutate} from '../../util';


var name = "my-stats-entry";
var component = {
    template: view,
    methods: {
    },
    computed: {
        name: mutate(state => state.myStats.name, "updateMyName"),
        gender: mutate(state => state.myStats.gender, "updateMyGender"),
        bodyweight: mutate(state => state.myStats.bodyweight, "updateMyBodyweight"),
        squat: mutate(state => state.myStats.squat, "updateMySquat"),
        benchpress: mutate(state => state.myStats.benchpress, "updateMyBenchpress"),
        deadlift: mutate(state => state.myStats.deadlift, "updateMyDeadlift"),
    }
};

export { name, component };
