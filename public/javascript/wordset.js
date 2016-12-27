
console.log(data);

var source = $("#word-template").html();
var template = Handlebars.compile(source);

// Append words

data.words.forEach(function (word) {
    $("#wordset-list").prepend(template(word));
})

// Add new word

$("#word-form").on('submit', function () {
    var w = $("#word").val();
    var t = $("#translation").val();

    $.post('/wordset/add', {
        _id: data._id,
        w: w,
        t: t
    }, function (res) {
        res = JSON.parse(res);
        if (res.status === 200) {
            if (res.replace === false) {
                // Add new word
                $("#wordset-list").prepend(template({
                    w: w,
                    t: t,
                    _id: res._id
                }));
            } else {
                // Replace existing word
                $('[_id=' + res._id + ']').find('.translation').text(t);
            }
            $('#word').val('').focus();
            $('#translation').val('');
        } else {
            alert('Failed to add new word');
        }
    });
    return false;
});


// Edit word

$(document).on('click', '.edit', function () {

    var elem = $(this).parent().parent();
    var w = $(elem).find('.word').text();
    var t = $(elem).find('.translation').text();

    $('#word').val(w);
    $('#translation').val(t).focus();

});

// Delete word

$(document).on('click', '.delete', function () {

    var elem = $(this).parent().parent();
    var word_id = elem.attr("_id");

    console.log(word_id);

    $.post('/wordset/delete-word', { _id: data._id, word_id: word_id }, function () {
        elem.remove();
    });
});
