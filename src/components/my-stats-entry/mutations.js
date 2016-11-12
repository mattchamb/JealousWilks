export default {
    updateMyName (state, val) {
        state.myStats.name = val;
    },
    updateMyGender (state, val) {
        state.myStats.gender = val;
    },
    updateMyBodyweight (state, val) {
        state.myStats.bodyweight = val;
    },
    updateMySquat (state, val) {
        state.myStats.squat = val;
    },
    updateMyBenchpress (state, val) {
        state.myStats.benchpress = val;
    },
    updateMyDeadlift (state, val) {
        state.myStats.deadlift = val;
    }
};