$(document).ready(function () {

    console.log(data);

    var source = $("#word-template").html();
    var template = Handlebars.compile(source);

    // Append words

    data.words.forEach(function(word) {
        $("#wordset-list").append(template(word));
    })

    // Form submit

    $("#word-form").on('submit', function () {
        var w = $("#word").val();
        var t = $("#translation").val();
        console.log('submitted');
        $.post('/wordset/add', { _id: data._id, w: w, t: t }, function(data) {
            $("#wordset-list").append(template( {w: w, t: t });
        });
        return false;
    })

});