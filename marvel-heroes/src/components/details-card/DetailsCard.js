import React from 'react';
import './DetailsCard.css';
import IosClose from 'react-ionicons/lib/IosClose';

class DetailsCard extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true,
    };
  }

  // Close card, this renders a null component
  handleClose() {
    this.setState({
        open: false,
    });
  }

  render() {
      const content = this.props.contentData;
      var d;
      if(content.dates !== undefined) {
        d = new Date(content.dates[0].date).getFullYear();
      } else {
        d = 'Not available'
      }
      if(this.state.open) {
        return <div className="overlay-div">
            <IosClose className="close" onClick={() => { this.handleClose(); this.props.close() }} fontSize="60px" color="red" />
            <div className="content">
                <img src={`${content.thumbnail.path}.${content.thumbnail.extension}`} alt="Cover"/>
                <div className="info">
                  <h3>{content.title}</h3>
                  <h3> Format: {content.format}</h3>
                  <h3> Issue number: {content.issueNumber}</h3>
                  <h3> Publised: { `${d}` }</h3>
                  <h3> Synopsis </h3>
                  <p> { content.description } </p>
                </div>
            </div>
         </div>;
      } else {
          return null;
      }
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default DetailsCard;

