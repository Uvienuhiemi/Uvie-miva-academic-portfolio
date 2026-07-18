document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // MODULE 1: INTERACTIVE ACADEMIC PLANNER SYSTEM
    // ==========================================
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // In-memory Array state holding Planner items
    let academicTasks = [];

    if (taskList && addTaskBtn && taskInput) {
        
        // Add Task functionality
        const addTask = () => {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Task text input cannot be left empty!");
                return;
            }

            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false
            };

            academicTasks.push(newTask);
            taskInput.value = "";
            renderTasks();
        };

        // Render Tasks loop using standard DOM Manipulation
        const renderTasks = () => {
            taskList.innerHTML = "";
            
            academicTasks.forEach(task => {
                const li = document.createElement("li");
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div class="task-actions">
                        <button class="complete-btn" onclick="toggleTask(${task.id})">✓</button>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">✗</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        };

        // Event handler actions tied globally
        window.toggleTask = (id) => {
            academicTasks = academicTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
            renderTasks();
        };

        window.deleteTask = (id) => {
            academicTasks = academicTasks.filter(t => t.id !== id);
            renderTasks();
        };

        addTaskBtn.addEventListener("click", addTask);
        taskInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") addTask();
        });
    }

    // ==========================================
    // MODULE 2: CONTACT FORM VALIDATION ENGINE
    // ==========================================
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Stop native page reload

            // Form inputs
            const nameEl = document.getElementById("userName");
            const emailEl = document.getElementById("userEmail");
            const phoneEl = document.getElementById("userPhone");
            const msgEl = document.getElementById("userMessage");

            // Error displays
            const nameErr = document.getElementById("nameError");
            const emailErr = document.getElementById("emailError");
            const phoneErr = document.getElementById("phoneError");
            const msgErr = document.getElementById("messageError");

            // Track state validation status
            let isFormValid = true;

            // 1. Name Check (Empty check)
            if (nameEl.value.trim() === "") {
                nameErr.style.display = "block";
                isFormValid = false;
            } else {
                nameErr.style.display = "none";
            }

            // 2. Email Validation Regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailEl.value.trim())) {
                emailErr.style.display = "block";
                isFormValid = false;
            } else {
                emailErr.style.display = "none";
            }

            // 3. Phone Validation Regex (Only digits allowed check)
            const digitsOnlyRegex = /^\d+$/;
            if (!digitsOnlyRegex.test(phoneEl.value.trim())) {
                phoneErr.style.display = "block";
                isFormValid = false;
            } else {
                phoneErr.style.display = "none";
            }

            // 4. Message Field Check (Empty check)
            if (msgEl.value.trim() === "") {
                msgErr.style.display = "block";
                isFormValid = false;
            } else {
                msgErr.style.display = "none";
            }

            // Successful action message execution
            if (isFormValid) {
                alert("Success! Your form has been fully validated and submitted successfully.");
                contactForm.reset();
            }
        });
    }
});
