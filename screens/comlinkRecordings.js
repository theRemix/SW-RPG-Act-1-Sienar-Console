const { list, box } = require('blessed');


const comLinkRecs = [
  {
    name: 'Lieutenant TK-575',
    detail: '[Message Deciphering: 8.76% complete]\n\nYW9ka  - --HVyZ\n3I4YW83\n\nZzg5dW9hN3Useful--U5OGJhb2U4 -\n- -- OTc4OWEgb3g5OGc3YCArgo- W85OGcgOTgsciBjLHJj\n\nLCBImpnY--ortant3IgZzIzY-3ArtifJ--ACTSoZzUyM2Nye - -Gc\ngYzIzcm5nIGMyM3JoZzR4Y25yMmcgY3I0eGcyM3  ---\n  -JediODRnayAycjk4NGc3azg5M3IyZzcgNGsyMzhyZzQ3IDg5cjIx\n\nM2c3NCA4OXIyZz -- --cgNHI5ODMy\n\nN2-- -- Delivecga--redzk\n4Mmc3NHtoI4O\nWt-- Eriadu--nLH---JjZ2dv\nZWNycGc'
  },
  {
    name: 'Ashur Sungazer',
    detail: `[Message Deciphering: 100% complete]

Hello Edrick,

It has been some time since we've last spoke. However, I've come across something you may find interesting.

I found a strange stone in our Archives. The crystallization in this stone reminds me of the stories i've been studying about lightsaber crystals. The engravings may be several thousand years old.

I'd prefer not to speak more about it over ComLinkMail; the Empire tends to censor our communications. But if you can meet me here on Eriadu, I can show you this stone in person. Make sure you obtain some credentials; the relic cannot be removed from the University Archive, and you need to be an accredited scholar to gain access. Not that it'll prove to be a problem for you, I think.

Come quickly old friend. We have much to dicsuss.[EOT]
`,
  },
  {
    name: 'Val Isa',
    detail: '[Message Deciphering: 7.12% complete]\n\nYW9kaHammer-Head-----VyZ--Class3I4YW8\n3aCruiserZzg5dW9hN3U5\n\nOGJhb2MobileU4OTc4--OWEgb3g5Ol---lGHospital--c3YW85OG\ncgOTemplegsciBjLHJjL--CBnY3IgZzIzYtraditions3J\n\noZzUyM2NyeGcgYzIzcm5MandaloriannIGMyM3JoZz\nR4Y25MandyMmcgY3I0eGcyalorianM3JMandjODlorianRnay\n\nAttayck4NGc--3a--zg5MMurder3IyZzcgNGsyTerrMzitoryhyZzQ3\n\nIDMurdg5cjerIxM2c3NCA4Batt--leOXIyZzc\ngNHI5HideODMyN2Sanctuarycg--azk-4Mm\nc3NHI---Th-e4O--SactuarytnLHIgbmF0c2hvZXU\ngbnRzaHidingG9hd---XRucyB--ob2FldG51aC\nBhb3RuUnderZX-U--gYWAttack5vdHNlIGF0b---m9zRunZWggrunYW9\n\n0bnNSancutuaryla---CBv--YW5zdGV1aHNvYW5---0ZW9hb\nnN0ZWggYW90b\nmVzdWgg---YW9udHNlYW9udHNl--Y2dnb2VjcnBn',
  },
  {
    name: 'Lieutenant TK-575',
    detail: '[Message Deciphering: Failed]\n\nYW9kaHVyZ3I4YW83Zzg5dW9hN3U5OGJhb2U4OTc4OWEgb3g5OGc3YW85OGcgOTgsciBjLHJjLCBnY3IgZzIzY3JoZzUyM2NyeGcgYzIzcm5nIGMyM3JoZzR4Y25yMmcgY3I0eGcyM3JjODRnayAycjk4NGc3azg5M3IyZzcgNGsyMzhyZzQ3IDg5cjIxM2c3NCA4OXIyZzcgNHI5ODMyN2cgazk4Mmc3NHI4OWtnLHIgbmF0c2hvZXUgbnRzaG9hdXRucyBob2FldG51aCBhb3RuZXUgYW5vdHNlIGF0bm9zZWggYW90bnNlaCBvYW5zdGV1aHNvYW50ZW9hbnN0ZWggYW90bmVzdWggYW9udHNlYW9udHNlY2cgYXNvbnR1aG9hIHNldHVodG5vYWggdXN0bm9hZSB1bnN0YW9oIHV0bnNvYWggdXRuc2FvaCB1dG5zYW9oIHV0bnNhb2h1IHRuc2FvaCB1dG5zYW9oIHV0bnNhb3VuZXRzb2dvZWNycGc=',
  },
  {
    name: 'Quell Enctis',
    detail: '[Message Deciphering: Failed]\n\nYW9kaHVyZ3I4YW83Zzg5dW9hN3U5OGJhb2U4OTc4OWEgb3g5OGc3YW85OGcgOTgsciBjLHJjLCBnY3IgZzIzY3JoZzUyM2NyeGcgYzIzcm5nIGMyM3JoZzR4Y25yMmcgY3I0eGcyM3JjODRnayAycjk4NGc3azg5M3IyZzcgNGsyMzhyZzQ3IDg5cjIxM2c3NCA4OXIyZzcgNHI5ODMyN2cgazk4Mmc3NHI4OWtnLHIgbmF0c2hvZXUgbnRzaG9hdXRucyBob2FldG51aCBhb3RuZXUgYW5vdHNlIGF0bm9zZWggYW90bnNlaCBvYW5zdGV1aHNvYW50ZW9hbnN0ZWggYW90bmVzdWggYW9udHNlYW9udHNlY2cgYXNvbnR1aG9hIHNldHVodG5vYWggdXN0bm9hZSB1bnN0YW9oIHV0bnNvYWggdXRuc2FvaCB1dG5zYW9oIHV0bnNhb2h1IHRuc2FvaCB1dG5zYW9oIHV0bnNhb3VuZXQgc25vdGV1aCBzb2FudGh1IG9zYW50aHUgYW9uc3R1aCBvYW50c2V1aCBhb2VzbnR1IGFvc3RuaHVuYXRvZXVvYXNvZ29lY3JwZw==',
  },
];

