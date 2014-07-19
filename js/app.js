// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {

  var request = null;

  $('button#run').click(function() {
    main();
  });

  var main = function() {

    var url = 'http://www.city.osaka.lg.jp/contents/wdu090/opendata/mapnavoskdat_csv/mapnavoskdat_kankouchou.csv';
    request = new XMLHttpRequest({ mozSystem: true });
    request.open('get', url, true);
    request.responseType = 'text';
    request.overrideMimeType("text/html;charset=Shift_JIS");
    request.addEventListener('error', errorCallback);
    request.addEventListener('load', successCallback);
    request.send();

  };

  var successCallback = function(data) {
    var data = request.response;
    var rows = $.csv.toArrays(data);
    var attr = { border: 1 };
    var elTable = $('<table/>', attr);
    rows.forEach(function(row) {
      var elTr = $('<tr/>');
      row.forEach(function(col) {
        var attr = {text: col};
        var elTd = $('<td/>', attr);
        elTd.appendTo(elTr);
      });
      elTr.appendTo(elTable)
    });
    elTable.appendTo($('#result'))
  };

  var errorCallback = function(data) {
    console.log(data);
  };

});
