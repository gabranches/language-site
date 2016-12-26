$(document).ready(function () {

    console.log(data);

    var source = $("#word-template").html();
    var template = Handlebars.compile(source);


    data.words.forEach(function(word) {
        $("#wordset-list").append(template(word));
    })



});