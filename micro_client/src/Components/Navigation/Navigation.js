import React, { Component } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

class Navigation extends Component {
 constructor(props) {
	super(props);
	this.state = {loggedIn: localStorage.getItem("id_token")};
  	this.handleClick = props.handleClick;
 }

  render() {
		return (
			<nav className='w-100 bg-blue h3 navigation'>
				<ul>
					<li><Link to='/index'>Home</Link></li>
					{this.state.loggedIn ? <li><Link to='/createArticle'>Create Article</Link></li> : null}
					{
						this.state.loggedIn ?
						<ul>
						<li><Link to='/login'>Logout</Link></li>
						</ul> :
						<ul>
							<li><Link to='/login'>Login</Link></li>
						</ul>
					}
				</ul>
			</nav>
		);
	}
}

export default Navigation;