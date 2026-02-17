# Workout Tracker - Project Plan 💪

<p align="center">
  <img src="https://skillicons.dev/icons?i=mongodb,express,react,nodejs" />
</p>
<p align="center">
  <strong>Build Your First Independent MERN Stack Project</strong>
</p>

---

## Why This Project is Perfect

✅ **Simple to start** - Just track exercises

✅ **Easy to expand** - Tons of feature ideas

✅ **Personal use** - You'll actually use it!

✅ **Portfolio worthy** - Shows full-stack skills

✅ **Real-world application** - Solves a real problem

---

## Phase 1: MVP (Minimum Viable Product) 🎯

### Goal: Get Something Working FAST

**Time Target: 2-3 days**

### Core Features (Keep it SUPER Simple)

1. ✅ Add a workout (exercise name, sets, reps, weight, date)
2. ✅ View list of all workouts
3. ✅ Edit a workout
4. ✅ Delete a workout

### Database Schema - Phase 1

```jsx
// backend/src/models/Workout.js

Workout {
  exerciseName: String (required) // e.g., "Bench Press"
  sets: Number (required)         // e.g., 3
  reps: Number (required)         // e.g., 10
  weight: Number                  // e.g., 135 (in lbs or kg)
  date: Date (default: Date.now)
  notes: String                   // Optional: "Felt strong today"
  createdAt: Date (auto)
  updatedAt: Date (auto)
}

```

### API Endpoints - Phase 1

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/workouts` | Get all workouts |
| GET | `/api/workouts/:id` | Get one workout |
| POST | `/api/workouts` | Create workout |
| PUT | `/api/workouts/:id` | Update workout |
| DELETE | `/api/workouts/:id` | Delete workout |

### UI Pages - Phase 1

1. **Home Page**
    - List of all workouts (newest first)
    - Each workout shows: Exercise name, sets, reps, weight, date
    - Click to edit
    - Delete button
2. **Create Page**
    - Simple form with:
        - Exercise name (text input)
        - Sets (number input)
        - Reps (number input)
        - Weight (number input)
        - Notes (textarea - optional)
    - Submit button
3. **Edit Page**
    - Same form as create, but pre-filled with existing data

### MVP Success Criteria

- [x]  Can add a workout
- [x]  Can see all workouts
- [x]  Can edit a workout
- [x]  Can delete a workout
- [x]  Data persists in MongoDB
- [x]  No errors in console
## Finished the mvp in 13/02/26

**🎯 STOP HERE AND GET THIS WORKING FIRST!**

---

## Phase 2: Better UX & Organization 📊

### Goal: Make it Actually Useful

**Time Target: 2-3 days**

### New Features

1. ✅ Group workouts by date
2. ✅ Show total volume (sets × reps × weight)
3. ✅ Filter by exercise name
4. ✅ Sort options (by date, by exercise)
5. ✅ Better date display
6. ✅ Loading states

### Database Schema - Phase 2 (No Changes Needed!)

Same as Phase 1

### New UI Features

**Home Page Improvements:**

```
┌─────────────────────────────────────┐
│  💪 GymTracker                      │
│  [+ Add Workout] [🔍 Search]        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📅 Today - January 15, 2026        │
│  ┌─────────────────────────────┐   │
│  │ Bench Press                 │   │
│  │ 3 sets × 10 reps × 135 lbs  │   │
│  │ Volume: 4,050 lbs           │   │
│  │ [Edit] [Delete]             │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ Squats                      │   │
│  │ 4 sets × 8 reps × 225 lbs   │   │
│  │ Volume: 7,200 lbs           │   │
│  │ [Edit] [Delete]             │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📅 Yesterday - January 14, 2026    │
│  ┌─────────────────────────────┐   │
│  │ Deadlifts                   │   │
│  │ 5 sets × 5 reps × 315 lbs   │   │
│  │ [Edit] [Delete]             │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘

```

### Code Additions

**Add Search/Filter:**

```jsx
// frontend/src/pages/HomePage.jsx

const [searchTerm, setSearchTerm] = useState('');

const filteredWorkouts = workouts.filter(workout =>
  workout.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
);

