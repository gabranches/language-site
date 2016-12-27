$(document).on('click', '.edit', function () {
    var _id = $(this).parent().parent().attr("_id");
    window.location = '/wordset/' + _id;
});

$(document).on('click', '.delete', function () {
    var _id = $(this).parent().parent().attr("_id");

    if (confirm('Are you sure you want to delete this wordset? This cannot be undone.')) {
        $.post('/wordsets/delete', { _id: _id }, function () {
            window.location = '/wordsets/';
        });
    }
});

