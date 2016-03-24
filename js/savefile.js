// import jspack from "jspack";
var jspack = new JSPack();

class Journal {
  constructor(bytes) {
    this.caveUnlocked = jspack.Unpack('<I', bytes, 0x218);
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

function chooseNew() {
  chrome.fileSystem.chooseEntry(
      {
        'type': 'openFile',
        'suggestedName':
            '/Program Files (x86)/Steam/steamapps/common/Spelunky/Data/spelunky_save.sav'
      },
      function(entry) {
        chrome.storage.local.set(
            {'spelunkyJournal': chrome.fileSystem.retainEntry(entry)});
        openEntryAsJournal(entry);
      });
}

function openEntryKeyAsJournal(key, cc) {
  chrome.fileSystem.restoreEntry(key, function(entry) {
    entry.file(function(file) {
      var reader = new FileReader();
      reader.onload = function(event) {
        console.log(event.target.result);
        cc(new Journal(new Int8Array(event.target.result)));
      };
      reader.readAsArrayBuffer(file);
    });
  });
}

function logStoredEntryJournal() {
  chrome.storage.local.get('spelunkyJournal', function(data) {
    openEntryKeyAsJournal(data['spelunkyJournal'], a => console.log(a));
  });
}
