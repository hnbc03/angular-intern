import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EventBoxComponent } from '../event-box/event-box.component';
import { NzPopoverComponent } from 'ng-zorro-antd/popover';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    NzCalendarModule, 
    NzBadgeModule, 
    NzFlexModule, 
    NzToolTipModule, 
    NzIconModule, 
    EventBoxComponent, 
    NzPopoverComponent, 
    NzButtonComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  constructor(private router: Router) {}

  // Set danh sách lỗi
  listDataMap = {
    valid: [
      {
        content: 'Hợp lệ',
        details: [
          { text: 'Đi làm' },
          { text: 'Xác nhận' }
        ],
        icon: 'check',
        backgroundColor: '#D3EE98'
      }
    ],
    wrongLocation: [
      {
        content: 'Khác địa điểm chấm công',
        details: [{ text: 'Chờ giải trình' }],
        backgroundColor: '#C4D7FF'
      }
    ],
    leaveEarly: [
      {
        content: 'Về sớm',
        details: [{ text: 'Chờ giải trình' }],
        backgroundColor: '#FFCFB3'
      }
    ],
    noCheckinData: [
      {
        content: 'Không có dữ liệu chấm công',
        details: [{ text: 'Chờ giải trình' }],
        backgroundColor: '#98DED9'
      }
    ]
  };

  // Set sự kiện cho tháng 8
  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  // Kiểm tra ngày + tháng
  isEventDay(date: Date, targetDays: number[], targetMonth: number): boolean {
    return targetDays.includes(date.getDate()) && date.getMonth() === targetMonth;
  }

  // Chuyển sang trang đăng nhập
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
