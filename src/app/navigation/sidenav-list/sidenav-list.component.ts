import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
@Output() closeSidenav = new EventEmitter();
isAuth = false;
authSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSub = this.authService.authChange.subscribe( e => {
      this.isAuth = e;
    });
  }
 onClose(){
  this.closeSidenav.emit();
 }
 ngOnDestroy(){
   this.authSub.unsubscribe();
 }

}
