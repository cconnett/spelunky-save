// import app from "app";

class JournalCtrl {
  constructor() {
    chrome.storage.local.get(
        'spelunkyJournal', data => openEntryKeyAsJournal(
                               data['spelunkyJournal'], j => this.journal = j));
  }
}
app.controller('JournalCtrl', JournalCtrl);
