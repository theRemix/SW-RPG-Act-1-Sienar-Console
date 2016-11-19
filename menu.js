const {
  list,
  box
} = require('blessed');

const {
  republicWatchList,
  comlinkRecordings,
  dailyLogs,
  escapePodControls,
} = require('./screens');

const mainMenuLabels = [
  'Republic Watch List',
  'ComLink Recordings',
  'Daily Logs',
  // 'Holding Cells',
  'Escape Pod Controls',
  'Logout',
];

const BLANK_IDX = -1;
const blank = box({
  top : 0,
  right : 0,
  width : '70%'
});

let currentScreen = blank;

const mainMenuScreens = new Map();

module.exports = screen => {

  const switchScreens = idx => {
    if(idx === mainMenuLabels.indexOf('Logout')){
      menu.detach();
      screen.logout();
    }else{
      currentScreen.detach();
      currentScreen = mainMenuScreens.get(idx);
      screen.append(currentScreen);
      if (idx !== BLANK_IDX){  currentScreen.focus(); }
    }
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

  menu.back = _ => {
    switchScreens(BLANK_IDX);
    menu.focus();
  };

  mainMenuScreens.set(BLANK_IDX, blank);
  mainMenuScreens.set(0, republicWatchList(menu));
  mainMenuScreens.set(1, comlinkRecordings(menu));
  mainMenuScreens.set(2, dailyLogs(menu));
  mainMenuScreens.set(3, escapePodControls(menu));

  menu.on('select', (obj, selectedIdx) => switchScreens(selectedIdx));

  screen.append(menu);

  return menu;
};
