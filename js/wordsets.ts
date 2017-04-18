declare var Vue: any;
declare var jsonData: Array<Object>;

function wordsetsPage() {
    return new Vue({
        el: '#wordsets',
        data: {
            newWordsetName: null,
            wordsets: jsonData
        },
        methods: {
            editWordset(id: string) {
                window.location.href = '/wordset/' + id;
            },
            deleteWordset(id: string) {
                console.log(this.wordsets);
                if (confirm('Are you sure you want to delete this wordset? This cannot be undone!')) {
                    $.post('/wordsets/delete', { _id: id }, () => {
                        this.wordsets = this.wordsets.filter((wordset: any) => wordset._id !== id);
                    });
                }
            },
            addWordset(name: string) {
                $.post('/wordsets/add',
                    { name: name },
                    (res) => {
                        this.wordsets.push({
                            _id: 0,
                            name: name,
                            words: []
                        });
                    });
            }
        }
    });
}
