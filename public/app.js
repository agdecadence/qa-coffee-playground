// API Base URL
const API_URL = '/api';

// State management
let currentQuiz = null;
let selectedAnswers = [];

// Show section and update tabs
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Load data for the section
    loadSectionData(sectionId);
}

// Load data based on section
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'lessons':
            loadLessons();
            break;
        case 'quizzes':
            loadQuizzes();
            break;
        case 'recipes':
            loadRecipes();
            break;
        case 'methods':
            loadBrewMethods();
            break;
        case 'glossary':
            loadGlossary();
            break;
    }
}

// Load Lessons
async function loadLessons() {
    try {
        const response = await fetch(`${API_URL}/lessons`);
        const data = await response.json();
        
        if (data.success) {
            displayLessons(data.data);
        }
    } catch (error) {
        console.error('Error loading lessons:', error);
        document.getElementById('lessons-list').innerHTML = 
            '<div class="error">Failed to load lessons</div>';
    }
}

function displayLessons(lessons) {
    const container = document.getElementById('lessons-list');
    container.innerHTML = lessons.map(lesson => `
        <div class="card">
            <h3>${lesson.title}</h3>
            <div>
                <span class="badge badge-${lesson.difficulty}">${lesson.difficulty}</span>
                <span class="badge" style="background: #e0e0e0;">${lesson.category}</span>
                <span class="badge" style="background: #e0e0e0;">📖 ${lesson.duration} min read</span>
            </div>
            <button class="btn" onclick="viewLesson('${lesson.id}')">Read Lesson</button>
        </div>
    `).join('');
}

function viewLesson(lessonId) {
    fetch(`${API_URL}/lessons/${lessonId}`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const lesson = data.data;
                document.getElementById('lessons-list').innerHTML = `
                    <button class="btn" onclick="loadLessons()">← Back to Lessons</button>
                    <div class="card" style="margin-top: 20px;">
                        <h2>${lesson.title}</h2>
                        <div style="margin: 15px 0;">
                            <span class="badge badge-${lesson.difficulty}">${lesson.difficulty}</span>
                            <span class="badge" style="background: #e0e0e0;">${lesson.category}</span>
                        </div>
                        <div style="white-space: pre-line; line-height: 1.8;">${lesson.content}</div>
                    </div>
                `;
            }
        });
}

// Load Quizzes
async function loadQuizzes() {
    try {
        const response = await fetch(`${API_URL}/quizzes`);
        const data = await response.json();
        
        if (data.success) {
            displayQuizzes(data.data);
        }
    } catch (error) {
        console.error('Error loading quizzes:', error);
        document.getElementById('quizzes-list').innerHTML = 
            '<div class="error">Failed to load quizzes</div>';
    }
}

function displayQuizzes(quizzes) {
    const container = document.getElementById('quizzes-list');
    container.innerHTML = quizzes.map(quiz => `
        <div class="card">
            <h3>${quiz.title}</h3>
            <p>${quiz.questions.length} questions | Passing score: ${quiz.passingScore}%</p>
            <button class="btn" onclick="startQuiz('${quiz.id}')">Start Quiz</button>
        </div>
    `).join('');
}

async function startQuiz(quizId) {
    try {
        const response = await fetch(`${API_URL}/quizzes/${quizId}/questions`);
        const data = await response.json();
        
        if (data.success) {
            currentQuiz = { id: quizId, questions: data.data };
            selectedAnswers = new Array(data.data.length).fill(null);
            displayQuizQuestions();
        }
    } catch (error) {
        console.error('Error starting quiz:', error);
    }
}

function displayQuizQuestions() {
    const container = document.getElementById('quizzes-list');
    container.innerHTML = `
        <button class="btn" onclick="loadQuizzes()">← Back to Quizzes</button>
        <div style="margin-top: 20px;">
            ${currentQuiz.questions.map((q, qIndex) => `
                <div class="card">
                    <h3>Question ${qIndex + 1}</h3>
                    <p style="font-size: 1.1em; margin: 15px 0;">${q.question}</p>
                    ${q.options.map((option, oIndex) => `
                        <div class="quiz-option ${selectedAnswers[qIndex] === oIndex ? 'selected' : ''}" 
                             onclick="selectAnswer(${qIndex}, ${oIndex})">
                            ${String.fromCharCode(65 + oIndex)}. ${option}
                        </div>
                    `).join('')}
                </div>
            `).join('')}
            <button class="btn" onclick="submitQuiz()" 
                    ${selectedAnswers.includes(null) ? 'disabled' : ''}>
                Submit Quiz
            </button>
        </div>
    `;
}

