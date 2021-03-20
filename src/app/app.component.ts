import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, auth: AuthService, router: Router){
    auth.user$.subscribe(user => {
      if(!user) return; 
    
      this.userService.save(user);

      let retrunUrl = localStorage.getItem('returnUrl');
      if(!retrunUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(retrunUrl);
      
    })
  }
}
