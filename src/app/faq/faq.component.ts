import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  searchWord = '';
  questions : any = [];
  id;
  count = 0;
  sign = 'plus';


  // or minus if you want that first
  constructor ( private http : HttpClient, private router: Router){}
  postFaq(){
    this.http.get("http://localhost:3000/faq").subscribe(data =>{
      this.questions = data;
      // console.log(data);
      for(let i = 0; i<this.questions.length; i++) {
        this.questions[i]['show'] = true;
      }
    }, err=>{
        console.log('error :', err);
    });
  }

search() {
  this.count = 0;
  this.questions.forEach((e)=>{
    let i = e.Question.indexOf(this.searchWord);
    if(i > -1) {
      e.show = true;
    } else {
      e.show = false;
      this.count = this.count + 1;
    }
  });
}
toggleSign(id) {

  if(this.id == id) {
    this.id = -1;
  } else {
    this.id = id;
  }
}



}
