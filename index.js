// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByIXTPv9eNRLM6SSj8YURla9tKTT5Txas",
  authDomain: "malek-8737c.firebaseapp.com",
  projectId: "malek-8737c",
  storageBucket: "malek-8737c.firebasestorage.app",
  messagingSenderId: "1060789362555",
  appId: "1:1060789362555:web:e3c057693928f04926e7de",
  measurementId: "G-HC4Z8JPYTX"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Accounts and Authentication
const accounts = {
    teacher: {
        password: 'malek',
    }
};

// Function to log in
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error');

    if (username === 'teacher' && password === accounts.teacher.password) {
        showTeacherDashboard();
    } else {
        // Check if it's a student account
        db.collection('students').doc(username).get().then((doc) => {
            if (doc.exists && doc.data().password === password) {
                showStudentDashboard(username);
            } else {
                errorMessage.textContent = 'Invalid username or password.';
            }
        }).catch((error) => {
            console.error("Error fetching document: ", error);
            errorMessage.textContent = 'Error during login. Please try again.';
        });
    }
}

// Function to show student dashboard
function showStudentDashboard(username) {
    document.querySelector('.login-form').classList.add('hidden');
    document.getElementById('studentDashboard').classList.remove('hidden');

    db.collection('students').doc(username).get().then((doc) => {
        if (doc.exists) {
            const grades = doc.data().grades || { exam: null, homework: null, classwork: null, quiz: null };
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
    }).catch((error) => {
        console.error("Error getting document:", error);
    });
}

// Function to show teacher dashboard
function showTeacherDashboard() {
    document.querySelector('.login-form').classList.add('hidden');
    document.getElementById('teacherDashboard').classList.remove('hidden');
}

// Function to logout
function logout() {
    document.querySelector('.login-form').classList.remove('hidden');
    document.getElementById('studentDashboard').classList.add('hidden');
    document.getElementById('teacherDashboard').classList.add('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('error').textContent = '';
}

// Function to add grades
function addGrades() {
    const studentName = document.getElementById('studentName').value;
    const exam = parseInt(document.getElementById('exam').value);
    const homework = parseInt(document.getElementById('homework').value);
    const classwork = parseInt(document.getElementById('classwork').value);
    const quiz = parseInt(document.getElementById('quiz').value);

    if (studentName) {
        db.collection('students').doc(studentName).set({
            grades: {
                exam,
                homework,
                classwork,
                quiz
            }
        }, { merge: true })
        .then(() => {
            alert('Grades added successfully!');
            document.getElementById('studentName').value = '';
            document.getElementById('exam').value = '';
            document.getElementById('homework').value = '';
            document.getElementById('classwork').value = '';
            document.getElementById('quiz').value = '';
        })
        .catch((error) => {
            console.error("Error adding grades: ", error);
        });
    } else {
        alert('Please enter a student name.');
    }
}

// Optional: A function to check if a student exists
function checkIfStudentExists(studentName) {
    db.collection('students').doc(studentName).get().then((doc) => {
        return doc.exists;
    }).catch((error) => {
        console.error("Error checking student: ", error);
        return false;
    });
}
