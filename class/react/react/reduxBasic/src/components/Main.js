import React from 'react';

export const Main = (props) => {
    return (
      <div className="container">
        <h1>Main App</h1>
        <button onClick={() => props.changeUsername('Mango')}>Change</button>
      </div>
    );
}
