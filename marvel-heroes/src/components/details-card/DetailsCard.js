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
      if(this.state.open) {
        return <div className="overlay-div">
            <IosClose className="close" onClick={() => { this.handleClose(); this.props.close() }} fontSize="60px" color="red" />
            <div className="content">
                    <img src={`${content.thumbnail.path}.${content.thumbnail.extension}`} alt="Cover"/>
                    <h2> { content.title } </h2>
                <h3> Format: {content.format}</h3>
                <h3> Issue number: {content.issueNumber}</h3>
                <p> { content.description } </p>
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

