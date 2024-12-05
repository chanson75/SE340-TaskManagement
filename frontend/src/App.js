import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import SuccessPage from './components/SuccessPage';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={TaskForm} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/tasks" component={TaskList} />
      </Switch>
    </div>
  );
}

export default App;