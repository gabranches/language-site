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
        { word: 'cup', translation: '컵' },
        { word: 'book', translation: '책' },
        { word: 'computer', translation: '컴퓨터' },
        { word: 'bag', translation: '가방컵' }
    ];

    function Sentence(structure) {

        this.variables = structure.variables;
        this.original = structure.original;
        this.translation = structure.translation;

    }

    var sentences = [
        {
            name: '"Where is my" question',
            variables: [new Word().noun.thing()],
            original: function () {
                return ['Where', 'is', 'my', this.variables[0].word, '?']
            },
            translation: function () {
                return ['제', this.variables[0].translation, '어디입니까?']
            }
        }
    ];

    var sentence = new Sentence(pickRandom(sentences));


    $("#sentence").text(sentence.original().join(' '));
    console.log(sentence.translation());

});