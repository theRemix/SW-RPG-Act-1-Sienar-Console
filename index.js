const blessed = require('blessed');
const exec = require('child_process').exec;
const screen = blessed.screen({
  smartCSR: true,
  useBCE: true,
  dockBorders: true
});

const menu = require('./menu')(screen);

let loggedIn = false;

const logo = blessed.image({
  file : './assets/Sienar-sm.png',
  type : 'ansi'
});
const displaySplash = () => {
  menu.detach();
  screen.append( logo );
  screen.render();
};

screen.logout = _ => {
  loggedIn = false;
  screen.append( logo );
  displaySplash();
};

screen.on('keypress', (_, key) => {
  if(!loggedIn && key.name === 'space'){
    logo.detach();
    screen.realloc();
    screen.append(menu);
    menu.focus();
    menu.selected = 0;
    screen.render();
    loggedIn = true;
  }
});


const init = () => {

  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  displaySplash();

  // Render the screen.
  screen.render();

};

init();
