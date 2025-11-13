# MongoDB Setup Instructions

## Create .env.local file

You need to create a file called `.env.local` in your project root directory.

### Location:
```
/Users/ajinkya/Documents/My Files/godrej-project/.env.local
```

### Content:
```bash
MONGODB_URI=mongodb://localhost:27017/godrej-reserve
```

## Steps:
1. Open Terminal or Finder
2. Navigate to your project folder
3. Create new file named `.env.local` (include the dot at the beginning)
4. Add the MongoDB URI line above
5. Save the file
6. Restart your Next.js server

## Alternative - VS Code:
1. Right-click in your project folder in VS Code
2. Select "New File"
3. Name it `.env.local`
4. Add the MongoDB URI content
5. Save (Cmd+S)

## After creating the file:
- Restart your Next.js server
- Test the form submission
- Check MongoDB Compass for the data
