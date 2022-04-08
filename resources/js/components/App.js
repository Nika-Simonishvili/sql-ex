import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import RoutesManager from "./routes/RoutesManager";

function App() {
  return (
    <>
      <RoutesManager />
    </>
  );
}

export default App;

if (document.getElementById('app')) {
  ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
}