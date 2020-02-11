import React from 'react';
import md5 from 'js-md5';
import HeroDetails from '../hero-details/HeroDetails';
import './HeroList.css'


class HeroList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
            name: '',
            nameStart: '',
            order: 'Ascending',
            offset: 0,
        }
    }

    // Fetch request to Marvel api upon mounting
    componentDidMount() {
        console.log(this.props.match.params);
        this.fetchData(); // fetch initial data 
    }

    fetchData() {
        // Hash required for api fetch 
        const ts = Date.now();
        const privateKey = 'ff44785d728a56986cb8ac72f16bb8c3d845d3e5';
        const publicKey = '9f2429a78761f3a7e5e95028cbaae945';
        const hash = md5(ts+privateKey+publicKey);
        const limit = 5;
        const baseQuery = 'http://gateway.marvel.com/v1/public/characters?'
        
        var request; 
        if (this.state.name !== '') {
            // query character name 
            request = `${baseQuery}name=${this.state.name}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${this.state.offset}`; 
        } else if (this.state.nameStart !== '') {
            // query starting letter of name
            if(this.state.order === 'Ascending') {
                request = `${baseQuery}nameStartsWith=${this.state.nameStart}&orderBy=name&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${this.state.offset}`;
            } else {
                request = `${baseQuery}nameStartsWith=${this.state.nameStart}&orderBy=-name&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${this.state.offset}`;
            }
        } else {
            request = this.checkQueryOrder(request, baseQuery, limit, ts, publicKey, hash);
        }
        // fetch request and set state
        fetch(request)
        .then(res => res.json())
        .then((result) => {
            this.setState({ 
                isLoaded: true,
                data: result,
            });
          },
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

    handleLetterChange = (event) => {
        this.setState({
            nameStart: event.target.value,
            offset: 0
        })
    }

    handleOrderChange = (event) => {
        this.setState({
            order: event.target.value,
            offset: 0
        })
    }

    handleSubmit = (event) => {
       this.setState({
           data: [],
           isLoaded: false,
           offset: 0
       });
       this.fetchData();
    }

    checkQueryOrder(request, baseQuery, limit, ts, publicKey, hash) {
        if (this.state.order === 'Ascending') {
            request = `${baseQuery}&orderBy=name&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${this.state.offset}`;
        }
        else {
            request = `${baseQuery}&orderBy=-name&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${this.state.offset}`;
        }
        return request;
    }

    // Function to handle showing next characters, 
    // it increasing the offset value and re-fetches the api
    handleNextClick = (event) => {
        const newOffset = this.state.offset + 5;
        this.setState({
            data: [],
            isLoaded: false,
            offset: newOffset,
        }, () => {
            this.fetchData();
        });
    }

    // Function to handle going back to previous characters, 
    // by reducing the offset value and re-fetches the api
    handleBackClick = (event) => {
        const newOffset = this.state.offset - 5;
        this.setState({
            data: [],
            isLoaded: false,
            offset: newOffset,
        }, () => {
            this.fetchData();
        });
    }

    render() {
        const { isLoaded, data } = this.state; // get results array of heroes
        
        if(!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">
                        <div className="filter">
                        {/* <label> Search name 
                            <input type="text" value={this.state.name} onChange={this.handleNameChange}></input>
                        </label> */}
                        <label>  Filter search </label>

                        <select value={this.state.nameStart} onChange={this.handleLetterChange}>
                            <option >A</option>
                            <option >B</option>
                            <option >C</option>
                            <option >D</option>
                        </select>
                        <select value={this.state.order} onChange={this.handleOrderChange }>
                            <option> Ascending </option>
                            <option> Descending </option>
                        </select>
                        <button onClick={this.handleSubmit}>Filter</button>
                        </div>
                        <div className="hero-list">
                            {data.data.results.map((hero, index) =><HeroDetails heroDetails={hero} key={index} offset={this.state.offset}/>)}
                        </div>
                        <button onClick={this.handleBackClick}> Go back </button> 
                        <button className="right-button" onClick={this.handleNextClick}> Show next characters </button>
                </div>
            ); 
        }

    }

}

export default HeroList;
