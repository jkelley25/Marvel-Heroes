import React from 'react';
import SeriesDetails from '../series-details/SeriesDetails';
import './SeriesList.css';

class SeriesList extends React.Component {
  constructor() {
    super();
    this.viewSeries = this.viewSeries.bind(this);
    this.state = {
      someKey: 'someValue'
    };
  }

  
  // Function to trigger the handleOpenCard on HeroPage component
  // and passes the series data  
  viewSeries(series) {
    this.props.viewSeries(series);
  }

  render() {
      const seriesData = this.props.seriesArray
      return <div className="series-list"> { seriesData.map((series, index) =>  
        <SeriesDetails seriesDetails={series}  viewSeries={this.viewSeries} key={index}/>) } </div>
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default SeriesList;
