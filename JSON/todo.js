console.log('starting todo.js');

var addNote = (title, content) => {
    console.log('Title: ' + title + '\nContent: \n', content);
};

module.exports = {
    addNote: addNote
};