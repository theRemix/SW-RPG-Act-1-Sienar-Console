const { listtable, box } = require('blessed');

const logs = [
  {
    Subject : 'Test Pilot 8080',
    Status : 'Survived Crash',
    Vehicle : 'TIE Bomber',
    Version : 'Mark 3',
    Notes : 'Pilot almost died.'
  },
  {
    Subject : 'Test Pilot 8080',
    Status : 'Fatal Crash',
    Vehicle : 'TIE Bomber',
    Version : 'Mark 3',
    Notes : 'We need pilots with more soak!'
  },
  {
    Subject : 'Test Pilot 8081',
    Status : 'Fatal Crash',
    Vehicle : 'TIE Bomber',
    Version : 'Mark 4 pre-alpha',
    Notes : 'Too explosive on impact'
  },
  {
    Subject : 'Test Pilot 8082',
    Status : 'Fatal Crash',
    Vehicle : 'TIE Bomber',
    Version : 'Mark 4 pre-alpha',
    Notes : 'Too explosive on impact'
  },
  {
    Subject : 'Test Pilot 8083',
    Status : 'Fatal Crash',
    Vehicle : 'TIE Bomber',
    Version : 'Mark 4 pre-alpha',
    Notes : 'Too explosive on impact'
  },
  {
    Subject : 'Test Pilot 8084',
    Status : 'Fatal Crash',
    Vehicle : 'TIE Bomber',
    Version : 'Mark 4 pre-alpha',
    Notes : 'Too explosive on impact'
  },
  {
    Subject : 'Test Pilot 8085',
    Status : 'Fatal Crash',
    Vehicle : 'TIE Defender',
    Version : 'Mark 3 pre-alpha',
    Notes : 'Too many structural problems'
  },
  {
    Subject : 'Test Pilot 8086',
    Status : 'Fatal Flight',
    Vehicle : 'TIE Interceptor',
    Version : 'Mark 5 pre-alpha',
    Notes : 'Too much blood loss during high gravitational forces'
  },
  {
    Subject : 'Test Pilot 8087',
    Status : 'Fatal Crash',
    Vehicle : 'TIE Interceptor',
    Version : 'Mark 5 pre-alpha',
    Notes : 'Too fragile, shreds on impact'
  },
  {
    Subject : 'Test Pilot 8088',
    Status : 'Fatal Crash',
    Vehicle : 'TIE Interceptor',
    Version : 'Mark 5 pre-alpha',
    Notes : 'Too fragile, shreds on impact'
  },
  {
    Subject : 'Test Pilot 8089',
    Status : 'Fatal Crash',
    Vehicle : 'TIE Landing Craft',
    Version : 'Mark 1 beta',
    Notes : 'Forgot to add pilot harness'
  },
  {
    Subject : 'Test Pilot 8010',
    Status : 'Fatal Landing',
    Vehicle : 'TIE Landing Craft',
    Version : 'Mark 1 beta',
    Notes : 'Harness was installed too tight, suffocates pilot'
  },
  {
    Subject : 'Test Pilot 8011',
    Status : 'Fatal Hovering',
    Vehicle : 'TIE Phage',
    Version : 'Mark 1 alpha',
    Notes : 'Jawa\'s do not make good test pilots'
  },
  {
    Subject : 'Test Pilot 8012',
    Status : 'Fatal Launch',
    Vehicle : 'TIE Phage',
    Version : 'Mark 1 alpha',
    Notes : 'Stop sending us suicidal test pilots!'
  },
  {
    Subject : 'Test Pilot 8013',
    Status : 'Fatal Crash',
    Vehicle : 'Delta-Wing Interceptor',
    Version : 'Mark 2 beta',
    Notes : 'Standard Successful Crash'
  },
  {
    Subject : 'Test Pilot 8014',
    Status : 'Fatal Rogue',
    Vehicle : 'TIE Skirmisher',
    Version : 'Mark 1 alpha',
    Notes : 'Test Pilot 8014 figured out how to override the auto-navigation, avoided crash, almost got away. We pushed the emergency destruct button before 8014 got away. DO NOT TELL LORD VADER'
  },
];

const compileDetailedReport = log => [
  'Subject',
  'Status',
  'Vehicle',
  'Version',
  'Notes'
].map(field => `${field}: ${log[field]}`).join('\n\n');

module.exports = menu => {

  const submenu = listtable({
    top: 0,
    left: 0,
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
  const submenuColumns = [
    'Subject', 'Status', 'Vehicle'
  ];
  submenu.setData([
    submenuColumns,
    ...logs.map(c =>
      submenuColumns.map(col => c[col])
    ),
    Array(submenuColumns.length).fill('[--- BACK ---]')
  ]);

  const detail = box({
    top: 0,
    right: 0,
    width: '30%',
    height: '100%',
    content: '',
    border: {
      type: 'line'
    },
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
    },
  });

  const container = box({
    top: 0,
    right: 0,
    width: '70%',
    height: '100%',
    tags: true,
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
    },
  });
  container.on('focus', _ => submenu.focus());

  submenu.on('keypress', (_, event) => {
    if(submenu.selected > logs.length) return;
    detail.content = compileDetailedReport(logs[submenu.selected-1]);
    menu.screen.render();
  });

  submenu.on('select', (obj, selectedIdx) => {
    if(selectedIdx === logs.length+1){
      detail.content = '';
      menu.back();
    }
  });

  container.append(submenu);
  container.append(detail);

  return container;
};


