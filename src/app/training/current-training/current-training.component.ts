import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent} from './stop-training.component';
import { TrainingService } from '../training.service';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

progress: number = 0;
timer: number;
message: string = 'stop';


  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startTimer();
  }
  startTimer(){
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if(this.progress >= 100){
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  completeTimer(){

  }

  cancelTimer(){}


  stopTimer(){
      clearInterval(this.timer);
      const dialogRef =  this.dialog.open(StopTrainingComponent, {
        data: {
          progress: this.progress
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.trainingService.cancelExercise(this.progress);
        }else{
          this.startTimer();
        }

      })
    
  }

}
