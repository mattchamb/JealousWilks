import Vue from 'vue';
import view from './view.html';

import wilks from '../../wilks.ts';
import papa from 'papaparse';

import {mutate} from '../../util';

var opponentId = 0;

var csvExamples = [
    {
        name: "Example One",
        contents: "name,gender,bodyweight,squat,benchpress,deadlift\nPerson One,female,65.3,120,60,150\nPerson Two,male,95,200,140,250"
    }
];

var name = "opponent-entry";
var component = {
    template: view,
    data () {
        return {
            name: null,
            gender: 'male',
            bodyweight: null,
            csvExamples
        };
    },
    computed: {
        bodyweightInvalid: function() {
            return this.bodyweight === null 
            || this.bodyweight <= 0;
        },
        formInvalid: function() {
            return this.bodyweightInvalid;
        },
        opponents () {
            return this.$store.state.opponents;
        }
    },
    methods: {
        addOpponent: function() {
            if(this.bodyweightInvalid)
                return;
            var currentId = opponentId++;
            this.$store.commit('addOpponent', {
                id: currentId,
                name: this.name || 'Opponent ' + currentId,
                gender: this.gender,
                bodyweight: this.bodyweight,
            });

            this.name = "";
            this.bodyweight = null;
        },
        fileSelected: function(evt) {
            var file = evt.target.files[0];
            papa.parse(file, {
               header: true,
               complete: function(result) {
                   var data = result.data;
                   
               }
           });
        },
        importExampleCsv: function(csv) {
            papa.parse(csv.contents, {
               header: true,
               complete: result => {
                   var data = result.data;
                   data.forEach(d => {
                       this.$store.commit('addOpponent', d);
                   });
               }
           });
        }
    }
};

export { name, component };