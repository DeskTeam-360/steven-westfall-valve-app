function doGet(e) {
    var searchStatus = e.parameter.partNumber;
    var partNumber = e.parameter.partNumber;
    var model = e.parameter.model;
    var year = e.parameter.year;

    if (searchStatus==="All"){
        if (partNumber.charAt(0)==="W"){
            searchStatus = "Valve Seat";
        }else if (partNumber.charAt(0)==="M"){
            searchStatus = "Valve";
        }
    }


    switch (searchStatus) {
        case "Valve Seat":
            return searchValveSeat(partNumber);
        case "Valve":
            return searchValve(partNumber);
        default:
        // code block
    }
    // if (partNumber) {
    //   return searchValveSeat(partNumber);
    // } else if (model) {
    //   return searchModel(model);
    // } else if (year) {
    //   return searchYear(year);
    // } else {
    //   return ContentService.createTextOutput("No valid parameters provided").setMimeType(ContentService.MimeType.TEXT);
    // }
}

function searchValveSeat(partNumber) {
    var values = [];
    if (partNumber !== "") {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Engines");
        var head = sheet.getRange("A1:M1").getValues()[0];

        // Limit the search to column F
        var range = sheet.getRange("F:F");
        var data2 = range.createTextFinder(partNumber).matchCase(true).matchEntireCell(true);
        var results = data2.findAll();

        if (results.length > 0) {
            var firstMatchRow = results[0].getRowIndex();
            values = sheet.getRange("A" + firstMatchRow + ":M" + firstMatchRow).getValues()[0];
            var data =new Map()
            for (let i = 0; i < head.length; i++) {
                data[head[i]]=values[i];
            }
        }
    }
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function searchValve(partNumber) {
    var values = [];
    if (partNumber !== "") {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EnginesValves");
        var head = sheet.getRange("A1:H1").getValues()[0];

        // Limit the search to column F
        var range = sheet.getRange("E:E");
        var data2 = range.createTextFinder(partNumber).matchCase(true).matchEntireCell(true);
        var results = data2.findAll();

        if (results.length > 0) {
            var firstMatchRow = results[0].getRowIndex();
            values = sheet.getRange("A" + firstMatchRow + ":H" + firstMatchRow).getValues()[0];
            var data =new Map()
            for (let i = 0; i < head.length; i++) {
                data[head[i]]=values[i];
            }
        }
    }
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function searchModel(model) {
    // model value
}

function searchYear(year) {
    // year value
}

searchValveSeat("W-4617")