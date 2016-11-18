const { listtable } = require('blessed');
module.exports = menu => {
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
  const directory = [
    {
      name: 'Swajo Rosan',
      aff: 'Jedi Order',
      status: 'DECEASED',
      seen: 'Lothal Jedi Temple',
      threat: 'DANGEROUS'
    },
    {
      name: 'Bal Quasarburn',
      aff: 'Jedi Order',
      status: 'DECEASED',
      seen: 'Jedi Temple of Eedit',
      threat: 'DANGEROUS'
    },
    {
      name: 'Mahasim Heprit',
      aff: 'Jedi Order',
      status: 'DECEASED',
      seen: 'Ilum Jedi Temple',
      threat: 'DANGEROUS'
    },
    {
      name: 'Listhe Hoedus',
      aff: 'Jedi Order',
      status: 'DECEASED',
      seen: 'Ilum Jedi Temple',
      threat: 'SAFE'
    },
    {
      name: 'Gianfar Oceanblast',
      aff: 'Jedi Order',
      status: 'DECEASED',
      seen: 'Ilum Jedi Temple',
      threat: 'SAFE'
    },
    {
      name: 'Ashur Sungazer',
      aff: 'Galactic Empire',
      status: 'SURVEILLANCE',
      seen: 'Eriadu',
      threat: 'UNKNOWN'
    },
    {
      name: 'Nunes Fepees',
      aff: 'Mandalorian',
      status: 'DECEASED',
      seen: 'Coruscant',
      threat: 'UNKNOWN'
    },
    {
      name: 'Quell Enctis',
      aff: 'Mandalorian',
      status: 'DECEASED',
      seen: 'Koler System',
      threat: 'DANGEROUS'
    },
    {
      name: 'Val Isa',
      aff: 'Jedi Order',
      status: 'DECEASED',
      seen: 'Koler System',
      threat: 'SAFE'
    },
    {
      name: 'Han Desertleap',
      aff: 'Mandalorian',
      status: 'DECEASED',
      seen: 'Thyferra',
      threat: 'DANGEROUS'
    },
    {
      name: 'Wilehe Lupal',
      aff: 'Mandalorian',
      status: 'DECEASED',
      seen: 'Ord Cantrell',
      threat: 'DANGEROUS'
    },
  ];

  table.setData([
    [ 'NAME','AFFILIATION','THREAT','LAST SEEN','STATUS' ],
    ...directory.map( entry => [entry.name, entry.aff, entry.threat, entry.seen, entry.status] ),
    Array(5).fill('[--- BACK ---]')
  ]);

  table.on('select', (obj, selectedIdx) => selectedIdx > directory.length ? menu.back() : null);

  return table;
};
