export interface ExerciseStats {
  attempts: number;
  correct: number;
}

export interface UserProgress {
  totalAttempts: number;
  correctAnswers: number;
  completedExercises: number;
  exerciseStats: {
    chronology: ExerciseStats;
    parentDivision: ExerciseStats;
  };
}
