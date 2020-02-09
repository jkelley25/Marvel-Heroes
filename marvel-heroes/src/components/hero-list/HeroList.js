import React from 'react';
import md5 from 'js-md5';
import HeroDetails from '../hero-details/HeroDetails';


class HeroList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
            name: '',
            nameStart: ''
        }
    }

    // Fetch request to Marvel api upon mounting
    componentDidMount() {
        this.fetchData(); // fetch initial data 
    }

    fetchData(name, nameStart) {
        // Hash required for api fetch 
        const ts = Date.now();
        const privateKey = 'ff44785d728a56986cb8ac72f16bb8c3d845d3e5';
        const publicKey = '9f2429a78761f3a7e5e95028cbaae945';
        const hash = md5(ts+privateKey+publicKey);
        const limit = 20;
        const baseQuery = 'http://gateway.marvel.com/v1/public/characters?'

        var request; 
        if (name !== undefined) {
            request = `${baseQuery}name=${name}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        } else if (nameStart) {
            request = `${baseQuery}nameStartsWith${nameStart}&orderBy=name&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        } else {
            request = `${baseQuery}limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        }
        
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

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    handleSubmit = (event) => {
       this.setState({
           data: [],
           isLoaded: false
       });
       this.fetchData(this.state.name);
    }

    render() {
        const { isLoaded, data } = this.state; // get results array of heroes
        if(!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">
                    <form onSubmit={ this.handleSubmit}>
                        <div className="filter">
                        <label> Limit 
                            <input type="text" value={this.state.name} onChange={this.handleNameChange}></input>
                        </label>
                        <button type="submit">Search</button>
                        </div>
                    </form>
                    {data.data.results.map((hero, index) => <HeroDetails heroDetails={hero} key={index}  />)}
                </div>
            ); 
        }

    }

}

export default HeroList;