function selectAnswer(questionIndex, optionIndex) {
    selectedAnswers[questionIndex] = optionIndex;
    displayQuizQuestions();
}

async function submitQuiz() {
    try {
        const response = await fetch(`${API_URL}/quizzes/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                quizId: currentQuiz.id,
                answers: selectedAnswers
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayQuizResults(data.data);
        }
    } catch (error) {
        console.error('Error submitting quiz:', error);
    }
}

function displayQuizResults(results) {
    const container = document.getElementById('quizzes-list');
    container.innerHTML = `
        <div class="card" style="text-align: center; background: ${results.passed ? '#d4edda' : '#f8d7da'};">
            <h2>${results.passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}</h2>
            <div class="timer">${results.percentage}%</div>
            <p style="font-size: 1.2em;">
                You got ${results.correctAnswers} out of ${results.totalQuestions} questions correct
            </p>
        </div>
        ${results.feedback.map(fb => `
            <div class="card" style="border-left-color: ${fb.isCorrect ? '#28a745' : '#dc3545'};">
                <h4>${fb.question}</h4>
                <p><strong>${fb.isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong></p>
                <p style="margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 4px;">
                    ${fb.explanation}
                </p>
            </div>
        `).join('')}
        <button class="btn" onclick="loadQuizzes()">Back to Quizzes</button>
    `;
}

// Load Recipes
async function loadRecipes() {
    try {
        const response = await fetch(`${API_URL}/recipes`);
        const data = await response.json();
        
        if (data.success) {
            displayRecipes(data.data);
        }
    } catch (error) {
        console.error('Error loading recipes:', error);
        document.getElementById('recipes-list').innerHTML = 
            '<div class="error">Failed to load recipes</div>';
    }
}

function displayRecipes(recipes) {
    const container = document.getElementById('recipes-list');
    container.innerHTML = `
        <div class="grid">
            ${recipes.map(recipe => `
                <div class="card">
                    <h3>${recipe.name}</h3>
                    <div style="margin: 10px 0;">
                        <span class="badge badge-${recipe.difficulty}">${recipe.difficulty}</span>
                        <span class="badge" style="background: #e0e0e0;">${recipe.brewMethod.replace('_', ' ')}</span>
                    </div>
                    <p>☕ ${recipe.coffeeAmount}g coffee | 💧 ${recipe.waterAmount}ml water</p>
                    <p>⏱️ ${Math.floor(recipe.brewTime / 60)} min ${recipe.brewTime % 60} sec</p>
                    <p style="margin-top: 10px;">
                        <strong>Flavors:</strong> ${recipe.flavorProfile.join(', ')}
                    </p>
                    <button class="btn" onclick="viewRecipe('${recipe.id}')">View Recipe</button>
                </div>
            `).join('')}
        </div>
    `;
}

function viewRecipe(recipeId) {
    fetch(`${API_URL}/recipes/${recipeId}`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const recipe = data.data;
                document.getElementById('recipes-list').innerHTML = `
                    <button class="btn" onclick="loadRecipes()">← Back to Recipes</button>
                    <div class="card" style="margin-top: 20px;">
                        <h2>${recipe.name}</h2>
                        <div style="margin: 15px 0;">
                            <span class="badge badge-${recipe.difficulty}">${recipe.difficulty}</span>
                            <span class="badge" style="background: #e0e0e0;">${recipe.brewMethod.replace('_', ' ')}</span>
                        </div>
                        <div class="result-box">
                            <p><strong>☕ Coffee:</strong> ${recipe.coffeeAmount}g</p>
                            <p><strong>💧 Water:</strong> ${recipe.waterAmount}ml</p>
                            <p><strong>🌡️ Temperature:</strong> ${recipe.waterTemp}°C</p>
                            <p><strong>⏱️ Total Time:</strong> ${Math.floor(recipe.brewTime / 60)}:${String(recipe.brewTime % 60).padStart(2, '0')}</p>
                            <p><strong>⚙️ Grind Size:</strong> ${recipe.grindSize}</p>
                        </div>
                        <h3 style="margin-top: 20px;">Brewing Steps</h3>
                        ${recipe.steps.map(step => `
                            <div class="step-instruction">
                                <strong>Step ${step.order}:</strong> ${step.instruction}
                                ${step.timer ? `<br><em>⏱️ ${step.duration} seconds</em>` : ''}
                            </div>
                        `).join('')}
                        ${recipe.tips && recipe.tips.length > 0 ? `
                            <h3 style="margin-top: 20px;">💡 Tips</h3>
                            <ul style="padding-left: 20px; line-height: 1.8;">
                                ${recipe.tips.map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                `;
            }
        });
}

