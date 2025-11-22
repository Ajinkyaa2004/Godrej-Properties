# Google Sheets Sync Script

This script will automatically fetch new leads from your website and add them to your Google Sheet.

## Step 1: Open Google Sheets

1.  Create a new Google Sheet.
2.  Name the first sheet `Leads`.
3.  Add these headers in Row 1:
    *   **A1**: Name
    *   **B1**: Email
    *   **C1**: Phone
    *   **D1**: Country
    *   **E1**: Date
    *   **F1**: Source
    *   **G1**: ID (Hidden)

## Step 2: Open Apps Script

1.  In your Google Sheet, go to **Extensions** > **Apps Script**.
2.  Delete any code in the editor.
3.  Copy and paste the code below:

```javascript
function syncLeads() {
  // REPLACE WITH YOUR LIVE WEBSITE URL
  // Note: This won't work with localhost. You must deploy your site first.
  var API_URL = 'https://godrejreserve.org.in/api/getContacts'; 
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  
  try {
    var response = UrlFetchApp.fetch(API_URL);
    var data = JSON.parse(response.getContentText());
    
    if (data.length === 0) {
      Logger.log('No data found');
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
      var lead = data[i];
      
      // Check if ID already exists
      if (existingIds.indexOf(lead._id) === -1) {
        var row = [
          lead.firstName + ' ' + lead.lastName,
          lead.email,
          lead.fullPhoneNumber || lead.phoneNumber,
          lead.country,
          new Date(lead.submittedAt).toLocaleString(),
          lead.sourcePage || 'Website',
          lead._id
        ];
        newRows.push(row);
      }
    }
    
    // Add new rows if any
    if (newRows.length > 0) {
      sheet.getRange(lastRow + 1, 1, newRows.length, newRows[0].length).setValues(newRows);
      Logger.log('Added ' + newRows.length + ' new leads');
    } else {
      Logger.log('No new leads to add');
    }
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
  }
}

function createTrigger() {
  // Run every 5 minutes
  ScriptApp.newTrigger('syncLeads')
      .timeBased()
      .everyMinutes(5)
      .create();
}
```

## Step 3: Configure & Run

1.  **Update URL**: Change `https://godrejreserve.org.in/api/getContacts` to your actual deployed URL.
2.  **Save**: Click the disk icon (Save project).
3.  **Run Once**: Select `syncLeads` from the dropdown and click **Run**.
    *   You will need to grant permissions (Review Permissions > Choose Account > Advanced > Go to Untitled Project (unsafe) > Allow).
4.  **Automate**: Select `createTrigger` and click **Run**. This will set it to check for new leads every 5 minutes automatically.

## Troubleshooting

*   **"Address unavailable"**: Google Sheets cannot access `localhost`. You must deploy your site to Vercel/Netlify first.
*   **Empty Data**: Check if your database has any contacts.
