const accounts = {
    Mariam: {
        password: 'mar123',
        grades: {
            exam: null,
            homework: null,
            classwork: null,
            quiz: null
        }
    },
    Cerine: {
        password: 'cer123',
        grades: {
            exam: null,
            homework: null,
            classwork: null,
            quiz: null
        }
    },
    teacher: {
        password: 'malek',
    }
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error');
    
    if (accounts[username] && accounts[username].password === password) {
        if (username === 'teacher') {
            showTeacherDashboard();
        } else {
            showStudentDashboard(username);
        }
    } else {
        errorMessage.textContent = 'Invalid username or password.';
    }
}

function showStudentDashboard(username) {
    document.querySelector('.login-form').classList.add('hidden');
    document.getElementById('studentDashboard').classList.remove('hidden');
    
    const grades = accounts[username].grades;
    const gradesContainer = document.getElementById('gradesContainer');
    
    if (grades.exam === null) {
        gradesContainer.innerHTML = `<p>Grades are not available yet.</p>`;
    } else {
        const totalScore = (grades.exam || 0) + (grades.homework || 0) + (grades.classwork || 0) + (grades.quiz || 0);
        gradesContainer.innerHTML = `
            <p>Exam: ${grades.exam} / 100</p>
            <p>Homework: ${grades.homework} / 20</p>
            <p>Class Work: ${grades.classwork} / 20</p>
            <p>Quiz: ${grades.quiz} / 30</p>
            <p>Total Score: ${totalScore} / 170</p>
        `;
    }
}

function showTeacherDashboard() {
    document.querySelector('.login-form').classList.add('hidden');
    document.getElementById('teacherDashboard').classList.remove('hidden');
}

function logout() {
    document.querySelector('.login-form').classList.remove('hidden');
    document.getElementById('studentDashboard').classList.add('hidden');
    document.getElementById('teacherDashboard').classList.add('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('error').textContent = '';
}

function addGrades() {
    const studentName = document.getElementById('studentName').value;
    const exam = parseInt(document.getElementById('exam').value);
    const homework = parseInt(document.getElementById('homework').value);
    const classwork = parseInt(document.getElementById('classwork').value);
    const quiz = parseInt(document.getElementById('quiz').value);
    
    if (accounts[studentName]) {
        accounts[studentName].grades = { exam, homework, classwork, quiz };
        alert('Grades added successfully!');
        document.getElementById('studentName').value = '';
        document.getElementById('exam').value = '';
        document.getElementById('homework').value = '';
        document.getElementById('classwork').value = '';
        document.getElementById('quiz').value = '';
    } else {
        alert('Student not found!');
    }
}