import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Article.css';

import About from './About';

function Thumbnail(props) {
  if (props.thumbnail) {
    return <Link to={'/article/'+props.articleId}>Read more...</Link>;
  }
  return <About name={props.author.name} bio={props.author.bio} />;
}

class Article extends Component {
  constructor(props) {
    super(props);

    this.id = props.id;
    if(typeof this.props.match !== 'undefined')
    {
        this.id = this.props.match.params.id;
    }
    
    //Fetch article by id
    fetch('http://localhost:8080/blogs/' + this.id, {
        headers: { "Content-Security-Policy": "script-src 'self' http://localhost:8080/" }
    })
      .then(res => res.json())
      .then( function(data){
          this.setState({article: data});

          fetch('http://localhost:8080/authors/' + data.authorId, {
              headers: { "Content-Security-Policy": "script-src 'self' http://localhost:8080/" }
          })
            .then(res => res.json())
            .then( function(data){
                this.setState({author: data});
            }.bind(this) )
            .catch(function(err) {
                console.error(err);
            });
      }.bind(this) )
      .catch(function(err) {
        console.error(err);
      });
    
    if(typeof props.match === 'undefined'){
        this.state = {
            author: { },
            content: this.props.content.substring(0, 150),
            thumbnail: true
        }
    }
    else{
        this.state = {
            author: { },
            content: props.content,
            thumbnail: false
        }
    }
  }

  render() {
    var content;
    if(!this.state.article || !this.state.author)
    {
        return <p>Loading...</p>;
    }

    if( this.props.match)
    {
        content = this.state.article.content.substring(0, 150);
    }
    else
    {
        content = this.state.article.content;
    }
    return(
        <div className="wrapper">
            <article>
                <h1>{this.props.title}</h1>
                <p className="when">Posted by {this.state.author.name} on {new Date(this.state.article.creationDate).toString()}</p>
                <div dangerouslySetInnerHTML={{__html: content}} />
                <Thumbnail articleId={this.id} thumbnail={this.state.thumbnail} author={ this.state.author }/>      
            </article>
        </div>
    );
  }
}

export default Article;