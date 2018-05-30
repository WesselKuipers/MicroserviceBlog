import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Article from './Article';

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

class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles : []
    }
  }

  componentDidMount() {
      //test
      var arts = [art, art, art];
      this.setState({articles: arts});
    //Fetch all articles
    /*
    fetch('http://localhost:8081/')
      .then(res => res.json())
      .then( function(data){
        var articles = [];
        data.forEach(article => {
          articles.push(article);
        });
        
        this.setState({articles: articles}) 
      })
      .catch(function(err) {
        // show error in developer console for debugging
        console.error(err);
      });
    */
  }

  render() {
    return(
        <div>
        {
            this.state.articles.map(article => {
                return(
                    <Article
                        key={article.id}
                        date={article.date.toString()}
                        title={article.title}
                        authorID={article.authorID}
                        content={article.content}
                        author={author}
                    />
                );
            })
        }
        </div>
    );
  }
}

export default ArticleList;