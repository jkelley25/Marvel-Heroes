import React from 'react';
import md5 from 'js-md5';
import HeroDetails from '../hero-details/HeroDetails';
import './HeroList.css'

// Simple loading screen component 
const LoadingScreen = () => {
    return(
        <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    );
}

class HeroList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: [],

            request: {
                name: '',
                nameStart: '',
                order: 'Ascending',
                offset: 0, 
                limit: 20,
            },
        }
    }

    // Fetch request to Marvel api upon mounting
    componentDidMount() {
        // Check if coming from a character page, if so update with previous request 
        if(this.props.location.state ) {
            console.log(this.props.location.state);
            this.setState({
                request: this.props.location.state.prevRequest
            }, () => {
                this.fetchData();
            })
        } else {
            this.fetchData();
        }
    }

    // Function to fetch the Marvel api data
    fetchData() {
        // Hash required for api fetch 
        const ts = Date.now();
        const privateKey = 'ff44785d728a56986cb8ac72f16bb8c3d845d3e5';
        const publicKey = '9f2429a78761f3a7e5e95028cbaae945';
        const hash = md5(ts+privateKey+publicKey);
        const limit = this.state.request.limit;
        const baseQuery = 'http://gateway.marvel.com/v1/public/characters?'
        
        var request; 
        // check if request state is not empty, ie not coming from a character's page
        if (this.state.request.name !== '') {
            // query character name 
            request = `${baseQuery}name=${this.state.request.name}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${this.state.request.offset}`; 
        } else if (this.state.request.nameStart !== '') {
            // query starting letter of name
            if(this.state.request.order === 'Ascending') {
                request = `${baseQuery}nameStartsWith=${this.state.request.nameStart}&orderBy=name&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${this.state.request.offset}`;
            } else {
                request = `${baseQuery}nameStartsWith=${this.state.request.nameStart}&orderBy=-name&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${this.state.request.offset}`;
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
                data: [...this.state.data, ...result.data.results],
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

    // Handle search of characted name, update the state variable  
    handleNameChange = (event) => {
        this.setState({
            request: {...this.state.request, name: event.target.value},
        });
    }

    // Handle letter change for filter 
    handleLetterChange = (event) => {
        this.setState({
            request: {...this.state.request, nameStart: event.target.value}
        })
    }

    handleOrderChange = (event) => {
        this.setState({
            request: {...this.state.request, order: event.target.value}
        })
    }

    handleSubmit = (event) => {
        // clear data array
       this.setState({
           data: [],
           isLoaded: false,
           request: {...this.state.request, offset: 0}
       }, () => {
        this.fetchData();
       });
    }

    checkQueryOrder(request, baseQuery, limit, ts, publicKey, hash) {
        if (this.state.request.order === 'Ascending') {
            request = `${baseQuery}&orderBy=name&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${this.state.request.offset}`;
        }
        else {
            request = `${baseQuery}&orderBy=-name&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${this.state.request.offset}`;
        }
        return request;
    }

    // Function to handle showing next characters, 
    // it increasing the offset value and re-fetches the api
    handleShowMore = (event) => {
        const newOffset = this.state.request.offset + this.state.request.limit;
        this.setState({
            request: {...this.state.request, offset: newOffset}
        }, () => {
            this.fetchData();
        });
    }

    render() {
        const { isLoaded, data } = this.state; // get results array of heroes
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // options
        // Loading screen
        if(!isLoaded) {
            return <LoadingScreen/>
        } else {
            return (
                <div className="App">
                        <div className="filter">
                        {/* <label> Search name 
                            <input type="text" value={this.state.name} onChange={this.handleNameChange}></input>
                        </label> */}
                        <label>  <h3>Filter search: </h3>  </label>
                        <label> <p>Name Start with - </p></label>
                        <select id="options" value={this.state.nameStart} onChange={this.handleLetterChange}>
                            {alphabet.map((x,y) => <option key={y}>{x}</option>)}
                        </select>
                        <label> <p>Order By  - </p></label>
                        <select value={this.state.order} onChange={this.handleOrderChange }>
                            <option> Ascending </option>
                            <option> Descending </option>
                        </select>
                        <button className="go-button" onClick={this.handleSubmit}>Go</button>
                        </div>
                        <div className="hero-list">
                            {data.map((hero, index) =><HeroDetails heroDetails={hero} key={index}
                                 request={this.state.request} characters={ this.state.data}/>)}
                        </div>
                        <button className="right-button custom-button" onClick={this.handleShowMore}> Show more characters </button>
                </div>
            ); 
        }
    }

}

export default HeroList;