```

**Calculate Total Volume:**

```jsx
// frontend/src/lib/utils.js

export function calculateVolume(sets, reps, weight) {
  return sets * reps * weight;
}

export function formatVolume(volume) {
  return volume.toLocaleString(); // e.g., 4,050
}

```

**Group by Date:**

```jsx
// frontend/src/lib/utils.js

export function groupWorkoutsByDate(workouts) {
  return workouts.reduce((groups, workout) => {
    const date = new Date(workout.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(workout);
    return groups;
  }, {});
}

```

### Phase 2 Success Criteria

- [ ]  Workouts grouped by date
- [x]  Can search/filter exercises
- [x]  Volume calculations show correctly
- [ ]  Loading states look good
- [x]  Responsive on mobile

---

## Phase 3: Exercise Library & Quick Add 🏋️

### Goal: Faster Data Entry

**Time Target: 2-3 days**

### New Features

1. ✅ Pre-defined exercise list
2. ✅ Dropdown to select exercise (instead of typing)
3. ✅ "Quick add" - reuse previous workout
4. ✅ Exercise categories (Push, Pull, Legs)

### Updated Database Schema - Phase 3

```jsx
// Create NEW model: Exercise.js

Exercise {
  name: String (required, unique)
  category: String // "Push", "Pull", "Legs", "Core", "Cardio"
  muscleGroup: String // "Chest", "Back", "Legs", etc.
  createdAt: Date (auto)
}

// Existing Workout model - add reference
Workout {
  exerciseName: String (required) // Keep for now
  // OR
  exercise: ObjectId (ref: 'Exercise') // If you want to link to Exercise model
  sets: Number
  reps: Number
  weight: Number
  date: Date
  notes: String
}

```

### Seed Data - Common Exercises

```jsx
// backend/src/seedExercises.js

const exercises = [
  // Push
  { name: 'Bench Press', category: 'Push', muscleGroup: 'Chest' },
  { name: 'Overhead Press', category: 'Push', muscleGroup: 'Shoulders' },
  { name: 'Dips', category: 'Push', muscleGroup: 'Chest' },

  // Pull
  { name: 'Deadlift', category: 'Pull', muscleGroup: 'Back' },
  { name: 'Pull-ups', category: 'Pull', muscleGroup: 'Back' },
  { name: 'Barbell Row', category: 'Pull', muscleGroup: 'Back' },

  // Legs
  { name: 'Squats', category: 'Legs', muscleGroup: 'Quads' },
  { name: 'Leg Press', category: 'Legs', muscleGroup: 'Quads' },
  { name: 'Romanian Deadlift', category: 'Legs', muscleGroup: 'Hamstrings' },

  // Core
  { name: 'Plank', category: 'Core', muscleGroup: 'Abs' },
  { name: 'Crunches', category: 'Core', muscleGroup: 'Abs' },

  // Cardio
  { name: 'Running', category: 'Cardio', muscleGroup: 'Full Body' },
  { name: 'Cycling', category: 'Cardio', muscleGroup: 'Full Body' },
];

```

### New UI Features

**Create Page with Dropdown:**

```jsx
<select
  name="exerciseName"
  className="select select-bordered"
  value={formData.exerciseName}
  onChange={handleChange}
>
  <option value="">Select Exercise</option>
  <optgroup label="Push">
    <option value="Bench Press">Bench Press</option>
    <option value="Overhead Press">Overhead Press</option>
  </optgroup>
  <optgroup label="Pull">
    <option value="Deadlift">Deadlift</option>
    <option value="Pull-ups">Pull-ups</option>
  </optgroup>
  <optgroup label="Legs">
    <option value="Squats">Squats</option>
    <option value="Leg Press">Leg Press</option>
  </optgroup>
</select>

```

**Quick Add Feature:**

```jsx
// Get last workout for this exercise
const getLastWorkout = async (exerciseName) => {
  const response = await api.get(`/api/workouts/last/${exerciseName}`);
  return response.data;
};

// Pre-fill form with last workout data
const handleQuickAdd = async (exerciseName) => {
  const lastWorkout = await getLastWorkout(exerciseName);
  setFormData({
    exerciseName: lastWorkout.exerciseName,
    sets: lastWorkout.sets,
    reps: lastWorkout.reps,
    weight: lastWorkout.weight,
    notes: ''
  });
};

```

### Phase 3 Success Criteria

- [ ]  Exercise dropdown works
- [ ]  Can quickly repeat last workout
- [ ]  Exercises organized by category
- [ ]  Option to add custom exercises

---

## Phase 4: Progress Tracking & Stats 📈

### Goal: See Your Gains!

**Time Target: 3-4 days**

### New Features

1. ✅ Personal records (PRs) for each exercise
2. ✅ Progress charts (weight over time)
3. ✅ Weekly summary
4. ✅ Workout streaks

### Database Schema - Phase 4 (Add Stats)

```jsx
// Add to Workout model
Workout {
  // ... existing fields
  isPR: Boolean (default: false) // Mark personal records
  oneRepMax: Number (calculated) // Estimated 1RM
}

```

### New API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/workouts/stats` | Get overall stats |
| GET | `/api/workouts/prs` | Get personal records |
| GET | `/api/workouts/progress/:exercise` | Get progress for specific exercise |

### New Pages

**Stats/Dashboard Page:**

```
┌─────────────────────────────────────┐
│  📊 Your Stats                      │
├─────────────────────────────────────┤
│  🔥 Current Streak: 5 days          │
│  💪 Total Workouts: 127             │
│  📅 This Week: 4 workouts           │
│  ⚡ Total Volume: 1,234,567 lbs     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🏆 Personal Records                │
├─────────────────────────────────────┤
│  Bench Press: 185 lbs (3×8)         │
│  Squats: 275 lbs (5×5)              │
│  Deadlift: 365 lbs (1×1)            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📈 Progress Chart                  │
│  [Select Exercise: Bench Press ▼]   │
│                                     │
│  185lbs ●                           │
│  175lbs     ●                       │
│  165lbs         ●   ●               │
│  155lbs                 ●           │
│         Jan  Feb  Mar  Apr          │
└─────────────────────────────────────┘

```

### Chart Library

```bash
npm install recharts

```

```jsx
// Example progress chart
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const ProgressChart = ({ exercise }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch progress data for this exercise
    fetchProgressData(exercise);
  }, [exercise]);

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="weight" stroke="#00ff9d" />
    </LineChart>
  );
};

```

### Calculate 1 Rep Max

```jsx
// frontend/src/lib/utils.js

// Brzycki formula
export function calculateOneRepMax(weight, reps) {
  if (reps === 1) return weight;
  return weight * (36 / (37 - reps));
}

```

### Phase 4 Success Criteria

- [ ]  Can view personal records
- [ ]  Progress chart displays correctly
- [ ]  Stats page shows accurate data
- [ ]  Workout streak calculation works

---

## Phase 5: Advanced Features (Optional) 🚀

### Pick What Interests You!

**Workout Templates:**

- Save common workout routines
- "Chest Day", "Leg Day", etc.
- Add entire routine with one click

**Rest Timer:**

- Built-in timer between sets
- Push notifications when rest is over

**Workout Programs:**

- Follow pre-made programs (5x5, PPL, etc.)
- Track program progress

**Social Features:**

- Share PRs with friends
- Workout leaderboards

**Advanced Analytics:**

- Body weight tracking
- Body measurements
- Progress photos
- Muscle group balance

**Export Data:**

- Download workout history as CSV
- Backup to cloud

**Mobile App:**

- React Native version
- Offline support

---

## Development Timeline

### Week 1: MVP

- **Day 1-2:** Backend (models, controllers, routes)
- **Day 3-4:** Frontend (basic pages, components)
- **Day 5-6:** Integration, testing, bug fixes
- **Day 7:** Deploy and celebrate! 🎉

### Week 2: Polish & Phase 2

- Add grouping, search, volume calculations
- Improve UI/UX
- Make it responsive

### Week 3: Phase 3

- Exercise library
- Quick add feature
- Categories

### Week 4+: Advanced Features

- Pick and choose based on interest
- Keep building and improving!

---

## Tech Stack Recommendations

```jsx
// Exactly what you need

Backend:
- Express (web server)
- Mongoose (MongoDB)
- CORS
- Dotenv

Frontend:
- React + Vite
- React Router
- Axios
- Tailwind CSS + DaisyUI
- React Hot Toast (notifications)
- Lucide React (icons)

Optional (Phase 4):
- Recharts (for progress charts)
- date-fns (date manipulation)

```

---

## Quick Start Checklist

Before you code, prepare:

- [ ]  MongoDB Atlas account created
- [ ]  Node.js installed
- [ ]  VS Code ready
- [ ]  Git initialized
- [ ]  Project name decided (e.g., "GymTracker", "FitLog")
- [ ]  README template ready
- [ ]  Notebook for planning/notes

---

## Tips for Success

**Start Small:**

```jsx
// Don't do this on Day 1:
Workout {
  exerciseName: String,
  sets: Number,
  reps: Number,
  weight: Number,
  restTime: Number,
  tempo: String,
  RPE: Number,
  bodyWeight: Number,
  mood: String,
  location: String,
  equipment: Array,
  tags: Array,
  // ... 20 more fields
}

// Do this instead:
Workout {
  exerciseName: String,
  sets: Number,
  reps: Number,
  weight: Number,
  date: Date
}
// Add features later!

```

**Test As You Go:**

- After creating a model → Test in Postman
- After creating a page → Check it in browser
- After adding a feature → Make sure it works
- Don't write 1000 lines before testing!

**Git Commits:**

```bash
git commit -m "Add workout model"
git commit -m "Create workout controller"
git commit -m "Build create workout page"
git commit -m "Add delete functionality"
# Small, frequent commits!

```

**When Stuck:**

1. Read the error message
2. Console.log everything
3. Check network tab in DevTools
4. Google the error
5. Take a 15-minute break
6. Ask ChatGPT/Claude specific questions

---

## Example User Stories

To keep focused on what matters:

**MVP:**

- "As a user, I want to log my bench press workout so I can track it"
- "As a user, I want to see my workout history"
- "As a user, I want to edit a workout if I made a mistake"

**Phase 2:**

- "As a user, I want to see all workouts from today grouped together"
- "As a user, I want to search for a specific exercise"

**Phase 3:**

- "As a user, I want to select from common exercises instead of typing"
- "As a user, I want to repeat my last bench press workout"

**Phase 4:**

- "As a user, I want to see if I hit a new PR"
- "As a user, I want to see my bench press progress over time"

---

## MVP Code Skeleton

### Backend Model

```jsx
// backend/src/models/Workout.js
import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    exerciseName: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;

```

### Frontend Create Form

```jsx
// frontend/src/pages/CreatePage.jsx
const [formData, setFormData] = useState({
  exerciseName: '',
  sets: '',
  reps: '',
  weight: '',
  notes: '',
});

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.exerciseName || !formData.sets || !formData.reps) {
    toast.error('Please fill in required fields');
    return;
  }

  try {
    await api.post('/workouts', formData);
    toast.success('Workout logged!');
    navigate('/');
  } catch (error) {
    toast.error('Failed to log workout');
  }
};

```

---

## Success Metrics

**You'll know you're doing well when:**

✅ Week 1: MVP works end-to-end

✅ Week 2: You're using it for your actual workouts

✅ Week 3: Your friends ask for the link

✅ Week 4: It's on your resume/portfolio

✅ Week 6: You're adding custom features you thought of

---

## Final Advice

**Don't Overthink:**

- You don't need perfect UI on day 1
- You don't need every feature
- You don't need perfect code

**Do This:**

- Make it work first
- Make it pretty later
- Add features incrementally
- Deploy early, deploy often

**Remember:**

- Every pro dev started with simple CRUD apps
- Bugs are normal
- Googling is normal
- Taking breaks is essential
- YOU CAN DO THIS! 💪

---

## Ready?

1. Read through this whole plan
2. Start with Phase 1 MVP
3. Code for 2-3 hours
4. Take breaks
5. Test frequently
6. Commit to Git often
7. Keep building!

**Now stop reading and START CODING! 🚀**

You got this! 💪
