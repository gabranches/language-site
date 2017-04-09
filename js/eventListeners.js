// Add new word
$('#sentence-form').on('submit', function () {
    var o = $('#s_original').val();
    var t = $('#s_translation').val();

    $.post('/sentences/add', {
        s_original: o,
        s_translation: t
    }, function (res) {
        res = JSON.parse(res);
        if (res.status === 200) {
            $('#sentence-list').prepend(template({
                s_original: o,
                s_translation: t,
                _id: res._id
            }));

            $('#s_original').val('').focus();
            $('#s_translation').val('');
        } else {
            alert('Failed to add new sentence');
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

// Delete sentence
$(document).on('click', '.delete', function () {
    var elem = $(this).parent().parent();
    var _id = elem.attr('_id');

    $.post('/sentences/delete', { _id: _id }, function () {
        elem.remove();
    });
});
