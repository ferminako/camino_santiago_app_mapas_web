import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
@Injectable()
export class CapitalizePipe {
  
  transform(value, args) {
    value = value.toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
