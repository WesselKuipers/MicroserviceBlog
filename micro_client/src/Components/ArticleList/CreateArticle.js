import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Article.css';

class CreateArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
        title: "", 
        content: "", 
        authorId: Number(localStorage.getItem("authorId")),
        loggedIn: localStorage.getItem('id_token')
    };

    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  handleSubmit(event) {
    event.preventDefault();
    //TODO: redirect?
    if(!this.state.loggedIn) return;
     var article = { 
        authorId: this.state.authorId,
        content: this.state.content,
        title: this.state.title
    };

    fetch('http://localhost:8080/blogs/', { 
        method: 'POST', 
        body: JSON.stringify( article ), 
        headers: {Authentication: "Bearer "+localStorage.getItem('id_token'), 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then( function(data){
        console.log( "Article Created, response: " );
        console.log( data );
      }.bind(this) )
      .catch(function(err) {
        console.error(err);
      });
  }

  render() {
    return(
        <div className='measure-wide center bg-light-gray br3 mt3 pa4'>
            <h1 className='f3 tc'>Create Article</h1>
            <form className='formgrid bt b--light-silver pa3' onSubmit={this.handleSubmit}>
                <label>Title</label><br />
                <input value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} type='text' className='bg-white color-black br3 ba b--near-white' /> <br />
                <label>
                    Content<br />
                    <textarea value={this.state.content} onChange={(event) => this.setState({ content: event.target.value})} type='text' rows="50" cols="200" >
                    Hello there, this is some text in a text area
                    </textarea>
                </label>
                <button className='button mt2 ba b--blue bg-blue w-100 white pv1 grow'>Create</button>
            </form>
        </div>
    );
  }
}

export default CreateArticle;