# ACSL Prep - Problems Directory

This folder contains all practice problems organized by contest.

## Directory Structure

```
problems/
├── contest1/
│   ├── short/
│   │   ├── questions/     # Question images (1.png, 2.png, etc.)
│   │   └── answers/       # Answer images (1.png, 2.png, etc.)
│   └── programming/       # Programming problem JSON files
├── contest2/
│   ├── short/
│   │   ├── questions/
│   │   └── answers/
│   └── programming/
├── contest3/
│   ├── short/
│   │   ├── questions/
│   │   └── answers/
│   └── programming/
└── contest4/
    ├── short/
    │   ├── questions/
    │   └── answers/
    └── programming/
```

## Short Problems (Image-Based)

Short problems use image files for both questions and answers.

### Adding Short Problems

1. Create a PNG image for the question and save it as `problems/contestX/short/questions/N.png`
2. Create a PNG image for the answer and save it as `problems/contestX/short/answers/N.png`
3. Question 1.png corresponds to Answer 1.png, etc.

**Naming convention:** `1.png`, `2.png`, `3.png`, ... `10.png`

## Programming Problems (JSON-Based)

Programming problems use JSON files with the following structure:

### JSON Format

```json
{
    "id": 1,
    "title": "Problem Title",
    "difficulty": "Easy|Medium|Hard",
    "statement": "# Markdown formatted problem statement\n\nMulti-line description...",
    "examples": [
        {
            "input": "sample input",
            "output": "expected output"
        }
    ],
    "testCases": [
        {
            "input": "test input",
            "output": "expected output"
        }
    ]
}
```

### Adding Programming Problems

1. Create a JSON file following the format above
2. Save it as `problems/contestX/programming/N.json`
3. The `statement` field supports full Markdown formatting
4. `examples` are shown to users, `testCases` include hidden tests

**Naming convention:** `1.json`, `2.json`, `3.json`, `4.json`, `5.json`

## Problem Counts

Each contest should have:
- **10 Short Problems** (questions/answers pairs)
- **5 Programming Problems** (JSON files)

Total: 60 problems across all 4 contests
