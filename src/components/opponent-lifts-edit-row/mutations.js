export default {
    updateOpponentSquat (state, val) {
        state.opponents.forEach(op => {
            if(op.id == val.opponent.id) {
                op.squat = val.value;
            }
        });
    },
    updateOpponentBenchpress (state, val) {
        state.opponents.forEach(op => {
            if(op.id == val.opponent.id) {
                op.benchpress = val.value;
            }
        });   
    },
    updateOpponentDeadlift (state, val) {
        state.opponents.forEach(op => {
            if(op.id == val.opponent.id) {
                op.deadlift = val.value;
            }
        });
    }
};