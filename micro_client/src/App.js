import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navigation from './Components/Navigation/Navigation';
import Login from './Components/Login/Login';
import ArticleList from './Components/ArticleList/ArticleList';
import Article from './Components/ArticleList/Article';

const art = {
  id: 1,
  date: new Date(),
  title: "how to make a react frontend",
  authorID: 1,
  content: '<h2>The standard Lorem Ipsum passage, used since the 1500s</h2> \
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> \
    <h2>The standard Lorem Ipsum passage, used since the 1500s </h2> \
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> \
    <h2>The standard Lorem Ipsum passage, used since the 1500s </h2> \
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> \
    <h2>The standard Lorem Ipsum passage, used since the 1500s </h2> \
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> \
    '
};
const author = {
  name: 'jip',
  bio: 'een verveelde student die een micro service moet maken.'
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navigation  />
            <Route path='/index' render={(props) => <ArticleList {...props} />} />
            <Route path='/login' render={(props) => <Login {...props} />} />
            <Route path='/article/:id' render={(props) => <Article {...props} 
              date={art.date.toString()}
              title={art.title}
              authorID={art.authorID}
              author={author}
              content={art.content}
              />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
