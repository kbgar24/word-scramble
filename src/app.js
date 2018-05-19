import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import LetterGenerator from './components/letterGenerator.jsx';


const App = () => (
  <div>
    <LetterGenerator />
    {/* <BrowserRouter>
      <Switch>
        <Route path='/' component={ MainPage } exact={ true } ></Route>
        <Route path='/two' component={ PageTwo }></Route>
        <Route component={ NotFoundPage }></Route>
      </Switch>
    </BrowserRouter> */}
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
