console.log('note.js accessed succesfully');

module.exports.age = 21;

module.exports.addNewNote = function () {
    console.log('You added a new note');
    return 'New note';
};