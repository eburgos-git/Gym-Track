// Workout Plan Data
const workoutPlan = {
    1: {
        name: "Día 1 - Tren Inferior + Core Rotacional",
        focus: "Potencia de piernas para tenis y estabilidad para golf",
        sections: [
            {
                title: "Calentamiento",
                time: "10 min",
                exercises: [
                    { name: "Movilidad de cadera", sets: "2x10 círculos cada lado", note: "" },
                    { name: "Rotaciones torácicas en cuadrupedia", sets: "2x8/lado", note: "" },
                    { name: "Activación glúteo medio con banda", sets: "2x15", note: "" }
                ]
            },
            {
                title: "Bloque Principal",
                time: "",
                exercises: [
                    { name: "Sentadilla goblet", sets: "3x10-12", note: "Control y profundidad" },
                    { name: "Peso muerto rumano", sets: "3x10", note: "Fortalece cadena posterior, clave para golf" },
                    { name: "Zancadas alternas", sets: "3x8/pierna", note: "Estabilidad para tenis" },
                    { name: "Elevaciones de talón", sets: "3x15", note: "Prevención lesiones aquiles" },
                    { name: "Pallof press", sets: "3x12/lado", note: "Anti-rotación, protege espalda en golf" },
                    { name: "Rotaciones con cable o banda", sets: "3x12/lado", note: "Simula swing y golpe de tenis" }
                ]
            }
        ]
    },
    2: {
        name: "Día 2 - Tren Superior + Corrección Escapular",
        focus: "Fortalecer zona afectada y optimizar swing/golpe",
        sections: [
            {
                title: "Calentamiento",
                time: "10 min",
                exercises: [
                    { name: "Band pull-aparts", sets: "2x15", note: "Activación escapular" },
                    { name: "Wall slides", sets: "2x10", note: "Movilidad hombro" },
                    { name: "Rotación externa con banda", sets: "2x12/brazo", note: "" }
                ]
            },
            {
                title: "Bloque Principal",
                time: "",
                exercises: [
                    { name: "Remo en banco", sets: "3x12", note: "Fortalece romboides y trapecio medio - PRIORIDAD" },
                    { name: "Press horizontal con mancuernas", sets: "3x10", note: "" },
                    { name: "Face pulls", sets: "4x15", note: "CLAVE para molestia escapular" },
                    { name: "Y-T-W en banco inclinado", sets: "3x8 cada posición", note: "Estabilizadores escapulares" },
                    { name: "Remo unilateral", sets: "3x10/lado", note: "Corrige desbalances" }
                ]
            },
            {
                title: "Bloque Correctivo Escapular",
                time: "ESENCIAL",
                exercises: [
                    { name: "Retracción escapular en pared", sets: "3x15", note: "Mantén 3 seg" },
                    { name: "Rotadores externos acostado", sets: "3x15/lado", note: "Prevención hombro" },
                    { name: "Plancha con toque de hombro", sets: "3x10/lado", note: "Estabilidad" }
                ]
            }
        ]
    },
    3: {
        name: "Día 3 - Potencia + Resistencia + Movilidad",
        focus: "Capacidad cardiovascular para tenis y explosividad",
        sections: [
            {
                title: "Calentamiento Dinámico",
                time: "10 min",
                exercises: [
                    { name: "Skipping bajo intensidad", sets: "2 min", note: "" },
                    { name: "Desplazamientos laterales", sets: "2x20m", note: "" },
                    { name: "Sprint corto", sets: "4x15m", note: "Recuperación caminando" }
                ]
            },
            {
                title: "Bloque de Potencia",
                time: "",
                exercises: [
                    { name: "Saltos al cajón o jump squats", sets: "4x6", note: "Explosividad para tenis" },
                    { name: "Medicine ball slams", sets: "3x10", note: "Simula remate" },
                    { name: "Swing con kettlebell", sets: "3x15", note: "Potencia de cadera para golf" }
                ]
            },
            {
                title: "Bloque Resistencia - Circuito Metabólico",
                time: "3 rondas, 90 seg descanso",
                exercises: [
                    { name: "Burpees modificados", sets: "x10", note: "" },
                    { name: "Mountain climbers", sets: "x20", note: "" },
                    { name: "Desplazamientos laterales", sets: "20 seg", note: "" },
                    { name: "Jumping jacks", sets: "x30", note: "" }
                ]
            },
            {
                title: "Movilidad Final",
                time: "10 min",
                exercises: [
                    { name: "Estiramiento pectoral en esquina", sets: "2x30 seg", note: "" },
                    { name: "Estiramiento dorsal ancho", sets: "2x30 seg/lado", note: "" },
                    { name: "Movilidad torácica con foam roller", sets: "2 min", note: "" }
                ]
            }
        ]
    }
};

