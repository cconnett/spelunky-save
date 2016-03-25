var jspack = exports.jspack;

class Journal {
  constructor(bytes, opt_entry) {
    // The chrome.fileSystem.entry from which this was constructed.
    this.entry = opt_entry || null;
    [this.caveUnlocked] = jspack.Unpack('<I', bytes, 0x218);
    var [deliveryA, deliveryB] = jspack.Unpack('<II', bytes, 0x21c);
    this.numShortcutsUnlocked = Math.floor(deliveryA / 2);
    this.numDeliveries = deliveryA % 2 + deliveryB;

    this.places = [];
    this.enemies = [];
    this.items = [];
    this.traps = [];

    var places = jspack.Unpack('<xxxx' +
                                   'I'.repeat(10),
                               bytes, 0x420);
    var enemies = jspack.Unpack('<xxxx' +
                                    'I'.repeat(56),
                                bytes, 0x520);
    var items = jspack.Unpack('<xxxx' +
                                  'I'.repeat(34),
                              bytes, 0x620);
    var traps = jspack.Unpack('<xxxx' +
                                  'I'.repeat(14),
                              bytes, 0x670);

    ['Mines', 'Jungle', 'Ice Caves', 'Temple', 'Hell', 'Haunted Castle',
     'Black Market', 'Worm', 'Mothership', 'City of Gold']
        .forEach((name, index) => {
          this.places[index] =
              {'number': index + 1, 'name': name, 'unlocked': places[index]};
        });

    ['Snake', 'Cobra', 'Bat', 'Spider', 'Spinner Spider', 'Giant Spider',
     'Skeleton', 'Scorpion', 'Caveman', 'Damsel', 'Shopkeeper', 'Tunnelman',
     'Scarab', 'Tiki Man', 'Blue Frog', 'Fire Frog', 'Giant Frog', 'Mantrap',
     'Piranha', 'Old Bitey', 'Killer Bee', 'Queen Bee', 'Snail', 'Monkey',
     'Golden Monkey', 'Jiang Shi', 'Green Knight', 'Black Knight', 'Vampire',
     'Ghost', 'Bacterium', 'Worm Egg', 'Worm Baby', 'Yeti', 'Yeti King',
     'Mammoth', 'Alien', 'Ufo', 'Alien Tank', 'Alien Lord', 'Alien Queen',
     'Hawk Man', 'Croc Man', 'Magma Man', 'Scorpion Fly', 'Mummy', 'Anubis',
     'Anubis II', 'Olmec', 'Vlad', 'Imp', 'Devil', 'Succubus', 'Horse Head',
     'Ox Face', 'King Yama',
    ].forEach((name, index) => {
      this.enemies[index] =
          {'number': index + 1, 'name': name, 'unlocked': enemies[index]};
    });

    ['Rope Pile', 'Bomb Bag', 'Bomb Box', 'Spectacles', 'Climbing Gloves',
     "Pitcher's Mitt", 'Spring Shoes', 'Spike Shoes', 'Paste', 'Compass',
     'Mattock', 'Boomerang', 'Machete', 'Crysknife', 'Web Gun', 'Shotgun',
     'Freeze Ray', 'Plasma Cannon', 'Camera', 'Teleporter', 'Parachute', 'Cape',
     'Jetpack', 'Shield', 'Royal Jelly', 'Idol', 'Kapala', 'Udjat Eye', 'Ankh',
     'Hedjet', 'Sceptre', 'Necronomicon', "Vlad's Cape", "Vlad's Amulet"]
        .forEach((name, index) => {
          this.items[index] =
              {'number': index + 1, 'name': name, 'unlocked': items[index]};
        });


    ['Spike', 'Arrow Trap', 'Powder Box', 'Boulder', 'Tiki Trap', 'Acid',
     'Spring', 'Mine', 'Turret', 'Forcefield', 'Crush Trap', 'Ceiling Trap',
     'Spike Ball', 'Lava']
        .forEach((name, index) => {
          this.traps[index] =
              {'number': index + 1, 'name': name, 'unlocked': traps[index]};
        });

    this.allCategories = [this.places, this.enemies, this.items, this.traps];
  }
}

function openEntryKeyAsJournal(key, cc) {}
