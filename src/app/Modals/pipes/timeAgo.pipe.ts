import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'TimeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(Value: unknown): string {
    const value = new  Date(Value as string);
    if (!(value instanceof Date)) {
      console.error('Invalid date format. Please provide a valid Date object.');
      return '';
    }

    const now = new Date();
    const seconds = Math.floor(
      (now.getTime() - (value as Date).getTime()) / 1000
    );

    if (seconds < 60) {
      return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }

    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
}
