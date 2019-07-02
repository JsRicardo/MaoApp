import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import { LayoutComp } from './pages/Layou';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path='/' component={LayoutComp}></Route>
      </Router>
    </Provider>
  );
}

export default App;
