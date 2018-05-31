import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navigation from './Components/Navigation/Navigation';
import Login from './Components/Login/Login';
import ArticleList from './Components/ArticleList/ArticleList';
import Article from './Components/ArticleList/Article';
import CreateArticle from './Components/ArticleList/CreateArticle';

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
            <Route path='/article/:id' render={(props) => <Article {...props} />} />
            <Route path='/createArticle' render={(props) => <CreateArticle {...props} />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
