import React from 'react';
import './SeriesDetails.css';

class SeriesDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
      const series = this.props.seriesDetails;
    return  <div className="series-container" onClick={() => this.props.viewSeries(series)}>
                <img className="series-cover" src={`${series.thumbnail.path}.${series.thumbnail.extension}`} 
                    alt="Series Cover"/>
                <p>{series.title}</p>
            </div>
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default SeriesDetails;
