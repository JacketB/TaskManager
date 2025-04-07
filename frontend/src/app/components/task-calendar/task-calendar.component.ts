import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';

@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.css']
})
export class TaskCalendarComponent implements OnInit {
  @Input() tasks: any[] = [];

  days: string[] = [];
  currentMonth: string = '';
  currentMoment: moment.Moment = moment(); // Храним текущую дату в объекте moment

  ngOnInit() {
    this.generateMonthDays();
    moment.locale('ru');
  }

  generateMonthDays() {
    const start = this.currentMoment.clone().startOf('month');
    const end = this.currentMoment.clone().endOf('month');
    const days = [];

    for (let m = start.clone(); m.isBefore(end); m.add(1, 'day')) {
      days.push(m.format('YYYY-MM-DD'));
    }

    this.days = days;
    this.currentMonth = start.format('MMMM YYYY');
  }

  // Функция для перехода на следующий месяц
  nextMonth() {
    this.currentMoment.add(1, 'month');
    this.generateMonthDays();
  }

  // Функция для перехода на предыдущий месяц
  prevMonth() {
    this.currentMoment.subtract(1, 'month');
    this.generateMonthDays();
  }

  // Проверка, есть ли задача на конкретный день
  isTaskOnDay(task: any, day: string): boolean {
    const due = moment(task.dueDate);
    const created = moment(task.created_at || task.createdAt || due); // если нет даты начала
    return moment(day).isBetween(created.clone().subtract(1, 'day'), due.clone().add(1, 'day'));
  }
}
