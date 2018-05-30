import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Article.css';

import About from './About';

function Thumbnail(props) {
  if (props.thumbnail) {
    return <Link to={'/article/'+props.id}>Read more...</Link>;
  }
  return <About name={props.author.name} bio={props.author.bio} />;
}

class Article extends Component {
  constructor(props) {
    super(props);
    
    if(typeof props.match === 'undefined'){
        this.state = {
            content: this.props.content.substring(0, 150),
            thumbnail: true
        }
    }
    else{
        this.state = {
            content: props.content,
            thumbnail: false
        }
    }
  }

  componentDidMount() {
    //Fetch article by id
    /*
    fetch('http://localhost:8081/' + this.id)
      .then(res => res.json())
      .then( function(data){
          this.setState({article:data});
          console.log( "data" );
          console.log( data );
      })
      .catch(function(err) {
        // show error in developer console for debugging
        console.error(err);
      });
    */

    //Fetch user by id
    /*
    fetch('http://localhost:8082/' + this.id)
      .then(res => res.json())
      .then( function(data){
          this.setState({author: data});
          console.log( "data" );
          console.log( data );
      })
      .catch(function(err) {
        // show error in developer console for debugging
        console.error(err);
      });
    */

  }

  render() {
    return(
        <div className="wrapper">
            <article>
                <h1>{this.props.title}</h1>
                <p className="when">Posted by {this.props.author.name} on {this.props.date}</p>
                <div dangerouslySetInnerHTML={{__html: this.state.content}} />
                <Thumbnail thumbnail={this.state.thumbnail} author={ this.props.author }/>      
            </article>
            
        </div>
    );
  }
}

export default Article;