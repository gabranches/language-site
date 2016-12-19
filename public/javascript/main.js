$(function () {

    var dictionary = {
        nouns: {
            places: [],
            things: [],
            people: [],
            countries: []
        },
        verbs: [],
        adjectives: []

    }

    function Word() {
    }

    Word.prototype.noun = {
        place: function () {
            return ('a place');
        },
        thing: function () {
            return (pickRandom(things));
        }
    }

    function pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    var things = [
        { w: 'cup', t: '컵' },
        { w: 'book', t: '책' },
        { w: 'computer', t: '컴퓨터' },
        { w: 'bag', t: '가방' }
    ];

    function Sentence(structure) {

        this.varsOriginal = [];
        this.varsTranslated = [];

        this.variables = structure.variables;
        this.original = structure.original;
        this.translation = structure.translation;

        this.genOriginal = function () {
            return this.original.format(this.varsOriginal);
        }

        this.genTranslation = function () {
            return this.translation.format(this.varsTranslated);
        }

        this.buildVarArrays = (function () {
            for (i = 0; i < this.variables.length; i++) {
                this.varsOriginal.push(this.variables[i].w)
                this.varsTranslated.push(this.variables[i].t)
            }
        }).apply(this);

    }

    var sentences = [
        {
            variables: [new Word().noun.thing()],
            original: 'Where is my {0}?',
            translation: '제 {0} 어디입니까?'
        }
    ];


    var sentence = new Sentence(pickRandom(sentences));


    String.prototype.format = function () {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };

    $("#sentence").text(sentence.genOriginal());
    console.log(sentence.genTranslation());

});