// Load Brew Methods
async function loadBrewMethods() {
    try {
        const response = await fetch(`${API_URL}/brew-methods`);
        const data = await response.json();
        
        if (data.success) {
            displayBrewMethods(data.data);
        }
    } catch (error) {
        console.error('Error loading brew methods:', error);
        document.getElementById('methods-list').innerHTML = 
            '<div class="error">Failed to load brew methods</div>';
    }
}

function displayBrewMethods(methods) {
    const container = document.getElementById('methods-list');
    container.innerHTML = methods.map(method => `
        <div class="card">
            <h3>${method.name}</h3>
            <div style="margin: 10px 0;">
                <span class="badge badge-${method.difficulty}">${method.difficulty}</span>
                <span class="badge" style="background: #e0e0e0;">⏱️ ${Math.floor(method.typicalBrewTime / 60)} min</span>
                <span class="badge" style="background: #e0e0e0;">Ratio: ${method.coffeeToWaterRatio}</span>
            </div>
            <p style="margin: 15px 0;">${method.description}</p>
            <details style="margin-top: 15px;">
                <summary style="cursor: pointer; font-weight: 600; padding: 10px; background: #f8f9fa; border-radius: 4px;">
                    📦 Equipment Needed
                </summary>
                <ul style="padding: 15px 20px; line-height: 1.8;">
                    ${method.equipment.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </details>
            <details style="margin-top: 10px;">
                <summary style="cursor: pointer; font-weight: 600; padding: 10px; background: #f8f9fa; border-radius: 4px;">
                    ✅ Pros & ❌ Cons
                </summary>
                <div style="padding: 15px;">
                    <strong>Pros:</strong>
                    <ul style="padding-left: 20px; line-height: 1.8; margin-bottom: 10px;">
                        ${method.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                    <strong>Cons:</strong>
                    <ul style="padding-left: 20px; line-height: 1.8;">
                        ${method.cons.map(con => `<li>${con}</li>`).join('')}
                    </ul>
                </div>
            </details>
        </div>
    `).join('');
}

// Calculator
async function calculateWater() {
    const method = document.getElementById('calc-method').value;
    const coffee = parseFloat(document.getElementById('calc-coffee').value);
    
    if (!coffee || coffee <= 0) {
        alert('Please enter a valid coffee amount');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/calculator/water`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coffeeGrams: coffee, method })
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('calc-result').innerHTML = `
                <div class="result-box">
                    <h3>Calculation Result</h3>
                    <p><strong>☕ Coffee:</strong> ${data.data.coffeeGrams}g</p>
                    <p><strong>💧 Water:</strong> ${data.data.waterMl}ml</p>
                    <p><strong>📊 Ratio:</strong> ${data.data.ratio}</p>
                    <p><strong>☕ Method:</strong> ${data.data.method.replace('_', ' ')}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error calculating:', error);
    }
}

// Load Glossary
async function loadGlossary() {
    try {
        const response = await fetch(`${API_URL}/glossary`);
        const data = await response.json();
        
        if (data.success) {
            displayGlossary(data.data);
        }
    } catch (error) {
        console.error('Error loading glossary:', error);
        document.getElementById('glossary-list').innerHTML = 
            '<div class="error">Failed to load glossary</div>';
    }
}

function displayGlossary(terms) {
    const container = document.getElementById('glossary-list');
    container.innerHTML = `
        <div class="grid">
            ${terms.map(term => `
                <div class="card">
                    <h3>${term.term}</h3>
                    <span class="badge" style="background: #e0e0e0;">${term.category}</span>
                    <p style="margin-top: 10px;">${term.definition}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadLessons();
});
