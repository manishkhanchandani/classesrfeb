import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `<h1>{{title}} App</h1>
    <p>{{carPart.name}}</p>
    <p>{{carPart.description}}</p>
    <p>{{carPart.inStock}} in stock</p>`
})
export class AppComponent {
  title = 'Ultra Racing';
  carPart = {
    "id": 1,
    "name": "Super tires",
    "description": "These tires are the very best",
    "inStock": 5
  };
}
