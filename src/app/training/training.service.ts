
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    private availableExercises: Exercise[] = [
        {id: 'crunches', name: 'Crunches', duration: 120, calories: 20},
        {id: 'benchpress', name: 'Benchpress', duration: 30, calories: 40},
        {id: 'pullup', name: 'Pullups', duration: 20, calories: 30}
    ];

    private runningExercise: Exercise;
    private exercises: Exercise[] = [];

    getExercises(){
        return this.availableExercises.slice(); // return copy of this reference
    }

    startExercise(selectedId: string){
        this.runningExercise = this.availableExercises.find( ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise(){
        this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number){
        this.exercises.push({...this.runningExercise, 
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(), 
            state: 'cancelled'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise(){
        return {...this.runningExercise};
    }
    getCompletedOrCancelled(){
        return this.exercises.slice();
    }


}