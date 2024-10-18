function doGet(e) {
    var partNumber = e.parameter.partNumber;
    var model = e.parameter.model;
    var year = e.parameter.year;
  
    if (partNumber) {
      return searchPartNumber(partNumber);
    } else if (model) {
      return searchModel(model);
    } else if (year) {
      return searchYear(year);
    } else {
      return ContentService.createTextOutput("No valid parameters provided").setMimeType(ContentService.MimeType.TEXT);
    }
  }
  
  function searchPartNumber(partNumber) {
    var values = [];
    
    if (partNumber != "") {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Engines");
      
      // Membatasi pencarian hanya di kolom E
      var range = sheet.getRange("F:F");
      var data2 = range.createTextFinder(partNumber).matchCase(true).matchEntireCell(true);
      var results = data2.findAll();
      
      var locationList = results.map(item => {
        return item.getRowIndex();
      });
      
      values = locationList.map(range => {
        return sheet.getRange("A" + range + ":M" + range).getValues()[0];
      });
    }
    
    // console.log(values);
    return ContentService.createTextOutput(JSON.stringify(values)).setMimeType(ContentService.MimeType.JSON);
  }
  
  function searchModel(model) {
    // model value
  }
  
  function searchYear(year) {
    // year value
  }