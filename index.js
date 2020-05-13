module.exports = function (ass) {
    var start = ass.indexOf('[Events]');
    var end = ass.length;
    var dialogueFilter = /^Dialogue:\s\d+,\d+:\d+:\d+\.\d+,\d+:\d+:\d+\.\d+,(.*?),(.*?),\d,\d,\d,(.*?),(.*)/gm;
    var timeFilter = /\d+:\d+:\d+\.\d+,\d+:\d+:\d+\.\d+/gm;
    var textFilter = /^Dialogue:\s\d+,\d+:\d+:\d+\.\d+,\d+:\d+:\d+\.\d+,(.*?),(.*?),\d,\d,\d,(.*?),/gm;
    
    var events = ass.substring(start, end);
    var dialogue = events.match(dialogueFilter);
    var dialogueText = events.match(textFilter);
    var keys = {}
    for (let index = 0; index < dialogue.length; index++) {
      var timeMatch = dialogue[index].match(timeFilter)[0];
      var key = '0' + timeMatch.replace(',', '0 --> 0') + '0';
      var filteredText = dialogue[index].replace(textFilter, '').replace(/{(.*?)}/g, '').replace(/\\N/g, '');
      keys[key] = filteredText;
    }
    var vtt = "WEBVTT\r\n\r\n";
    for (const key in keys) {
      if (keys[key].length > 0) vtt += key + '\r\n' + keys[key] + '\r\n\r\n';
    }
    return vtt;
}