// State Management
let state = {
    currentDay: 1,
    currentMonth: new Date(),
    workoutHistory: [],
    dailyHistory: [],
    currentWorkout: null,
    workoutTimer: null,
    workoutStartTime: null
};

// DOM Elements
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const dayBtns = document.querySelectorAll('.day-btn');
const workoutContent = document.getElementById('workout-content');
const startBtn = document.getElementById('start-workout');
const finishBtn = document.getElementById('finish-workout');
const modal = document.getElementById('exercise-modal');
const closeModal = document.querySelector('.close-modal');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderWorkout(state.currentDay);
    renderCalendar();
    updateStats();
    checkDailyRoutine();

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');

            if (tab.dataset.tab === 'calendar') renderCalendar();
            if (tab.dataset.tab === 'stats') updateStats();
        });
    });

    // Day switching
    dayBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (state.currentWorkout) return; // Don't allow switch during workout
            dayBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentDay = parseInt(btn.dataset.day);
            renderWorkout(state.currentDay);
        });
    });

    // Workout buttons
    startBtn.addEventListener('click', startWorkout);
    finishBtn.addEventListener('click', finishWorkout);

    // Modal close
    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // Daily routine
    document.getElementById('complete-daily').addEventListener('click', completeDailyRoutine);

    // Calendar navigation
    document.getElementById('prev-month').addEventListener('click', () => {
        state.currentMonth.setMonth(state.currentMonth.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        state.currentMonth.setMonth(state.currentMonth.getMonth() + 1);
        renderCalendar();
    });
});

// Render workout for selected day
function renderWorkout(day) {
    const workout = workoutPlan[day];
    let html = `<h2 style="font-size: 1rem; margin-bottom: 0.25rem;">${workout.name}</h2>`;
    html += `<p style="color: var(--text-light); font-size: 0.85rem; margin-bottom: 1rem;">${workout.focus}</p>`;

    if (state.currentWorkout) {
        html += `<div class="timer-display" id="timer">00:00</div>`;
    }

    workout.sections.forEach((section, sIdx) => {
        html += `<div class="workout-section">`;
        html += `<div class="section-title">${section.title}`;
        if (section.time) html += `<span class="section-subtitle">${section.time}</span>`;
        html += `</div>`;

        section.exercises.forEach((exercise, eIdx) => {
            const id = `ex-${day}-${sIdx}-${eIdx}`;
            const isCompleted = state.currentWorkout?.completed?.includes(id);
            html += `
                <div class="exercise-item ${isCompleted ? 'completed' : ''}" data-id="${id}">
                    <input type="checkbox" class="exercise-check" id="${id}" ${isCompleted ? 'checked' : ''} ${!state.currentWorkout ? 'disabled' : ''}>
                    <div class="exercise-info">
                        <div class="exercise-name">${exercise.name}</div>
                        <div class="exercise-sets">${exercise.sets}</div>
                        ${exercise.note ? `<div class="exercise-note">${exercise.note}</div>` : ''}
                    </div>
                </div>
            `;
        });

        html += `</div>`;
    });

    workoutContent.innerHTML = html;

    // Add event listeners for checkboxes
    document.querySelectorAll('.exercise-check').forEach(check => {
        check.addEventListener('change', (e) => {
            const item = e.target.closest('.exercise-item');
            const id = item.dataset.id;

            if (e.target.checked) {
                item.classList.add('completed');
                if (!state.currentWorkout.completed.includes(id)) {
                    state.currentWorkout.completed.push(id);
                }
            } else {
                item.classList.remove('completed');
                state.currentWorkout.completed = state.currentWorkout.completed.filter(i => i !== id);
            }
            saveState();
        });
    });

    // Update timer if workout in progress
    if (state.currentWorkout) {
        updateTimer();
    }
}

// Start workout
function startWorkout() {
    state.currentWorkout = {
        day: state.currentDay,
        startTime: new Date().toISOString(),
        completed: []
    };
    state.workoutStartTime = Date.now();

    startBtn.classList.add('hidden');
    finishBtn.classList.remove('hidden');
    document.querySelector('.day-selector').style.pointerEvents = 'none';
    document.querySelector('.day-selector').style.opacity = '0.5';

    renderWorkout(state.currentDay);

    state.workoutTimer = setInterval(updateTimer, 1000);
    saveState();
}

