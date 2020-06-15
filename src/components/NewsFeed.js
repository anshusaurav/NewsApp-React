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
      country: "uk",
      language: "en",
      numResults: 100,
      arrSource: null,
      headlines: null,
      refArticles: null,
      mainArticle: null
    };
    
    this.handleSourceChange = this.handleSourceChange.bind(this);
  }
  static getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  componentWillMount() {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.state.country}&language=${this.state.language}&pageSize=${this.state.numResults}&apiKey=4119355f056f442084bade6aceedb37d`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ headlines: data.articles });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(
      `https://newsapi.org/v2/sources?language=${this.state.language}&country=${this.state.country}&apiKey=4119355f056f442084bade6aceedb37d`
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
    if (sourceIndex !== prevState.sourceIndex && arrSource[sourceIndex].hasOwnProperty('id')) {
      fetch(
        `https://newsapi.org/v2/everything?sources=${arrSource[sourceIndex].id}&sortBy=popularity&language
=${this.state.language}&apiKey=4119355f056f442084bade6aceedb37d`
      )
        .then((response) => response.json())
        .then((data) => {
          
          // console.log(this.state.refArticles);
          return data.articles;
          
        }).then((arr) =>{
          this.setState({ refArticles: arr });
          let ind = Math.floor(NewsFeed.getRandomArbitrary(0, arr.length));
          console.log(ind, arr);
          this.setState({mainArticle: arr[ind]});
          console.log('Main', this.state.mainArticle);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  handleSourceChange(idorindex){
    this.setState({sourceIndex: idorindex});

  }
  render() {
    let {arrSource,refArticles, mainArticle,headlines} = this.state;
    return (
      <div className='container'>
        <Header />
        <NavBar sources={arrSource} onSourceChange ={this.handleSourceChange}/>
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
