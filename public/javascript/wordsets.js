$(document).on('click', '.edit', function () {
    editWordset($(this).parent().parent().attr("_id"));
});

$(document).on('click', '.delete', function () {
    var _id = $(this).parent().parent().attr("_id");

    if (confirm('Are you sure you want to delete this wordset? This cannot be undone.')) {
        $.post('/wordsets/delete', { _id: _id }, function () {
            window.location = '/wordsets/';
        });
    }
});

$(document).on('click', '.wordset-name', function () {
    editWordset($(this).parent().attr("_id"));
});


function editWordset(_id) {
    window.location = '/wordset/' + _id;
}

