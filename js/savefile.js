function read() {
  console.log('start');
  chrome.fileSystem.chooseEntry(
      {
        'type': 'openDirectory',
        'suggestedName':
            'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Spelunky\\Data'
      },
      function(entry) {
        chrome.storage.local.set(
            {'spelunkyData': chrome.fileSystem.retainEntry(entry)});
        console.log(entry);
        var dirReader = entry.createReader();
        dirReader.readEntries(function(results) {
          results.forEach(function(item) {
            console.log('inspecting ' + item.fullPath);
            if (item.fullPath.endsWith('\\spelunky_save.sav')) {
              item.file(function(file) {
                var reader = new FileReader();
                reader.onload = function(event) {
                  console.log(event.target.result);
                };
                reader.readAsBinaryString(file);
              });
            }
          });
        });
      });
}

document.getElementById('findSave').addEventListener('click', read);
