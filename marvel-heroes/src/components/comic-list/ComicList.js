import React from 'react';
import ComicDetails from '../comic-details/ComicDetails';
import './ComicList.css';

class ComicList extends React.Component {
  constructor(props) {
    super(props);
    this.viewComic = this.viewComic.bind(this);
    this.state = {
        viewSide: false,
        isLoaded: false,
        comicsData: [],
    };
  }

  // Function to trigger the handleOpenCard on HeroPage component
  // and passes the comic data  
  viewComic(comic) {
    this.props.viewComic(comic);
  }
  
  render() {
    const comics = this.props.comicsArray;
    return <div className="comics-list">
        {comics.map((comic, index) => <ComicDetails 
        comicDetails={comic} viewComic={this.viewComic} key={index}/>)}
    </div>
  } 
}

export default ComicList;

