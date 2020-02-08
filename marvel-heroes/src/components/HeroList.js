import React from 'react';
import md5 from 'js-md5';
import HeroDetails from './HeroDetails';


class HeroList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
        }
    }

    // Fetch request to Marvel api upon mounting
    componentDidMount() {
        // Hash required for api fetch 
        const ts = Date.now();
        const privateKey = 'ff44785d728a56986cb8ac72f16bb8c3d845d3e5';
        const publicKey = '9f2429a78761f3a7e5e95028cbaae945';
        const hash = md5(ts+privateKey+publicKey);
        const limit = 20;

        const request = `http://gateway.marvel.com/v1/public/characters?limit=${limit}&ts=${ts}&apikey=9f2429a78761f3a7e5e95028cbaae945&hash=${hash}`;
        fetch(request)
        .then(res => res.json())
        .then((result) => {
            this.setState({ 
                isLoaded: true,
                data: result,
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    render() {
        const { isLoaded, data } = this.state; // get results array of heroes
        if(!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">
                {data.data.results.map((hero, index) => <HeroDetails heroDetails={hero} key={index}  />)}
                </div>
            ); 
        }

    }

}

export default HeroList;
