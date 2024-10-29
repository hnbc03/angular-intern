import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NzGridModule, NzFlexModule, NzCardModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
