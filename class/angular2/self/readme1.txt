Angular CLi
A commond line interface for Angular

ng-new
The angular cli makes it easy to create an application that already works, right out of the box. It already follows our best practices!

sudo npm install -g @angular/cli
ng new my-dream-app
cd my-dream-app
ng serve



Now go to browser and type following: http://localhost:4200

You will see some dummy text, which is provided by the angular cli.

Few links to learn more about angular js:

https://angular.io/docs/ts/latest/tutorial/
https://github.com/angular/angular-cli/wiki
http://angularjs.blogspot.ca/

__________________________________________________________________

Some Notes:
If you want to dive deeper into the CLI and learn more about its usage, have a look at its official documentation: https://github.com/angular/angular-cli/wiki

You encountered issues during the installation of the CLI or setup of a new Angular project?

A lot of problems are solved by making sure you're using the latest version of NodeJS, npm and the CLI itself.

Updating NodeJS:

Go to nodejs.org and download the latest version - uninstall (all) installed versions on your machine first.

Updating npm:

Run [sudo] npm install -g npm  (sudo  is only required on Mac/ Linux)

Updating the CLI

[sudo] npm uninstall -g angular-cli @angular/cli 

npm cache clean 

[sudo] npm install -g @angular/cli 

Here are some common issues & solutions:

Creation of a new project takes forever (longer than 3 minutes)
That happens on Windows from time to time => Try running the command line as administrator

You get an EADDR error (Address already in use)
You might already have another ng serve process running - make sure to quit that or use ng serve --port ANOTHERPORT  to serve your project on a new port

My changes are not reflected in the browser (App is not compiling)
Check if the window running ng serve  displays an error. If that's not the case, make sure you're using the latest CLI version and try restarting your CLI


__________________________________________________________________

We see src folder and inside src folder we have app folder, assets folder to save some assets, environments folder for keeping some variables available for whole application. 

app folder is the main folder for our working environment.
__________________________________________________________________


Exercise 1:
Open app.module.ts and add following lines in top section
import { FormsModule }   from '@angular/forms';

add following in imports
imports: [
    BrowserModule,
    FormsModule
  ],
  
Open app.component.html and add following:
<h1>{{title}}</h1>
<input type="text" [(ngModel)]="name">
<p>{{name}}</p>

Open app.component.ts
export class AppComponent {
  title = 'app2';
  name = '';
}

Run the page and type anything in the textbox, it will show below the text box.
__________________________________________________________________

Course Overview

1. Getting Started
2. The Basics
3. Components & Databinding
4. Directives
5. Services & Dependency Injection
6. Routing
7. Observables
8. Forms
9. Pipes
10. Http
11. Authentication
12. Optimizations & NgModules
13. Deployment
14. Animations and Testing
15. Real Project

__________________________________________________________________


Typescript
is used in Angular JS

More features than vanilla JS
e.g Types, Classes, Interfaces


Typescript -> Compiled to -> Javascript

__________________________________________________________________

Bootstrap for Styling

go to commandline: npm install --save bootstrap

open .angular-cli.json
and change following

      "styles": [
        "styles.css"
      ],
      
to

      "styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "styles.css"
      ],
      
__________________________________________________________________
