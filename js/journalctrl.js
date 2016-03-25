// import app from "app";

class JournalCtrl {
  constructor($scope, $timeout) {
    this._scope = $scope;
    this._timeout = $timeout;

    this.journal = null;

    this.readJournal();
    this.loop();

    this.placeNames = [
      'Mines',
      'Jungle',
      'Ice Caves',
      'Temple',
      'Hell',
      'Haunted Castle',
      'Black Market',
      'Worm',
      'Mothership',
      'City of Gold'
    ];

    this.enemyNames = [
      'Snake',
      'Cobra',
      'Bat',
      'Spider',
      'Spinner Spider',
      'Gaint Spider',
      'Skeleton',
      'Scorpion',
      'Caveman',
      'Damsel',
      'Shopkeeper',
      'Tunnelman',
      'Scarab',
      'Tiki Man',
      'Blue Frog',
      'Fire Frog',
      'Gaint Frog',
      'Mantrap',
      'Piranha',
      'Old Bitey',
      'Killer Bee',
      'Queen Bee',
      'Snail',
      'Monkey',
      'Golden Monkey',
      'Jiang Shi',
      'Green Knight',
      'Black Knight',
      'Vampire',
      'Ghost',
      'Bacterium',
      'Worm Egg',
      'Worm Baby',
      'Yeti',
      'Yeti King',
      'Mammoth',
      'Alien',
      'Ufo',
      'Alien Tank',
      'Alien Lord',
      'Alien Queen',
      'Hawk Man',
      'Croc Man',
      'Magma Man',
      'Scorpion Fly',
      'Mummy',
      'Anubis',
      'Anubis II',
      'Olmec',
      'Vlad',
      'Imp',
      'Devil',
      'Succubus',
      'Horse Head',
      'Ox Face',
      'King Yama',
    ];

    this.itemNames = [
      'Rope Pile',
      'Bomb Bag',
      'Bomb Box',
      'Spectacles',
      'Climbing Gloves',
      "Pitcher's Mitt",
      'Spring Shoes',
      'Spike Shoes',
      'Paste',
      'Compass',
      'Mattock',
      'Boomerang',
      'Machete',
      'Crysknife',
      'Web Gun',
      'Shotgun',
      'Freeze Ray',
      'Plasma Cannon',
      'Camera',
      'Teleporter',
      'Parachute',
      'Cape',
      'Jetpack',
      'Shield',
      'Royal Jelly',
      'Idol',
      'Kapala',
      'Udjat Eye',
      'Ankh',
      'Hedjet',
      'Sceptre',
      'Necronomicon',
      "Vlad's Cape",
      "Vlad's Amulet"
    ];

    this.trapNames = [
      'Spike',
      'Arrow Trap',
      'Powder Box',
      'Boulder',
      'Tiki Trap',
      'Acid',
      'Spring',
      'Mine',
      'Turret',
      'Forcefield',
      'Crush Trap',
      'Ceiling Trap',
      'Spike Ball',
      'Lava'
    ];
  }

  loop() {
    this.readJournal();
    this._timeout(() => this.loop(), 500);
  }

  readJournal() {
    chrome.storage.local.get(
        'spelunkyJournal',
        data =>
            chrome.fileSystem.restoreEntry(data['spelunkyJournal'], entry => {
              entry.file(file => {
                var reader = new FileReader();
                reader.onload = event => {
                  this._scope.$apply(() => this.journal =
                                         new Journal(new Int8Array(
                                             event.target.result, entry)));
                };
                reader.readAsArrayBuffer(file);
              });
            }));
  };

  chooseSaveFile() {
    chrome.fileSystem.chooseEntry(
        {
          'type': 'openFile',
          'suggestedName':
              '/Program Files (x86)/Steam/steamapps/common/Spelunky/Data/spelunky_save.sav'
        },
        function(entry) {
          chrome.storage.local.set(
              {'spelunkyJournal': chrome.fileSystem.retainEntry(entry)});
          this.readJournal(entry);
        });
  };
}

app.controller('JournalCtrl', JournalCtrl);
