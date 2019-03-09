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

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercise =>  this.exercises = exercise);
    this.trainingService.fetchExercises();
    // this.exercises = this.db.collection("availableExercises")
    // .snapshotChanges()
    // // .subscribe(element => {
    // //   for (const e of element) {
    // //     let arr = e.payload.doc.data();
    // //     this.exercises.push()
    // //     console.log(e.payload.doc.data());
    // //   }
    // // });
    // .map(docArray => {
    //   return docArray.map(el => {
        
    //       // id: doc.payload.doc.id,
    //       // name: doc.payload.doc.data(),
    //       // duration: doc.payload.doc.data(),
    //       // calories: doc.payload.doc.data()
    //       //console.log(doc.payload.doc.data())
    //       const data = el.payload.doc.data() as Exercise;
    //       const id = el.payload.doc.id;
    //       return { id, ...data};
        
    //   });
      
    // });
    
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }
 onStartTraining(form: NgForm){
  this.trainingService.startExercise(form.value.exercise);
 }
}
