import React from 'react'

import Header from './Header'
import NavBar from './NavBar'
import MainArticle from './MainArticle'
import HeadArticles from './HeadArticles'
import Footer from './Footer'
const OtherArticles = React.lazy(() => import('./OtherArticles'))

class NewsFeed extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sourceIndex: null,
      country: 'us',
      language: 'en',
      numResults: 100,
      arrSource: null,
      headlines: null,
      refArticles: null,
      mainArticle: null,
      searchText: ''
    }

    this.handleSourceChange = this.handleSourceChange.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  static getRandomArbitrary (min, max) {
    return Math.random() * (max - min) + min
  }

  componentDidMount () {
    let { language, numResults } = this.state
    fetch(
      `https://newsapi.org/v2/top-headlines?language=${language}&pageSize=${numResults}&apiKey=4119355f056f442084bade6aceedb37d`
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        data.articles = data.articles.slice(0, 15)
        data.articles = data.articles.filter(elem => elem.urlToImage !== 'null')
        this.setState({ headlines: data.articles })
      })
      .catch(error => {
        console.error('Error:', error)
      })

    fetch(
      `https://newsapi.org/v2/sources?language=${language}&apiKey=4119355f056f442084bade6aceedb37d`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ arrSource: data.sources })
        this.setState({ sourceIndex: 0 })
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  componentDidUpdate (_prevProps, prevState) {
    let { sourceIndex, arrSource } = this.state
    if (
      sourceIndex !== prevState.sourceIndex &&
      arrSource[sourceIndex] &&
      arrSource[sourceIndex].hasOwnProperty('id')
    ) {
      fetch(
        `https://newsapi.org/v2/everything?sources=${arrSource[sourceIndex].id}&sortBy=popularity&language
=${this.state.language}&apiKey=4119355f056f442084bade6aceedb37d`
      )
        .then(response => response.json())
        .then(data => {
          return data.articles
        })
        .then(arr => {
          arr = arr.filter(elem => elem.urlToImage !== 'null')
          let ind = Math.floor(NewsFeed.getRandomArbitrary(0, arr.length))
          this.setState({ refArticles: arr, mainArticle: arr[ind] }, ()=>{
            
          })
        })
        .catch(error => {
          console.error('Error:', error)
        })
    }
    let { language, numResults, searchText } = this.state
    if (language !== prevState.language) {
      fetch(
        `https://newsapi.org/v2/top-headlines?language=${language}&pageSize=${numResults}&apiKey=4119355f056f442084bade6aceedb37d`
      )
        .then(response => response.json())
        .then(data => {
          data.articles = data.articles.slice(0, 15)
          this.setState({ headlines: data.articles })
        })
        .catch(error => {
          console.error('Error:', error)
        })

      fetch(
        `https://newsapi.org/v2/sources?language=${language}&apiKey=4119355f056f442084bade6aceedb37d`
      )
        .then(response => response.json())
        .then(data => {
          this.setState({ arrSource: data.sources, sourceIndex: 0 }, () => {
            console.log('Isupdated', this.state.language)
            console.log(this.state.arrSource, this.state.sourceIndex)
            fetch(
              `https://newsapi.org/v2/everything?sources=${
                this.state.arrSource[this.state.sourceIndex].id
              }&language
      =${this.state.language}&apiKey=4119355f056f442084bade6aceedb37d`
            )
              .then(response => response.json())
              .then(data => {
                // console.log(this.state.refArticles);
                return data.articles
              })
              .then(arr => {
                console.log(language, arr)
                let ind = Math.floor(NewsFeed.getRandomArbitrary(0, arr.length))
                this.setState(
                  { refArticles: arr, mainArticle: arr[ind] },
                  () => {
                    console.log('should be correct now')
                  }
                )
              })
              .catch(error => {
                console.error('Error:', error)
              })
          })
          // this.setState({ sourceIndex: 0 });
        })
        .catch(error => {
          console.error('Error:', error)
        })
      console.log(language)
    }
    if (searchText !== prevState.searchText) {
      console.log('search text changed to ', searchText)
      fetch(
        `https://newsapi.org/v2/everything?qInTitle=${searchText}&sortBy=popularity&language
=${this.state.language}&apiKey=4119355f056f442084bade6aceedb37d`
      )
        .then(response => response.json())
        .then(data => {
          // console.log(this.state.refArticles);
          return data.articles
        })
        .then(arr => {
          console.log(arr)
          this.setState({ refArticles: arr })
          let ind = Math.floor(NewsFeed.getRandomArbitrary(0, arr.length))
          // console.log(ind, arr);
          this.setState({ mainArticle: arr[ind] })
          // console.log('Main', this.state.mainArticle);
        })
        .catch(error => {
          console.error('Error:', error)
        })
    }
  }

  handleSourceChange (idorindex) {
    this.setState({ sourceIndex: idorindex })
  }
  handleLanguageChange (value) {
    console.log(value)
    this.setState({ language: value })
  }
  handleSearch (value) {
    this.setState({ searchText: value })
  }
  render () {
    let {
      arrSource,
      refArticles,
      mainArticle,
      headlines,
      language,
      searchText
    } = this.state
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <div className='container'>
          <Header
            value={language}
            searchText={searchText}
            onSearch={this.handleSearch}
            onLanguageChange={this.handleLanguageChange}
          />
          <NavBar
            sources={arrSource}
            onSourceChange={this.handleSourceChange}
          />
          <div className='main-section'>
            <div className='highlight-section'>
              <MainArticle article={mainArticle} />
              <OtherArticles articles={refArticles} />
            </div>
            <div className='headline-section'>
              <HeadArticles articles={headlines} />
            </div>
          </div>
          <Footer />
        </div>
      </React.Suspense>
    )
  }
}
export default NewsFeed
