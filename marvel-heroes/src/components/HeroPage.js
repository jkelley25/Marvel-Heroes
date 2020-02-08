import React from 'react';
import './HeroPage.css';

class HeroPage extends React.Component {
  constructor(props) {
    super(props);
    this.viewSide = this.viewSide.bind(this);
    this.state = {
        isLoaded: false,
        comicsData: [],
        seriesData: [],
        viewSide: false,
        content: [],
    };
  }

  viewSide(comic) {
    this.setState({
      viewSide: true,
      content: comic,
    })
  }

  render() {
    return <div> Hero Page</div>
  } 
}

export default HeroPage;
