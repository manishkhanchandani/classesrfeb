import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'jumbotron',
  templateUrl: 'jumbotron.component.html',
})
export class JumbotronComponent  { 
  private jbtheading:string;
  private jbtText:string;
  private jbtBtnText:string;
  private jbtBtnUrl:string;

  constructor() {
    this.jbtheading = 'Hello World';
    this.jbtText = 'This is sample text in a jumbotron';
    this.jbtBtnText = 'Read More';
    this.jbtBtnUrl = '/about';
  }
 }