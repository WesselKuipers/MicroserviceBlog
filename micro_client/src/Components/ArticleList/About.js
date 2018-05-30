import React, {Component} from 'react';
import './About.css';

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div className="About">
            <h2>About {this.props.name}</h2>
            <p>{this.props.bio}</p>
        </div>
    );
  }
}

export default About;