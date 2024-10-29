import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-event-box',
  standalone: true,
  imports: [CommonModule, NzFlexModule, NzPopoverModule, NzModalModule],
  templateUrl: './event-box.component.html',
  styleUrls: ['./event-box.component.css']
})
export class EventBoxComponent {
  @Input() item: any;

  isVisible = false;

  hasDetails = false;

  openModal(): void {
    this.isVisible = true;
    this.hasDetails = Array.isArray(this.item?.details) && this.item.details.length > 0;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
