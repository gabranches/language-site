$(function (data, _) {


    function getAnswer(wordset_name, query) {
        var wordset = _.find(data.wordsets, { name: wordset_name });
        return _.find(wordset.words, { _id: query });
    }


    function pickSentences(num) {
        var result = [];
        for (i = 0; i < num; i++) {
            result.push(pickRandom(data.sentences));
        }
        return result;
    }


    function pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    String.prototype.format = function () {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };

})(data, _);