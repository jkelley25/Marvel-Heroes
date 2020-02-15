import React from 'react';
import HeroDetails from '../components/hero-details/HeroDetails';
import md5 from 'js-md5';
class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      featuredIds: ['1009368', '1009610', '1009351', '1009189', '1009338'],
      characters: [],
    };
  }

  // Function to fetch the Marvel api data
  fetchData() {
    // Hash required for api fetch 
    const ts = Date.now();
    const privateKey = 'ff44785d728a56986cb8ac72f16bb8c3d845d3e5';
    const publicKey = '9f2429a78761f3a7e5e95028cbaae945';
    const hash = md5(ts+privateKey+publicKey);
    const baseQuery = 'http://gateway.marvel.com/v1/public/characters/';
    const ids = this.state.featuredIds;
    var request; 
    // Loop through featured characters and fetch their data
    for(var id of ids) {
      request = `${baseQuery}${id}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`; 
      // fetch request and set state
      this.fetchCharacter(request);
    }
  }

  fetchCharacter(request) {
    fetch(request)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          characters: [...this.state.characters, ...result.data.results],
        });
      }, (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    return <div>
          {this.state.characters.map((hero, index) => <HeroDetails heroDetails={hero} key={index}/>)}
          </div>;
  }

  componentDidMount() {
    this.fetchData();
  }
}

export default HomePage;
