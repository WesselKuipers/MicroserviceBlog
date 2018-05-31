import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Article from './Article';

class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles : [ ]
    }

    fetch('http://localhost:8080/blogs', {
        headers: { "Content-Security-Policy": "script-src 'self' http://localhost:8080/" }
    })
      .then(res => res.json())
      .then( function(data){
        var articles = [];
        data.forEach(article => {
          articles.push(article);
        });
        this.setState({articles: articles}) 
      }.bind(this) )
      .catch(function(err) {
        console.error(err);
      });
  }

  render() {
    return(
        <div>
        {
            this.state.articles.map(article => {
                return(
                    <Article
                        key={article.id}
                        id={article.id}
                        date={article.date}
                        title={article.title}
                        authorId={article.authorId}
                        content={article.content}
                    />
                );
            })
        }
        </div>
    );
  }
}

export default ArticleList;