declare var Vue : any;
declare var _ : any;
declare var jsonData : Array<Object>;

function wordsetPage() {
    return new Vue({
        el: '#wordset',
        data: {
            wordsetId: window.location.pathname.split('/')[2],
            word: null,
            translation: null,
            wordset: jsonData
        },
        methods: {
            addWord() {
                $.post('/wordset/add', {
                    _id: this.wordsetId,
                    w: this.word,
                    t: this.translation
                }, (res: any) => {
                    res = JSON.parse(res);
                    if (res.status === 200) {
                        if (res.replace === false) {
                            // Add new word
                            this.wordset.words.push({
                                w: this.word,
                                t: this.translation,
                                _id: res._id
                            });
                        } else {
                            // Replace existing word
                            let definition = _.find(this.wordset.words, { '_id': res._id });
                            definition.w = this.word;
                            definition.t = this.translation;
                        }
                        this.word = null;
                        this.translation = null;
                    } else {
                        alert('Failed to add new word');
                    }
                });
            },
            editWord(word: string, translation: string) {
                this.word = word;
                this.translation = translation;
            },
            deleteWord(id: string) {
                console.log(id);
                $.post('/wordset/delete-word',
                { _id: this.wordsetId, wordId: id }, (res: any) => {
                    res = JSON.parse(res);
                    if (res.status === 200) {
                        this.wordset.words = this.wordset.words.filter((word: any) => word._id !== id);
                    } else {
                        alert('Error removing word.');
                    }
                });
            }
        }
    });
}


// ** Event Listeners ** //

// // Add new word
// $('#word-form').on('submit', function () {
//     var w = $('#word').val();
//     var t = $('#translation').val();

//     $.post('/wordset/add', {
//         _id: data._id,
//         w: w,
//         t: t
//     }, function (res) {
//         res = JSON.parse(res);
//         if (res.status === 200) {
//             if (res.replace === false) {
//                 // Add new word
//                 $('#wordset-list').prepend(template({
//                     w: w,
//                     t: t,
//                     _id: res._id
//                 }));
//             } else {
//                 // Replace existing word
//                 $('[_id=' + res._id + ']').find('.translation').text(t);
//             }
//             $('#word').val('').focus();
//             $('#translation').val('');
//         } else {
//             alert('Failed to add new word');
//         }
//     });
//     return false;
// });


// // Edit word
// $(document).on('click', '.wordset-edit', function () {
//     var elem = $(this).parent().parent();
//     var w = $(elem).find('.word').text();
//     var t = $(elem).find('.translation').text();

//     $('#word').val(w);
//     $('#translation').val(t).focus();
// });

// // Delete word
// $(document).on('click', '.wordset-delete', function () {
//     var elem = $(this).parent().parent();
//     var wordId = elem.attr('_id');

//     console.log(wordId);

//     $.post('/wordset/delete-word', { _id: data._id, wordId: wordId }, function () {
//         elem.remove();
//     });
// });
