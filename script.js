// Form Elements
const studentForm = document.getElementById('studentForm');
const studentName = document.getElementById('studentName');
const studentEmail = document.getElementById('studentEmail');
const rollNumber = document.getElementById('rollNumber');
const clearBtn = document.getElementById('clearBtn');
const successMessage = document.getElementById('successMessage');

// Error Elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const rollError = document.getElementById('rollError');

// Validation Functions
function validateName() {
    const name = studentName.value.trim();
    if (name.length < 3) {
        studentName.classList.add('error');
        nameError.style.display = 'block';
        return false;
    }
    studentName.classList.remove('error');
    nameError.style.display = 'none';
    return true;
}

function validateEmail() {
    const email = studentEmail.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        studentEmail.classList.add('error');
        emailError.style.display = 'block';
        return false;
    }
    studentEmail.classList.remove('error');
    emailError.style.display = 'none';
    return true;
}

function validateRollNumber() {
    const roll = rollNumber.value.trim();
    if (roll.length < 5) {
        rollNumber.classList.add('error');
        rollError.style.display = 'block';
        return false;
    }
    rollNumber.classList.remove('error');
    rollError.style.display = 'none';
    return true;
}

// Real-time Validation
studentName.addEventListener('blur', validateName);
studentEmail.addEventListener('blur', validateEmail);
rollNumber.addEventListener('blur', validateRollNumber);

// Clear All Button
clearBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all fields?')) {
        studentForm.reset();
        studentName.classList.remove('error');
        studentEmail.classList.remove('error');
        rollNumber.classList.remove('error');
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        rollError.style.display = 'none';
        successMessage.classList.remove('show');
    }
});

// Form Submission
studentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isRollValid = validateRollNumber();

    if (isNameValid && isEmailValid && isRollValid) {
        const formData = new FormData(studentForm);

        fetch('save_student.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.trim() === "success") {
                successMessage.classList.add('show');
                studentForm.reset();
                setTimeout(() => successMessage.classList.remove('show'), 5000);
            } else {
                alert(data);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        if (!isNameValid) studentName.focus();
        else if (!isEmailValid) studentEmail.focus();
        else rollNumber.focus();
    }
});

// Reset Form
studentForm.addEventListener('reset', function() {
    studentName.classList.remove('error');
    studentEmail.classList.remove('error');
    rollNumber.classList.remove('error');
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    rollError.style.display = 'none';
    successMessage.classList.remove('show');
});
