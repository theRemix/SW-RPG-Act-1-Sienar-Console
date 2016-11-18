const blessed = require('blessed');
const exec = require('child_process').exec;
const screen = blessed.screen({
  smartCSR: true,
  useBCE: true,
});

const menu = require('./menu')(screen);




const displaySplash = () => exec('/bin/sh -c "clear && imgcat assets/sienar-logo.png"', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  process.stdout.write(stdout.toString());
});


const init = () => {

  screen.append(menu);

  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  // Focus our element.
  // menu.focus();

  // Render the screen.
  screen.render();

};

init();
