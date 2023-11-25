# Quiz App API

This is a simple Node.js Express application for a quiz app, providing an API to retrieve questions based on specified criteria.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoint](#api-endpoint)
- [Request Body](#request-body)
- [Questions Service](#questions-service)
- [Error Handling](#error-handling)

## Introduction

This application serves as the backend for a quiz app, allowing users to retrieve questions based on their desired difficulty levels and total marks. The API is designed to be straightforward, with a single endpoint to request questions.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alpha951/reelo
   ```

2. Navigate to the project directory:

   ```bash
   cd reelo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   node index.js
   ```

## Usage

The application provides a RESTful API to fetch questions for a quiz. Refer to the [API Endpoint](#api-endpoint) and [Request Body](#request-body) sections for details on making requests.

## API Endpoint

- **Endpoint:** `/api/v1/questions`
- **Method:** `POST`

## Request Body

The endpoint expects the following JSON structure in the request body:

```json
{
  "totalMarks": 100,
  "easyPercentage": 30,
  "mediumPercentage": 40,
  "hardPercentage": 30
}
```

- `totalMarks`: Total marks for the quiz.
- `easyPercentage`: Percentage of easy questions.
- `mediumPercentage`: Percentage of medium questions.
- `hardPercentage`: Percentage of hard questions.

## Questions Service

The core functionality is implemented in the `question.service.js` file. This service handles the loading and selection of questions based on the provided criteria.

### Functions

#### `loadQuestions(filePath: string): Promise`

Loads questions from the specified JSON file.

#### `getQuestions(data: object): Promise`

Selects questions based on the provided criteria (total marks and difficulty percentages).

### Usage

To use the `getQuestions` function, import it into your application:

```javascript
const questionService = require('./path/to/question.service.js');

// Example usage
const requestData = {
  totalMarks: 20,
  easyPercentage: 100,
  mediumPercentage: 0,
  hardPercentage: 0
};

questionService.getQuestions(requestData)
  .then(questions => console.log('Selected Questions:', questions))
  .catch(error => console.error('Error:', error));
```
```json
{
    "success": true,
    "message": "Successfully completed the request",
    "data": {
        "easy": [
            {
                "id": 1,
                "question": "What is the speed of light",
                "subject": "Physics",
                "topic": "Motion",
                "difficulty": "Easy",
                "marks": 5
            },
            {
                "id": 3,
                "question": "If an object is moving with constant speed, what can you say about its acceleration?",
                "subject": "Physics",
                "topic": "Motion",
                "difficulty": "Easy",
                "marks": 5
            },
            {
                "id": 6,
                "question": "What is the molecular structure of water?",
                "subject": "Chemistry",
                "topic": "Chemical Bonding",
                "difficulty": "Easy",
                "marks": 5
            },
            {
                "id": 10,
                "question": "What are isotopes in the context of atomic structure?",
                "subject": "Chemistry",
                "topic": "Atomic Structure",
                "difficulty": "Easy",
                "marks": 5
            }
        ],
        "medium": [],
        "hard": []
    },
    "error": {}
}

```

## Error Handling

The application uses the `AppError` class for error handling. Specific error messages and HTTP status codes are provided for different scenarios, ensuring clear communication with the client.