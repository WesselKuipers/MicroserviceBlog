import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Article.css';

class CreateArticle extends Component {
  constructor(props) {
    super(props);

    this.id = props.id;
    if(typeof this.props.match !== 'undefined')
    {
        this.id = this.props.match.params.id;
    }
    
    //Fetch article by id
    fetch('http://localhost:8080/blogs/' + this.id)
      .then(res => res.json())
      .then( function(data){
          this.setState({article: data});

          fetch('http://localhost:8080/authors/' + data.authorId)
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
    console.log( this.state );
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
            </article>
        </div>
    );
  }
}

export default CreateArticle;