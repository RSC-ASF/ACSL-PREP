# ACSL Prep

An interactive web application to help students prepare for American Computer Science League (ACSL) competitions.

## Features

- 🔐 **Google Authentication** - Sign in with your Google account to track progress
- 📚 **4 Contest Tracks** - Comprehensive preparation for all ACSL contests
- 📝 **Short Problems** - Image-based questions with reveal-to-check answers
- 💻 **Programming Problems** - Code in Python, Java, or C++ with live execution
- 📊 **Progress Tracking** - See your completion rate and compare on the leaderboard
- 🏆 **Public Profiles** - View your stats and global ranking

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (ES6 Modules)
- **Backend**: Firebase (Authentication, Firestore Database)
- **Code Execution**: Piston API
- **Editor**: CodeMirror
- **Hosting**: GitHub Pages

## Project Structure

```
ACSL-PREP/
├── index.html              # Landing page
├── css/
│   └── styles.css          # Main stylesheet (red monotone theme)
├── js/
│   ├── firebase-config.js  # Firebase initialization
│   ├── auth.js             # Authentication module
│   └── app.js              # Main application logic
├── pages/
│   ├── contests.html       # Contest selection
│   ├── short-problems.html # Short problem viewer
│   ├── programming.html    # Programming IDE
│   ├── leaderboard.html    # Global rankings
│   └── profile.html        # User profile
└── problems/
    ├── contest1/
    │   ├── short/
    │   │   ├── questions/  # 1.png - 10.png
    │   │   └── answers/    # 1.png - 10.png
    │   └── programming/    # 1.json - 5.json
    ├── contest2/...
    ├── contest3/...
    └── contest4/...
```

## Adding Problems

### Short Problems
1. Add question image to `problems/contestX/short/questions/N.png`
2. Add answer image to `problems/contestX/short/answers/N.png`

### Programming Problems
Create a JSON file in `problems/contestX/programming/N.json`:

```json
{
    "id": 1,
    "title": "Problem Title",
    "difficulty": "Easy",
    "statement": "# Markdown problem statement",
    "examples": [
        {"input": "sample", "output": "result"}
    ],
    "testCases": [
        {"input": "test", "output": "expected"}
    ]
}
```

## Local Development

1. Clone the repository
2. Serve with any static server (e.g., `python -m http.server 8000`)
3. Open `http://localhost:8000`

## Deployment

This site is configured to deploy automatically to GitHub Pages from the main branch.

## Firebase Security Rules

Configure these rules in your Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read any profile (public leaderboard)
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## License

MIT License - See [LICENSE](LICENSE) for details.
