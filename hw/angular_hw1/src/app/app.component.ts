import { Component } from '@angular/core';
import { bufferToggle } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.';
  titleStyle: string = '';
  btnStyles = [
    { color: 'blue', btnText: 'Set Blue' },
    { color: 'black', btnText: 'Set Blue' },
    { color: 'red', btnText: 'Set Red' },
    { color: 'green', btnText: 'Set Green' },
  ];

  toggle(color: string) {
    this.titleStyle = color;
  }
}
