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


Basics:

1. Module Introduction

How angular page gets loaded and started:

in app.component.ts, we have following code
selector: 'app-root',

this app-root is the defined in index.html.

so this two are linked and we get app.component.html content inside this tag as defined by following code:
templateUrl: './app.component.html',

main.ts is the first file which is executed.
if you see following code in this file:
platformBrowserDynamic().bootstrapModule(AppModule);

it uses AppModule and bootstrap that module.

if you open app.module.ts, we have following
bootstrap: [AppComponent]

we pass app component and angular analyse it and knows the selector root and angular is able to handle the app-root and it inserts the AppComponent which has some template in html format.


__________________________________________________________________

Components are important:

Components are key features in angular js. We start with AppComponent (root component). Let's say if we have layout as header, navigation, left side content, right side content, footer. Each part will be a new component. So we create simple reusable components.

Let's see how components are created:

Let's say i want to show some server information. Create a folder server in app, as it holds server component.

Create a new file inside the server folder. Name it as server.component.ts. ts is typescript.

Use following code to create new component:

export class ServerComponent {

}

This is simple typescript class. Now we add some decorator to make it angular component.

@Component()
export class ServerComponent {

}

But we don't have component, so we need to import it from angular core as and we also put object inside the component with some json data information

import {Component} from '@angular/core';

@Component({
  selector: 'app-server', //unique selector
  templateUrl: './server.component.html' //relative path
})
export class ServerComponent {

}

Now add following code in app.module.ts to know about the new component: Open app.module.ts

import { ServerComponent } from './server/server.component';

and

declarations: [
    AppComponent,
    ServerComponent
  ],
  
Now, we can use ServerComponent.

We are also importing some modules inside the app.module.ts, we can also build our custom module and import it.

Add following in the app.component.html
<hr />
<app-server></app-server>

Above code will display everything from html created in ServerComponent.

__________________________________________________________________


We can also use cli command to create a new component, open new terminal, don't stop ng server window, and type following code:

ng generate component servers
or 
ng g c servers