// Update timer display
function updateTimer() {
    const timerEl = document.getElementById('timer');
    if (!timerEl || !state.workoutStartTime) return;

    const elapsed = Math.floor((Date.now() - state.workoutStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    timerEl.textContent = `${minutes}:${seconds}`;
}

// Finish workout
function finishWorkout() {
    if (state.workoutTimer) {
        clearInterval(state.workoutTimer);
        state.workoutTimer = null;
    }

    const workout = {
        day: state.currentWorkout.day,
        date: new Date().toISOString().split('T')[0],
        startTime: state.currentWorkout.startTime,
        endTime: new Date().toISOString(),
        duration: Math.floor((Date.now() - state.workoutStartTime) / 1000),
        exercisesCompleted: state.currentWorkout.completed.length,
        totalExercises: getTotalExercises(state.currentWorkout.day)
    };

    state.workoutHistory.push(workout);
    state.currentWorkout = null;
    state.workoutStartTime = null;

    startBtn.classList.remove('hidden');
    finishBtn.classList.add('hidden');
    document.querySelector('.day-selector').style.pointerEvents = 'auto';
    document.querySelector('.day-selector').style.opacity = '1';

    renderWorkout(state.currentDay);
    saveState();

    // Show completion message
    alert(`¡Entrenamiento completado!\n\nDuración: ${formatDuration(workout.duration)}\nEjercicios: ${workout.exercisesCompleted}/${workout.totalExercises}`);
}

// Get total exercises for a day
function getTotalExercises(day) {
    let total = 0;
    workoutPlan[day].sections.forEach(section => {
        total += section.exercises.length;
    });
    return total;
}

// Format duration
function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Render calendar
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthEl = document.getElementById('current-month');

    const year = state.currentMonth.getFullYear();
    const month = state.currentMonth.getMonth();

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    monthEl.textContent = `${monthNames[month]} ${year}`;

    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    let html = dayNames.map(d => `<div class="calendar-day-header">${d}</div>`).join('');

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month">${prevMonthDays - i}</div>`;
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const isToday = dateStr === todayStr;
        const workout = state.workoutHistory.find(w => w.date === dateStr);
        const daily = state.dailyHistory.find(d => d.date === dateStr);

        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (workout) classes += ` has-workout day${workout.day}`;
        else if (daily) classes += ' has-workout daily';

        html += `<div class="${classes}" data-date="${dateStr}">${day}</div>`;
    }

    // Next month days
    const remaining = 42 - (firstDay + daysInMonth);
    for (let i = 1; i <= remaining; i++) {
        html += `<div class="calendar-day other-month">${i}</div>`;
    }

    grid.innerHTML = html;

    // Add click handlers
    grid.querySelectorAll('.calendar-day:not(.other-month)').forEach(dayEl => {
        dayEl.addEventListener('click', () => showDayDetail(dayEl.dataset.date));
    });
}

// Show day detail
function showDayDetail(dateStr) {
    const detailEl = document.getElementById('day-detail');
    const workout = state.workoutHistory.find(w => w.date === dateStr);
    const daily = state.dailyHistory.find(d => d.date === dateStr);

    if (!workout && !daily) {
        detailEl.classList.add('hidden');
        return;
    }

    let html = `<h3>${formatDate(dateStr)}</h3>`;

    if (workout) {
        html += `
            <div style="margin-top: 0.5rem;">
                <span class="workout-badge day${workout.day}">Día ${workout.day}</span>
                <p style="margin-top: 0.5rem; font-size: 0.9rem;">
                    Duración: ${formatDuration(workout.duration)}<br>
                    Ejercicios: ${workout.exercisesCompleted}/${workout.totalExercises}
                </p>
            </div>
        `;
    }

    if (daily) {
        html += `<p style="margin-top: 0.5rem; color: var(--success);">✓ Rutina diaria completada</p>`;
    }

    detailEl.innerHTML = html;
    detailEl.classList.remove('hidden');
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
}

