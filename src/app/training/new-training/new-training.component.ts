import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';





@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

exercises: Exercise[];
exerciseSubscription: Subscription;
loading = false;


  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercise => {
      if(exercise != null){
        this.exercises = exercise;
        this.loading = true;
      }else {
        this.loading = false;
      }
    });
    
    this.trainingService.fetchExercises();
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }
 onStartTraining(form: NgForm){
  this.trainingService.startExercise(form.value.exercise);
 }
}
