import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Settings from './pages/Settings/settings';

import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route path="/settings" component={ Settings } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
