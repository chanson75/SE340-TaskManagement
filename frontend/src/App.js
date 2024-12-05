import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import SuccessPage from './components/SuccessPage';
import TaskList from './components/TaskList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={TaskForm} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/tasks" component={TaskList} />
      </Switch>
    </Router>
  );
}

export default App;