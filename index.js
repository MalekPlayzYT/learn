// Load My Subjects on page load
window.addEventListener('load', () => {
    loadSubjects();
});

// Event listeners for sidebar buttons
document.getElementById('subjectsBtn').addEventListener('click', loadSubjects);
document.getElementById('gradesBtn').addEventListener('click', loadGrades);
document.getElementById('examsBtn').addEventListener('click', loadExams);

// URLs for different weeks' content
const weekContentLinks = {
    1: {
        homework: 'https://forms.gle/sKwgHd5PQxaLUV4K9',
        classwork: 'https://forms.gle/EmkqUuBgYt7UdkkL7',
        quiz: 'https://forms.gle/6qV1jcYKV7QJaEYCA',
        video: 'https://video-url-week1.com'
    },
    2: {
        homework: 'https://form-url-week2-homework.com',
        classwork: 'https://form-url-week2-classwork.com',
        quiz: 'https://form-url-week2-quiz.com',
        video: 'https://video-url-week2.com'
    },
    3: {
        homework: 'https://form-url-week3-homework.com',
        classwork: 'https://form-url-week3-classwork.com',
        quiz: 'https://form-url-week3-quiz.com',
        video: 'https://video-url-week3.com'
    },
    4: {
        homework: 'https://form-url-week4-homework.com',
        classwork: 'https://form-url-week4-classwork.com',
        quiz: 'https://form-url-week4-quiz.com',
        video: 'https://video-url-week4.com'
    },
};

// Load the My Subjects section
function loadSubjects() {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>My Subjects</h2>';

    for (let week = 1; week <= 5; week++) {
        // Create a section for each week
        const weekSection = document.createElement('div');
        weekSection.className = 'week-section';
        weekSection.innerHTML = `<h3>Week ${week}</h3>`;

        // Toggle visibility of content
        weekSection.addEventListener('click', () => {
            const weekContent = weekSection.querySelector('.week-content');
            weekContent.style.display = weekContent.style.display === 'none' ? 'block' : 'none';
        });

        // Create buttons for each type of content
        const weekContent = document.createElement('div');
        weekContent.className = 'week-content';
        weekContent.style.display = 'none';
        weekContent.innerHTML = `
            <button onclick="window.open('${weekContentLinks[week].homework}')">Homework</button>
            <button onclick="window.open('${weekContentLinks[week].classwork}')">Classwork</button>
            <button onclick="window.open('${weekContentLinks[week].quiz}')">Quiz</button>
            <button onclick="window.open('${weekContentLinks[week].video}')">Video</button>
        `;

        weekSection.appendChild(weekContent);
        content.appendChild(weekSection);
    }
}

// Load My Grades section
function loadGrades() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>My Grades</h2>
        <div class="grade-section">
            <p>Exam: 0/65%</p>
            <p>Quiz: 0/15%</p>
            <p>Homework: 0/10%</p>
            <p>Classwork: 0/10%</p>
            <h3>Total Grade <b>0%<b> </h3>
        </div>
    `;
}

// Load Exams section
function loadExams() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Exams</h2>
        <div class="exam-info">
            <p><strong>Date:</strong> November 30, 2024</p>
            <p><strong>Time:</strong> 30 Min</p>
            <p><strong>Total Questions:</strong> 27</p>
            <button class="start-exam" onclick="window.open('https://candidate.speedexam.net/openquiz.aspx?quiz=C271823D33BC4776B369607B4E790714')">Start Exam</button>
        </div>
    `;
}
