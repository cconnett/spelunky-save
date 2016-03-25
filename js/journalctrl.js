// import app from "app";

class JournalCtrl {
  constructor($scope, $timeout) {
    this._scope = $scope;
    this._timeout = $timeout;

    this.journal = null;

    this.readJournal();
    this.loop();
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
  }
}

app.controller('JournalCtrl', function($scope, $timeout) {
  return new JournalCtrl($scope, $timeout);
});
