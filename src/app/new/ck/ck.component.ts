import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ck',
  templateUrl: './ck.component.html',
  styleUrls: ['./ck.component.css']
})
export class CkComponent implements OnInit {
  public model = {
    editorData: '<p>Hello, world!</p>'
};
  constructor() { }

  ngOnInit() {
  }

}