// Update stats
function updateStats() {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Week workouts
    const weekWorkouts = state.workoutHistory.filter(w => new Date(w.date) >= startOfWeek);
    document.getElementById('week-workouts').textContent = `${weekWorkouts.length}/3`;

    // Month workouts
    const monthWorkouts = state.workoutHistory.filter(w => new Date(w.date) >= startOfMonth);
    document.getElementById('month-workouts').textContent = monthWorkouts.length;

    // Compliance rate
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const expectedWorkouts = Math.floor(daysInMonth / 7 * 3);
    const dayOfMonth = now.getDate();
    const expectedSoFar = Math.floor(dayOfMonth / 7 * 3) || 1;
    const compliance = Math.min(100, Math.round((monthWorkouts.length / expectedSoFar) * 100));
    document.getElementById('compliance-rate').textContent = `${compliance}%`;

    // Day stats
    const day1Count = state.workoutHistory.filter(w => w.day === 1).length;
    const day2Count = state.workoutHistory.filter(w => w.day === 2).length;
    const day3Count = state.workoutHistory.filter(w => w.day === 3).length;
    const maxCount = Math.max(day1Count, day2Count, day3Count, 1);

    document.getElementById('day1-count').textContent = day1Count;
    document.getElementById('day2-count').textContent = day2Count;
    document.getElementById('day3-count').textContent = day3Count;
    document.getElementById('day1-progress').style.width = `${(day1Count / maxCount) * 100}%`;
    document.getElementById('day2-progress').style.width = `${(day2Count / maxCount) * 100}%`;
    document.getElementById('day3-progress').style.width = `${(day3Count / maxCount) * 100}%`;

    // Recent workouts
    const recentList = document.getElementById('recent-list');
    const recent = state.workoutHistory.slice(-5).reverse();

    if (recent.length === 0) {
        recentList.innerHTML = '<li style="color: var(--text-light);">No hay entrenamientos registrados</li>';
    } else {
        recentList.innerHTML = recent.map(w => `
            <li>
                <span>${formatDate(w.date)}</span>
                <span class="workout-badge day${w.day}">Día ${w.day}</span>
            </li>
        `).join('');
    }
}

// Check and reset daily routine
function checkDailyRoutine() {
    const today = new Date().toISOString().split('T')[0];
    const dailyToday = state.dailyHistory.find(d => d.date === today);

    if (dailyToday) {
        document.querySelectorAll('.daily-check').forEach(check => {
            check.checked = true;
            check.disabled = true;
        });
        document.getElementById('complete-daily').textContent = '✓ Completada hoy';
        document.getElementById('complete-daily').disabled = true;
    }

    updateDailyStreak();
}

// Complete daily routine
function completeDailyRoutine() {
    const checks = document.querySelectorAll('.daily-check');
    const allChecked = Array.from(checks).every(c => c.checked);

    if (!allChecked) {
        alert('Completa todos los ejercicios antes de marcar la rutina como completada');
        return;
    }

    const today = new Date().toISOString().split('T')[0];

    if (!state.dailyHistory.find(d => d.date === today)) {
        state.dailyHistory.push({ date: today });
        saveState();
    }

    checks.forEach(c => c.disabled = true);
    document.getElementById('complete-daily').textContent = '✓ Completada hoy';
    document.getElementById('complete-daily').disabled = true;

    updateDailyStreak();
}

// Update daily streak
function updateDailyStreak() {
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];

        if (state.dailyHistory.find(d => d.date === dateStr)) {
            streak++;
        } else if (i > 0) {
            break;
        }
    }

    const streakEl = document.getElementById('daily-streak');
    if (streak > 0) {
        streakEl.innerHTML = `
            <div class="streak-number">${streak}</div>
            <div>día${streak > 1 ? 's' : ''} consecutivo${streak > 1 ? 's' : ''}</div>
        `;
    } else {
        streakEl.innerHTML = '<p>Completa la rutina diaria para comenzar tu racha</p>';
    }
}

// Local Storage
function saveState() {
    const saveData = {
        workoutHistory: state.workoutHistory,
        dailyHistory: state.dailyHistory,
        currentWorkout: state.currentWorkout,
        workoutStartTime: state.workoutStartTime
    };
    localStorage.setItem('gymTracker', JSON.stringify(saveData));
}

function loadState() {
    const saved = localStorage.getItem('gymTracker');
    if (saved) {
        const data = JSON.parse(saved);
        state.workoutHistory = data.workoutHistory || [];
        state.dailyHistory = data.dailyHistory || [];
        state.currentWorkout = data.currentWorkout || null;
        state.workoutStartTime = data.workoutStartTime || null;

        // Resume workout if in progress
        if (state.currentWorkout && state.workoutStartTime) {
            state.currentDay = state.currentWorkout.day;
            dayBtns.forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.day) === state.currentDay);
            });
            startBtn.classList.add('hidden');
            finishBtn.classList.remove('hidden');
            document.querySelector('.day-selector').style.pointerEvents = 'none';
            document.querySelector('.day-selector').style.opacity = '0.5';
            state.workoutTimer = setInterval(updateTimer, 1000);
        }
    }
}
