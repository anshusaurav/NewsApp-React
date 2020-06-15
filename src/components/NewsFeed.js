import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import MainArticle from "./MainArticle";
import HeadArticles from "./HeadArticles";
import OtherArticles from "./OtherArticles";

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceIndex: null,
      country: "us",
      language: "en",
      numResults: 100,
      arrSource: null,
      headlines: null,
      refArticles: null,
      mainArticle: null
    };
    
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }
  static getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  componentDidMount() {
    let {country, language, numResults} = this.state;
    fetch(
      `https://newsapi.org/v2/top-headlines?language=${language}&pageSize=${numResults}&apiKey=489e54aba24f43e6856558027b20d3fb`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        data.articles = data.articles.filter(elem => elem.urlToImage!=='null');
        this.setState({ headlines: data.articles});
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(
      `https://newsapi.org/v2/sources?language=${language}&apiKey=489e54aba24f43e6856558027b20d3fb`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ arrSource: data.sources });
        this.setState({ sourceIndex: 0 });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  componentDidUpdate(_prevProps, prevState) {
    let {sourceIndex, arrSource} = this.state;
    if ((sourceIndex !== prevState.sourceIndex) && arrSource[sourceIndex] && arrSource[sourceIndex].hasOwnProperty('id')) {
      fetch(
        `https://newsapi.org/v2/everything?sources=${arrSource[sourceIndex].id}&sortBy=popularity&language
=${this.state.language}&apiKey=489e54aba24f43e6856558027b20d3fb`
      )
        .then((response) => response.json())
        .then((data) => {
          
          // console.log(this.state.refArticles);
          return data.articles;
          
        }).then((arr) =>{
          arr = arr.filter(elem => elem.urlToImage!=='null');
          console.log(arr);
          this.setState({ refArticles:  arr });
          let ind = Math.floor(NewsFeed.getRandomArbitrary(0, arr.length));
          this.setState({mainArticle: arr[ind]});
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    let {country, language, numResults} = this.state;
    if(language !== prevState.language) {
      fetch(
        `https://newsapi.org/v2/top-headlines?language=${language}&pageSize=${numResults}&apiKey=489e54aba24f43e6856558027b20d3fb`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({ headlines: data.articles });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  
      fetch(
        `https://newsapi.org/v2/sources?language=${language}&apiKey=489e54aba24f43e6856558027b20d3fb`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({ arrSource: data.sources });
          this.setState({ sourceIndex: 0 });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
         fetch(
        `https://newsapi.org/v2/everything?sources=${arrSource[sourceIndex].id}&sortBy=popularity&language
=${this.state.language}&apiKey=489e54aba24f43e6856558027b20d3fb`
      )
        .then((response) => response.json())
        .then((data) => {
          
          // console.log(this.state.refArticles);
          return data.articles;
          
        }).then((arr) =>{
          this.setState({ refArticles: arr });
          let ind = Math.floor(NewsFeed.getRandomArbitrary(0, arr.length));
          // console.log(ind, arr);
          this.setState({mainArticle: arr[ind]});
          // console.log('Main', this.state.mainArticle);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

  }
  compo
  handleSourceChange(idorindex){
    this.setState({sourceIndex: idorindex});

  }
  handleLanguageChange(value){
    console.log(value);
    this.setState({language: value});

  }
  render() {
    let {arrSource,refArticles, mainArticle,headlines, language} = this.state;
    return (
      <div className='container'>
        <Header value={language} onLanguageChange={this.handleLanguageChange}/>
        <NavBar sources={arrSource} onSourceChange={this.handleSourceChange}/>
        <div className='main-section'>
          <div className='highlight-section'>
         
          <MainArticle article = {mainArticle} />
          <OtherArticles articles = {refArticles}/>
          </div>
          <div className='headline-section'>
            <HeadArticles articles={headlines}/>
          </div>
        </div>
      </div>
    );
  }
}
export default NewsFeed;
