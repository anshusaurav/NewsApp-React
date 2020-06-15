import React from 'react'

class MainArticle extends React.Component {
  constructor (props) {
    super(props)
  }
  onError () {
    this.setState({
      imageUrl: '/images/no-images-found.png'
    })
  }
  render () {
    let { article } = this.props
    if (!article) return <p>Loading</p>
    return (
      <div className='main-article'>
        <div>
          <img
            src={article.urlToImage}
            onError={this.onError.bind(this)}
            alt='Img'
          />
        </div>
        <div>
          <div className='main-elem-header'>
            <p className='source-name'>{article.source.name}</p>
            <p className='published-date'>
              {article.publishedAt.substr(0, 10)}
            </p>
          </div>
          <h4>{article.title}</h4>
          <p>{article.description}</p>
        </div>
      </div>
    )
  }
}
export default MainArticle
