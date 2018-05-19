import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Main from './components/mainPage.jsx';


const App = () => (
  <div>
    <Main />
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
