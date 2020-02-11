import React from 'react';
import './HeroDetails.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class HeroDetails extends React.Component {
    render() {
        const data = this.props.heroDetails;
        const offset = this.props.offset;
        // check if there is a hero description
        if(data.description === ''){
            data.description = 'No description data';
        }
        
        return (
        <div className="hero-details">
            <Link to={{
                pathname: `/hero/${data.id}/${offset}`,
                state: { data, offset } 
                }}> 
                        <img className="thumb-nail" src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
             alt="Hero Thumbnail"/>
            <p>{data.name}</p>
            </Link>
        </div>
      );
    }
}

export default HeroDetails;


