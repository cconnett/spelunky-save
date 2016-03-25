var jspack = exports.jspack;

class Journal {
  constructor(bytes, opt_entry) {
    // The chrome.fileSystem.entry from which this was constructed.
    this.entry = opt_entry || null;
    [this.caveUnlocked] = jspack.Unpack('<I', bytes, 0x218);
    var [deliveryA, deliveryB] = jspack.Unpack('<II', bytes, 0x21c);
    this.numShortcutsUnlocked = Math.floor(deliveryA / 2);
    this.numDeliveries = deliveryA % 2 + deliveryB;
    this.places = jspack.Unpack('<xxxx' +
                                    'I'.repeat(10),
                                bytes, 0x420);
    this.enemies = jspack.Unpack('<xxxx' +
                                     'I'.repeat(56),
                                 bytes, 0x520);
    this.items = jspack.Unpack('<xxxx' +
                                   'I'.repeat(34),
                               bytes, 0x620);
    this.traps = jspack.Unpack('<xxxx' +
                                   'I'.repeat(14),
                               bytes, 0x670);
  }
}

function openEntryKeyAsJournal(key, cc) {}
