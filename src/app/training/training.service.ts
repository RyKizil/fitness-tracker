import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [
        {id: 'crunches', name: 'Crunches', duration: 120, calories: 20},
        {id: 'benchpress', name: 'Benchpress', duration: 30, calories: 40},
        {id: 'pullup', name: 'Pullups', duration: 20, calories: 30}
    ];

    getExercises(){
        return this.availableExercises.slice(); // return copy of this reference
    }


}