'use strict';

function practice() {

    const practice = new Vue({
        el: '#pracice',
        data: data,

        getAnswer(wordsetName, query) {
            let wordset = _.find(this.data.wordsets, { name: wordsetName });
            return _.find(wordset.words, { _id: query });
        },

        pickSentences(num) {
            let result = [];
            for (i = 0; i < num; i++) {
                result.push(pickRandom(data.sentences));
            }
            return result;
        }
    });
}

