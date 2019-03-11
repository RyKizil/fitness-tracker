import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSub: Subscription;

  constructor(private authService: AuthService, private ui: UIService) { }

  ngOnInit() {
    this.loadingSub = this.ui.loadingStateChanged.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  onSubmit(form: NgForm){
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })
  }
  ngOnDestroy(){
    this.loadingSub.unsubscribe();
  }
}
