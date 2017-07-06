import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
<<<<<<< HEAD
    allowNewServer = false;
    serverCreationStatus = 'No server was created!';
    serverName = 'Test Server';
    
  constructor() { 
    setTimeout(() => {
        this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
=======
	allowNewServer = false;
	
  	constructor() { }

  	ngOnInit() {
>>>>>>> 5a043bb32ce62c50465ced081ce65e3339c18830
  }
  
  onCreateServer() {
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }
  
  onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
