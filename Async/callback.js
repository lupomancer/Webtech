/* jshint esversion: 6 */
var getItem = (id, callback) => {
    var item = {
        id: id,
        name: 'pen'
    };
    setTimeout(() => {
        callback(item);
    }, 2000);
};

getItem(10, (itemObject) => {
    console.log(itemObject);
});