module.exports = menu => {

  const submenu = list({
    top: 0,
    left: 0,
    width: '30%',
    height: '100%',
    tags: true,
    border: {
      type: 'line'
    },
    items: comLinkRecs.map(c => c.name).concat('[--- BACK ---]'),
    keys: true,
    style: {
      fg: 'white',
      bg: '#000',
      border: {
        fg: '#ffffff'
      },
      selected: {
        fg: '#000000',
        bg: '#ffffff',
        border: {
          fg: '#ffffff',
        }
      },
      item: {
        fg: '#999999',
      }
    }
  });

  const detail = box({
    top: 0,
    right: 0,
    width: '70%',
    height: '100%',
    content: '',
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: '#000',
      border: {
        fg: '#ffffff'
      },
      selected: {
        fg: '#000000',
        bg: '#ffffff',
        border: {
          fg: '#ffffff',
        }
      },
      item: {
        fg: '#999999',
      }
    }
  });

  const container = box({
    top: 0,
    right: 0,
    width: '77%',
    height: '100%',
    tags: true,
    keys: true,
    style: {
      border: {
        fg: '#f0f0f0'
      },
    },
  });
  container.on('focus', _ => submenu.focus());
  submenu.on('focus', _ => submenu.selected = 0);

  submenu.on('select', (obj, selectedIdx) => {
    if(selectedIdx === comLinkRecs.length){
      detail.content = '';
      menu.back();
    }else{
      detail.content = comLinkRecs[selectedIdx].detail;
    }
    menu.screen.render();
  });

  container.append(submenu);
  container.append(detail);

  return container;
};

