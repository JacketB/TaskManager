import {Component, Input, OnInit } from '@angular/core';
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

  daysOfWeek: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  calendarGrid: string[][] = [];

  ngOnInit() {
    this.generateMonthDays();
    moment.locale('ru');
  }

  generateMonthDays() {
    const startOfMonth = this.currentMoment.clone().startOf('month');
    const endOfMonth = this.currentMoment.clone().endOf('month');

    // Начинаем с понедельника перед началом месяца
    const startDate = startOfMonth.clone().startOf('week').add(1, 'day');
    if (startDate.day() !== 1) {
      startDate.subtract(1, 'day'); // откат к понедельнику, если не попали сразу
    }

    // Заканчиваем на воскресенье после конца месяца
    const endDate = endOfMonth.clone().endOf('week');
    if (endDate.day() !== 0) {
      endDate.add(7 - endDate.day(), 'day'); // до воскресенья
    }

    const grid: string[][] = [];
    let current = startDate.clone();
    while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
      const week: string[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(current.format('YYYY-MM-DD'));
        current.add(1, 'day');
      }
      grid.push(week);
    }

    this.calendarGrid = grid;
    this.currentMonth = this.currentMoment.format('MMMM YYYY');
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

  getTaskColor(task: any): string {
    const hash = this.stringToHash(task.title || task.id || JSON.stringify(task));
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`; // Нежные пастельные цвета
  }

  private stringToHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }

  isCurrentMonthDay(day: string): boolean {
    const date = moment(day);
    return date.month() === this.currentMoment.month();
  }
}
