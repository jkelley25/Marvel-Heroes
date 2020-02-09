import React from 'react';
import md5 from 'js-md5';
import './HeroPage.css';
import ComicList from '../comic-list/ComicList';

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
    const  { data } = this.props.location.state; // get hero data from previous page
    const  {isLoaded , comicsData, seriesData, viewSide, content}  = this.state;
    

    if(!isLoaded || comicsData === [] || seriesData === []) {
        return <div> Loading... </div>
    } else {
        return <div className="main-container">
                  <div className="main-child-1">
                    <div className="hero-summary">
                      <div className="hero-child-1">
                        <img className="hero-img" src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt="Hero img" />
                        <h2 className="hero-name">{ data.name }</h2>
                      </div>
                      <div className="hero-child-2">
                        <h3> Summary</h3>
                        <p> { data.description }</p>
                      </div>
                    </div>
                      {/* Display ComicPreview components using comics array */}
                      <h3 className="featured-content"> Featured comics </h3>
                      <div className="content-container">
                        <ComicList comicsArray={comicsData} viewComic={this.viewSide}/>
                      </div>
                      <h3 className="featured-content"> Featured Series </h3>
                    </div>
                    {/* <div className="main-child-2"> 
                      { sideBar }
                    </div> */}
                </div>
    }
  } 

  // Function for fetching the appropriate data and setting the corresponding state
  fetchData(characterId, content ) {
        // Hash required for api fetch 
        const ts = Date.now();
        const privateKey = 'ff44785d728a56986cb8ac72f16bb8c3d845d3e5';
        const publicKey = '9f2429a78761f3a7e5e95028cbaae945';
        const hash = md5(ts+privateKey+publicKey);
        const limit = 10;

        const request = `http://gateway.marvel.com/v1/public/characters/${characterId}/${content}?limit=${limit}&ts=${ts}&apikey=9f2429a78761f3a7e5e95028cbaae945&hash=${hash}`;
        console.log(request);
        fetch(request)
        .then(res => res.json())
        .then((result) => {
          // check which state is being passed and set
            if(content === 'comics') {
              this.setState({ 
                comicsData: result.data.results,
              });
            }
            if (content === 'series') {
              this.setState({ 
                isLoaded: true,
                seriesData: result.data.results,
              });
            }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        ).catch((error) => {
          console.log(error);
        })
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id, 'comics');
    this.fetchData(this.props.match.params.id, 'series');
  }
}

export default HeroPage;
