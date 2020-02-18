
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Cukzz blog';
  constructor(private meta: Meta) {  this.meta.addTags([
    {name: 'description', content: 'How to use Angular 4 meta service'},
    {name: 'author', content: 'talkingdotnet'},
    {name: 'keywords', content: 'Angular, Meta Service'}
  ]);

}

}
