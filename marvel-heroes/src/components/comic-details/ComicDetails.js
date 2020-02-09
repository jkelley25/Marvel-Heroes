import React from 'react';
import './ComicDetails.css';

class ComicDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      openSide: false
    };
  }

  render() {
    const comic  = this.props.comicDetails;
    return <div className="comic" onClick={() => this.props.viewComic(comic)}>
            <img className="cover-img" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
              alt="Comic cover"/>
            <div>
            <p className="comic-title">{comic.title }</p>
            </div>
    </div>
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default ComicDetails;
