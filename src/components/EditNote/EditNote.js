import React, { Component } from 'react'
import './index.css';
import axios from 'axios';

export default class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      message: ''
    }
  }

  componentWillMount = () => {
    localStorage.token ? null : this.props.history.push('/login');
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const requestOptions = {
      headers: {
        Authorization: token,
        username
      }
    }
    axios
      .get(`http://localhost:8000/api/notes/${this.props.match.params.id}`, requestOptions)
      .then(res => this.setState({ 
        title: res.data[0].title,
        message: res.data[0].message
      }))
      .catch(err => this.props.history.push('/login'))
  }

  handleUpdate = (id) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const requestOptions = {
      headers: {
        Authorization: token,
        username
      }
    }
    const URL = 'http://localhost:3000/';
    axios
      .put(`http://localhost:8000/api/notes/${id}`, {
        title: this.state.title,
        message: this.state.message,
        username
      }, requestOptions)
      .then(() => window.location.href = URL)
      .catch(err => this.props.history.push('/login'))
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div class="form-group">
        <h3 className="header mt-2">Edit Note:</h3>
        <input
          name='title'
          type="text"
          value={this.state.title} 
          className="w-75 py-2 form-control"
          placeholder="Note Title"
          onChange={(e) => this.handleChange(e)}
        /><br />
        <textarea
          name='message'
          value={this.state.message} 
          className="w-95 py-3 pl-4 form-control"
          placeholder="Note Content"
          rows="15"
          onChange={(e) => this.handleChange(e)}
        /><br />
        <button 
          type="submit" 
          className="btn-large custom-button-teal text-white mt-0"
          onClick={() => this.handleUpdate(this.props.match.params.id)}
        >
          Update
        </button>
      </div>
    )
  }
}