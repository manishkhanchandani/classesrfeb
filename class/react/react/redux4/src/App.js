import React, { Component } from 'react';
import './App.css';

import SelectMenu from './SelectMenu';

class App extends Component {
  testCallBackFunction(selectedValue, e) {

		console.log("testCallBackFunction called... with OPTION value selected: ", selectedValue);

	}



	render() {

				console.log("ExtHeader Props", this.props);
                
               // currentCp supposed to be here. Value is: 'ext'

         const currentCp       = this.props.currentCp

		let defaultCpOption         = currentCp;
		const cpSelectName          = {name: 'switchCp'};
		const cpOptionsList         = [
		   {name: 'admin', text: 'Admin Control Panel' },
		   {name: 'ext', text: 'Extension Control Panel' },
		];

		return(
			<div className="form-group">
				<label htmlFor="switchCp">Switch Control Panel: </label><br />
				<SelectMenu defaultOption={defaultCpOption} selectName={cpSelectName} optionsList={cpOptionsList} cbFunction={this.testCallBackFunction.bind(this)} />
                        </div>
		);

	}
}

export default App;
