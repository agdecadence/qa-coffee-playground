# ☕ Coffee Education Platform

A comprehensive TypeScript-based web application for learning about coffee, brewing methods, and mastering the art of coffee making.

## 🎯 Features

- **📚 Educational Lessons**: Learn about coffee origins, roasting, brewing methods, and tasting
- **✏️ Interactive Quizzes**: Test your coffee knowledge with detailed feedback
- **📖 Brewing Recipes**: Step-by-step guides for different brewing methods
- **☕ Brew Method Guide**: Comprehensive information about various brewing techniques
- **🧮 Brew Calculator**: Calculate coffee-to-water ratios for perfect brews
- **📘 Coffee Glossary**: Searchable dictionary of coffee terms

## 🛠️ Tech Stack

- **Backend**: TypeScript, Express.js, Node.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Testing**: Vitest
- **Package Manager**: pnpm
- **Linting**: ESLint

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd coffee-education-platform

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env
```

## 🚀 Running the Application

### Development Mode

```bash
pnpm dev
```

The application will start on `http://localhost:3000`

### Production Build

```bash
# Build TypeScript
pnpm build

# Start production server
pnpm start
```

## 🧪 Testing

```bash
# Run tests in watch mode
pnpm test

# Run tests once (CI mode)
pnpm test:ci
```

## 📡 API Endpoints

### Lessons

- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get lesson by ID
- `GET /api/lessons/category/:category` - Get lessons by category
- `GET /api/lessons/difficulty/:difficulty` - Get lessons by difficulty
- `POST /api/lessons/next` - Get next available lesson

### Quizzes

- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz by ID
- `GET /api/quizzes/lesson/:lessonId` - Get quiz by lesson ID
- `GET /api/quizzes/:id/questions` - Get quiz questions (without answers)
- `POST /api/quizzes/submit` - Submit quiz answers

### Recipes

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `GET /api/recipes/method/:method` - Get recipes by brew method
- `GET /api/recipes/difficulty/:difficulty` - Get recipes by difficulty
- `POST /api/recipes/:id/scale` - Scale a recipe
- `GET /api/recipes/:id/timer` - Get timer configuration
- `GET /api/recipes/search/query?q=<term>` - Search recipes

### Brew Methods

- `GET /api/brew-methods` - Get all brew methods
- `GET /api/brew-methods/:method` - Get brew method details
- `GET /api/brew-methods/compare/:method1/:method2` - Compare methods

### Calculator

- `POST /api/calculator/water` - Calculate water amount
- `POST /api/calculator/coffee` - Calculate coffee amount
- `POST /api/calculator/custom-ratio` - Calculate custom ratio
- `POST /api/calculator/validate` - Validate brew amounts
- `POST /api/calculator/scale` - Scale recipe
- `GET /api/calculator/ratio/:method` - Get standard ratio

### Glossary

- `GET /api/glossary` - Get all terms
- `GET /api/glossary/:id` - Get term by ID
- `GET /api/glossary/category/:category` - Get terms by category
- `GET /api/glossary/:id/related` - Get related terms
- `GET /api/glossary/search/query?q=<term>` - Search terms

## 📂 Project Structure

```
coffee-education-platform/
├── src/
│   ├── data/           # Static data (lessons, quizzes, recipes)
│   ├── models/         # TypeScript types and interfaces
│   ├── routes/         # Express route handlers
│   ├── services/       # Business logic layer
│   ├── utils/          # Utility functions
│   └── index.ts        # Application entry point
├── public/             # Static frontend files
│   ├── index.html      # Main HTML file
│   └── app.js          # Frontend JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## 🧩 Key Components

### Brew Methods Supported

- Pour Over (V60, Chemex, Kalita)
- French Press
- Espresso
- AeroPress
- Cold Brew

### Lesson Categories

- Coffee Origins & Varieties
- Roasting Levels
- Brewing Techniques
- Tasting & Flavor Profiles
- Coffee Terminology

## 🔧 Configuration

The application can be configured via environment variables:

```env
PORT=3000
NODE_ENV=development
```

## 📊 Use Case: GitHub Actions Testing

This application is designed for testing GitHub Models integration with QA automation workflows. The codebase provides:

- **Multiple API endpoints** for regression testing
- **Calculation logic** that can be tested for accuracy
- **Data validation** functions for testing edge cases
- **Complex business logic** in services layer
- **Type safety** with TypeScript interfaces

Perfect for experimenting with:
- Automated API testing
- Breaking change detection
- Regression impact analysis
- CI/CD pipeline integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `pnpm test`
5. Submit a pull request

## 📝 License

MIT License

## 👥 Author

Built with ♥ and ☕

---

**Happy Brewing! ☕**
