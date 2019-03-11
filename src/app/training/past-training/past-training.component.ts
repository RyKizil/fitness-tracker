import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
 displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
 datasource = new MatTableDataSource<Exercise>(); // expects an array
 private exChangedSub: Subscription;

 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exChangedSub = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      this.datasource.data = exercises;
    });
    this.trainingService.fetchCompletedOrCancelled();
  }

  ngAfterViewInit(){
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  doFilter(filterValue: string){
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(){
    this.exChangedSub.unsubscribe();
  }

}
