import React, { Component } from 'react'
import './index.css';
import axios from 'axios';

export default class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      message: '',
    }
  }

  componentWillMount = () => {
    localStorage.token ? null : this.props.history.push('/login');
  }

  handleSubmit = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const requestOptions = {
      headers: {
        Authorization: token,
        username
      }
    }
    axios
      .post(`${process.env.REACT_APP_API}/api/notes`, {
        title: this.state.title,
        message: this.state.message,
        username
      }, requestOptions)
      .then(() => this.props.history.push('/'))
      .catch(err => this.props.history.push('/login'))
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="form-group create-note">
        <h3 className="header mt-2">Create New Note:</h3>
        <input
          name='title'
          type="text" 
          className="w-75 py-2 form-control"
          placeholder="Note Title"
          onChange={(e) => this.handleChange(e)}
        /><br />
        <textarea
          name='message' 
          className="w-95 py-3 pl-4 form-control"
          placeholder="Note Content"
          rows="15"
          onChange={(e) => this.handleChange(e)}
        /><br />
        <button 
          type="submit" 
          className="btn-large custom-button-teal text-white mt-0"
          onClick={() => this.handleSubmit()}
        >
          Save
        </button>
      </div>
    )
  }
}
