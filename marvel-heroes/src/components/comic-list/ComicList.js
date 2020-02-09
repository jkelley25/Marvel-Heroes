import React from 'react';
import ComicDetails from '../comic-details/ComicDetails';
import './ComicList.css';

class ComicList extends React.Component {
  constructor(props) {
    super(props);
    this.viewSide = this.viewSide.bind(this);
    this.state = {
        viewSide: false,
        isLoaded: false,
        comicsData: [],
    };
  }

  viewSide(comic) {
    this.props.viewComic(comic);
  }

  render() {
    const comics = this.props.comicsArray;
    return <div className="comics-list">
        {comics.map((comic, index) => <ComicDetails 
        comicDetails={comic} viewComic={this.viewSide} key={index}/>)}
    </div>
  } 
}

export default ComicList;

