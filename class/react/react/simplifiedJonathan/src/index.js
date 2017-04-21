import React from 'react';
import ReactDOM from 'react-dom';
import MenuRouter from './routes';

import { Provider } from 'react-redux';
import store from './store.js';

class Layout extends React.Component {
    render() {
        //console.log('testData', testData);
        //Pass the items listed in state as props to TodoList to render on screen
        return (
            <Provider store={store}>
                <MenuRouter/>
            </Provider>
        );
    }
}

ReactDOM.render(
    <Layout isDebug="0"/>,
    document.getElementById('root')
);
