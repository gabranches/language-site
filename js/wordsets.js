
const wordsets = new Vue({
    el: '#wordsets',
    data: {
        wordsets: jsonData
    },
    methods: {
        editWordset(id) {
            window.location = '/wordset/' + id;
        },
        deleteWordset(id) {
            console.log(this.wordsets);
            if (confirm('Are you sure you want to delete this wordset? This cannot be undone.')) {
                $.post('/wordsets/delete', { _id: id }, () => {
                    this.wordsets = this.wordsets.filter(wordset => wordset._id != id);
                    console.log(this.wordsets);
                });
            }
        }
    }
});