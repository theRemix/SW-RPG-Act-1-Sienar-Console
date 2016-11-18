const {
  list,
  box
} = require('blessed');

const {
  republicWatchList
} = require('./screens');

const mainMenuLabels = [
  'Republic Watch List',
  'ComLink Recordings',
  'Daily Logs',
  'Holding Cells',
  'Escape Pod Controls',
  'Logout',
];

const blank = box({
  width : '70%'
});

let currentScreen = blank;

const mainMenuScreens = new Map();
mainMenuScreens.set(0, republicWatchList);
// mainMenuScreens.set(1, republicWatchList);
// mainMenuScreens.set(2, republicWatchList);
// mainMenuScreens.set(3, republicWatchList);
// mainMenuScreens.set(4, republicWatchList);


module.exports = screen => {

  const switchScreens = idx => {
    // currentScreen.detach();
    screen.remove(currentScreen);
    currentScreen = republicWatchList;
    screen.append(currentScreen);
    currentScreen.focus();
    screen.render();
  };

  let menu = list({
    top: 0,
    left: 0,
    width: '30%',
    height: '100%',
    items: mainMenuLabels,
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

  menu.on('select', (obj, selectedIdx) => switchScreens(selectedIdx));

  screen.append(menu);
  screen.append(blank);
  menu.focus();

  return menu;
};
