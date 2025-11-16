# 🗺️ API Reference Card

Quick reference for all Coffee Education Platform endpoints.

## Base URL
```
http://localhost:3000/api
```

---

## 📚 Lessons

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| GET | `/lessons` | Get all lessons | Lesson[] |
| GET | `/lessons/:id` | Get specific lesson | Lesson |
| GET | `/lessons/category/:category` | Filter by category | Lesson[] |
| GET | `/lessons/difficulty/:difficulty` | Filter by difficulty | Lesson[] |
| POST | `/lessons/next` | Get next lesson | Lesson \| null |

**POST body for `/lessons/next`:**
```json
{
  "completedLessonIds": ["lesson-001", "lesson-002"]
}
```

---

## ✏️ Quizzes

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| GET | `/quizzes` | Get all quizzes | Quiz[] |
| GET | `/quizzes/:id` | Get specific quiz | Quiz |
| GET | `/quizzes/lesson/:lessonId` | Get quiz for lesson | Quiz |
| GET | `/quizzes/:id/questions` | Get questions only | QuizQuestion[] |
| POST | `/quizzes/submit` | Submit answers | QuizResult |

**POST body for `/quizzes/submit`:**
```json
{
  "quizId": "quiz-001",
  "answers": [2, 1, 1]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "quizId": "quiz-001",
    "score": 3,
    "percentage": 100,
    "passed": true,
    "correctAnswers": 3,
    "totalQuestions": 3,
    "feedback": [...]
  }
}
```

---

## 📖 Recipes

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| GET | `/recipes` | Get all recipes | Recipe[] |
| GET | `/recipes/:id` | Get specific recipe | Recipe |
| GET | `/recipes/method/:method` | Filter by brew method | Recipe[] |
| GET | `/recipes/difficulty/:difficulty` | Filter by difficulty | Recipe[] |
| POST | `/recipes/:id/scale` | Scale recipe | Recipe |
| GET | `/recipes/:id/timer` | Get timer config | TimerConfig |
| GET | `/recipes/search/query?q=term` | Search recipes | Recipe[] |

**POST body for `/recipes/:id/scale`:**
```json
{
  "scaleFactor": 2.0
}
```

**Brew Methods:**
- `pour_over`
- `french_press`
- `espresso`
- `aeropress`
- `cold_brew`

---

## ☕ Brew Methods

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| GET | `/brew-methods` | Get all methods | BrewMethodInfo[] |
| GET | `/brew-methods/:method` | Get specific method | BrewMethodInfo |
| GET | `/brew-methods/compare/:m1/:m2` | Compare methods | Comparison |

**Example:**
```bash
GET /brew-methods/compare/pour_over/espresso
```

---

## 🧮 Calculator

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| POST | `/calculator/water` | Calculate water amount | Calculation |
| POST | `/calculator/coffee` | Calculate coffee amount | Calculation |
| POST | `/calculator/custom-ratio` | Calculate custom ratio | RatioCalculation |
| POST | `/calculator/validate` | Validate amounts | Validation |
| POST | `/calculator/scale` | Scale amounts | Scaled |
| GET | `/calculator/ratio/:method` | Get standard ratio | Ratio |

**POST body for `/calculator/water`:**
```json
{
  "coffeeGrams": 20,
  "method": "pour_over"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "coffeeGrams": 20,
    "waterMl": 320,
    "method": "pour_over",
    "ratio": "1:16"
  }
}
```

**POST body for `/calculator/validate`:**
```json
{
  "coffeeGrams": 20,
  "waterMl": 320,
  "method": "pour_over"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "valid": true
  }
}
```

---

## 📘 Glossary

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| GET | `/glossary` | Get all terms | GlossaryTerm[] |
| GET | `/glossary/:id` | Get specific term | GlossaryTerm |
| GET | `/glossary/category/:category` | Filter by category | GlossaryTerm[] |
| GET | `/glossary/:id/related` | Get related terms | GlossaryTerm[] |
| GET | `/glossary/search/query?q=term` | Search terms | GlossaryTerm[] |

**Categories:**
- `brewing`
- `tasting`
- `equipment`
- `origin`
- `processing`

---

## 🏥 System

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| GET | `/health` | Health check | Status |
| GET | `/` | API documentation | Endpoints |

---

## 📦 Standard Response Format

All endpoints return:

```typescript
{
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🔧 cURL Examples

### Get all lessons
```bash
curl http://localhost:3000/api/lessons
```

### Get specific recipe
```bash
curl http://localhost:3000/api/recipes/recipe-001
```

### Calculate water amount
```bash
curl -X POST http://localhost:3000/api/calculator/water \
  -H "Content-Type: application/json" \
  -d '{"coffeeGrams": 20, "method": "pour_over"}'
```

### Submit quiz
```bash
curl -X POST http://localhost:3000/api/quizzes/submit \
  -H "Content-Type: application/json" \
  -d '{"quizId": "quiz-001", "answers": [2, 1, 1]}'
```

### Scale recipe
```bash
curl -X POST http://localhost:3000/api/recipes/recipe-001/scale \
  -H "Content-Type: application/json" \
  -d '{"scaleFactor": 2}'
```

### Search recipes
```bash
curl "http://localhost:3000/api/recipes/search/query?q=espresso"
```

### Compare brew methods
```bash
curl http://localhost:3000/api/brew-methods/compare/pour_over/french_press
```

---

## 🎯 Testing Endpoints

### Lesson prerequisite flow
```bash
# 1. Get all lessons
curl http://localhost:3000/api/lessons

# 2. Complete some lessons
# 3. Get next available lesson
curl -X POST http://localhost:3000/api/lessons/next \
  -H "Content-Type: application/json" \
  -d '{"completedLessonIds": ["lesson-001", "lesson-002"]}'
```

### Quiz flow
```bash
# 1. Get quiz questions (without answers)
curl http://localhost:3000/api/quizzes/quiz-001/questions

# 2. Submit answers
curl -X POST http://localhost:3000/api/quizzes/submit \
  -H "Content-Type: application/json" \
  -d '{"quizId": "quiz-001", "answers": [2, 1, 1]}'
```

### Recipe scaling flow
```bash
# 1. Get original recipe
curl http://localhost:3000/api/recipes/recipe-001

# 2. Scale recipe
curl -X POST http://localhost:3000/api/recipes/recipe-001/scale \
  -H "Content-Type: application/json" \
  -d '{"scaleFactor": 1.5}'

# 3. Get timer config for scaled recipe
curl http://localhost:3000/api/recipes/recipe-001/timer
```

---

## 💡 Tips

1. **CORS is enabled** - Can call from any origin in development
2. **All POST endpoints** accept JSON (`Content-Type: application/json`)
3. **IDs are strings** - e.g., `"lesson-001"`, `"quiz-001"`
4. **Case-sensitive** - Enum values use `snake_case` (e.g., `pour_over`)
5. **Query params** - Use `?q=term` for search endpoints

---

## 🚦 Status Codes

- `200` - Success
- `400` - Bad Request (invalid input)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

---

**Need more details?** Check `PROJECT_SUMMARY.md` or visit http://localhost:3000/api when running! ☕
