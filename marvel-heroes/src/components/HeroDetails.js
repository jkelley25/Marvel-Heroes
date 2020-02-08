import React from 'react';
import './HeroDetails.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class HeroDetails extends React.Component {
    render() {
        const data = this.props.heroDetails;
        // check if there is a hero description
        if(data.description === ''){
            data.description = 'No description data';
        }

        return (
        <div className="hero-details">
            <img className="thumb-nail" src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
             alt="Hero Thumbnail"/>
            <h2>{data.name}</h2>
            <p className="description">{data.description}</p>

            <Link to={{
                pathname: `/hero/${data.id}`,
                state: {data} 
                }}> View Hero Page </Link>
        </div>
      );
    }
}

export default HeroDetails;


