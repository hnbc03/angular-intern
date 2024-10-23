import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NzLayoutModule,
    NzInputModule,
    NzIconModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzMenuModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  isCollapsed = true;

  constructor (private router:Router) {}
  
  navigateToHomepage():void {
    this.router.navigate(['/homepage']);
  }
}
