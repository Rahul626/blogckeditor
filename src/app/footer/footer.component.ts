import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  aboutus =
  "i just finished html5 and css3 tutorial, before i move into JS and front end tools i need to practice more until i am comfortable using CSS and i am a bit struggling with it,, what do you recommend and is there a way i can improve my skills?";

  constructor() { }

  ngOnInit() {
  }

}
