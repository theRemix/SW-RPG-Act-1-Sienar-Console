const { listtable } = require('blessed');
const table = listtable({
    top: 0,
    right: 0,
    width: '70%',
    height: '100%',
    tags: true,
    border: {
      type: 'line'
    },
    keys: true,
    style: {
      fg: 'white',
      bg: '#000',
      border: {
        fg: '#f0f0f0'
      },
      selected: {
        fg: '#6699ff',
        bg: '#f9f9f9'
      },
      item: {
        fg: '#6699ff',
        bg: '#f9f900'
      }
    }

});
table.setData([
  [ 'test', 'hi' ],
  [ 'test', 'hi' ],
  [ 'test', 'hi' ],
  [ 'test', 'hi' ],
  [ 'test', 'hi' ],
]);
module.exports = table;
