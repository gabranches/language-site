console.log(data);

var source = $('#sentence-template').html();
var template = Handlebars.compile(source);

// Append sentences
data.forEach(function (sentence) {
    $('#sentence-list').prepend(template(sentence));
});


const sentences = new Vue({
    el: '#sentences',
    dat: data
});
