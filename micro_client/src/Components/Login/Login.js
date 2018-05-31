import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {username: "", password: "", error: false, loggedIn: localStorage.getItem('id_token')};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let credentials = {username: this.state.username, password: this.state.password}
    
    fetch('http://localhost:8080/authors/authenticate', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(credentials),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw(res.body)
      }
    })
    .then(tokenResponse => {
      localStorage.setItem('id_token', tokenResponse.token);
      localStorage.setItem('token_username', tokenResponse.username);
      localStorage.setItem('authorId', tokenResponse.authorId);

      this.setState({loggedIn: true, error: false});
      
      window.location.reload();
    })
    .catch(error => {
      this.setState({error: true});
    })
  }

  handleLogout() {
    localStorage.removeItem('id_token');
    this.setState({loggedIn: false});
    window.location.reload();
  }

  render() {
  	return(
      (!this.state.loggedIn ?
        <div className='measure-wide center bg-light-gray br3 mt3 pa4'>
          <h1 className='f3 tc'>Login</h1>
          <form className='formgrid bt b--light-silver pa3' onSubmit={this.handleSubmit}>
            <label>Name</label><input value={this.state.username} onChange={(event) => this.setState({username: event.target.value})} type='text' className='bg-white color-black br3 ba b--near-white' /> 
            <label>Password</label><input value={this.state.password} onChange={(event) => this.setState({password: event.target.value})} type='password' className='bg-white color-black br3 ba b--near-white' />
            <button className='button mt2 ba b--blue bg-blue w-100 white pv1 grow'>Login</button>
            {this.state.error && <div style={{color: 'red'}}>Invalid login.</div>}
          </form>
	      </div>
      : <div className='measure-wide center bg-light-gray br3 mt3 pa4'>
          <h1 className='f3 tc'>Logout</h1>
          <button className='button mt2 ba b--blue bg-blue w-100 white pv1 grow' onClick={this.handleLogout}>Logout</button>
        </div>  
      )
	  );
  }
}

export default Login;