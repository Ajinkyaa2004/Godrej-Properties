# Google Sheets Sync Guide (Visits)

This guide explains how to sync "Schedule Visit" form data to a separate sheet.

## Step 1: Update Google Sheet

1.  Open your existing Google Sheet.
2.  Create a new tab (click `+` at the bottom).
3.  Rename the new tab to `Visits` (Case sensitive).
4.  Add these headers in Row 1:
    *   **A1**: Name
    *   **B1**: Phone
    *   **C1**: Preferred Date
    *   **D1**: Country
    *   **E1**: Submitted At
    *   **F1**: Source
    *   **G1**: ID (Hidden)

## Step 2: Update Apps Script

1.  Go to **Extensions** > **Apps Script**.
2.  Add the following new function below your existing code:

```javascript
function syncVisits() {
  // REPLACE WITH YOUR LIVE WEBSITE URL
  var API_URL = 'https://www.godrejreserve.org.in/api/getVisits'; 
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Visits');
  
  try {
    var response = UrlFetchApp.fetch(API_URL);
    var data = JSON.parse(response.getContentText());
    
    if (data.length === 0) {
      Logger.log('No visit data found');
      return;
    }
    
    // Get existing IDs to prevent duplicates
    var lastRow = sheet.getLastRow();
    var existingIds = [];
    if (lastRow > 1) {
      existingIds = sheet.getRange(2, 7, lastRow - 1, 1).getValues().flat();
    }
    
    var newRows = [];
    
    // Loop through data (reverse to add oldest first if multiple new ones)
    for (var i = data.length - 1; i >= 0; i--) {
      var visit = data[i];
      
      // Check if ID already exists
      if (existingIds.indexOf(visit._id) === -1) {
        var row = [
          visit.fullName,
          visit.fullPhoneNumber || visit.phoneNumber,
          new Date(visit.preferredDate).toLocaleDateString(), // Format preferred date
          visit.country,
          new Date(visit.submittedAt).toLocaleString(),
          visit.sourcePage || 'Website',
          visit._id
        ];
        newRows.push(row);
      }
    }
    
    // Add new rows if any
    if (newRows.length > 0) {
      sheet.getRange(lastRow + 1, 1, newRows.length, newRows[0].length).setValues(newRows);
      Logger.log('Added ' + newRows.length + ' new visits');
    } else {
      Logger.log('No new visits to add');
    }
    
  } catch (error) {
    Logger.log('Error syncing visits: ' + error.toString());
  }
}

function createVisitTrigger() {
  // Run every 5 minutes
  ScriptApp.newTrigger('syncVisits')
      .timeBased()
      .everyMinutes(5)
      .create();
}
```

## Step 3: Deploy & Run

1.  **Deploy Website**: You must redeploy your website to Vercel so the new `/api/getVisits` route goes live.
2.  **Run Script**:
    *   Select `syncVisits` and click **Run**.
    *   Select `createVisitTrigger` and click **Run** to automate it.
