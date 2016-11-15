var someId = 9999;

var asdf = {
    addOpponent: function (state, val) {
        while(state.opponents.find(op => op.id == someId))
            someId++;
        var newOpponent = {
            id: val.id | someId++,
            name: !!val.name ? val.name : "{Not Found}",
            gender: !!val.gender ? val.gender : "female",
            bodyweight: val.bodyweight | 0,
            squat: val.squat | null,
            benchpress: val.benchpress | null,
            deadlift: val.deadlift | null
        };
        state.opponents.push(newOpponent);
    },
    removeOpponent: function (state, val) {
        var idx = state.opponents.indexOf(val)
        state.opponents.splice(idx, 1);
    },
    clearOpponents: function (state) {
        state.opponents = [];
    }
};

export default asdf;