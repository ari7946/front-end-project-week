import React, { Component } from 'react'
import './index.css';
import NotesList from '../NotesList/NotesList';
import NoteView from '../NoteView/NoteView';
import CreateNote from '../CreateNote/CreateNote';
import EditNote from '../EditNote/EditNote';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { Route, Switch } from 'react-router-dom';

export default class MainContent extends Component {
  render() {
    return (
      <div className="main-container container">
        <Switch>
          <Route path='/' exact component={NotesList} />
          <Route path='/note/:id' exact component={NoteView} />
          <Route path='/create-note' exact component={CreateNote} />
          <Route path='/edit-note/:id' exact component={EditNote} /> 
          <Route path ="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
      </div>
    )
  }
}
