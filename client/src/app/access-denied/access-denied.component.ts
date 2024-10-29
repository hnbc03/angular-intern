import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [ NzButtonModule ],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.css'
})
export class AccessDeniedComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/homepage']);
  }
}
