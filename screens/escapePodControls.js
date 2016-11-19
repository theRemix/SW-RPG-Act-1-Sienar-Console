const { listtable, list, box } = require('blessed');

const PodTwelve = {
  ID : 12,
  Status : 'Ready to Launch',
  Destination : '[---UNSET---]'
};
const PodDestinations = [
  'Lothal',
  'Lothal\'s Sun',
  'Eriadu',
];
const pods = [
  {
    ID : 8,
    Status : 'Launched',
    Destination : 'Coruscant'
  },
  {
    ID : 9,
    Status : 'Destroyed',
    Destination : 'Dagobah'
  },
  {
    ID : 10,
    Status : 'Launched',
    Destination : 'Coruscant'
  },
  {
    ID : 11,
    Status : 'Launch Failed',
    Destination : 'Thyferra'
  },
  PodTwelve,
  {
    ID : 13,
    Status : 'Launched',
    Destination : 'Bespin'
  },
];

module.exports = menu => {

  const submenu = listtable({
    top: 0,
    left: 0,
    width: '60%',
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
    'ID', 'Status', 'Destination'
  ];

  const setSubmenuData = _ => submenu.setData([
    submenuColumns,
    ...pods.map(p =>
      submenuColumns.map(col => p[col].toString())
    ),
    Array(submenuColumns.length).fill('[--- BACK ---]')
  ]);

  const destinationSelector = list({
    top: 0,
    right: 0,
    width: '40%',
    height: '100%',
    content: '',
    border: {
      type: 'line'
    },
    items: PodDestinations,
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
  setSubmenuData();

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

  destinationSelector.on('select', (obj, selectedIdx) => {
    PodTwelve.Destination = PodDestinations[selectedIdx];
    setSubmenuData();
    destinationSelector.detach();
    submenu.focus();
    menu.screen.render();
  });

  submenu.on('select', (obj, selectedIdx) => {
    if(selectedIdx === pods.length+1){
      menu.back();
    }else if(selectedIdx-1 === pods.indexOf(PodTwelve)){
      container.append(destinationSelector);
      destinationSelector.focus();
      menu.screen.render();
    }
  });

  container.append(submenu);

  return container;
};



