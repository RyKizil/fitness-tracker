import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
@Output() sidenavToggle = new EventEmitter();
isAuth = false;
authSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe( authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggle(){
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    //to prevent memory leak/ free memory after subscription is fullfilled
    this.authSubscription.unsubscribe();
  }

}
