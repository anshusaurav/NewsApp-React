import React from 'react'

class MainArticle extends React.Component {
  
  render () {
    let { article } = this.props
    if (!article) return <p>Loading</p>
    return (
      <div className='main-article'>
        <div className='main-article-img-div'>
          <img
            src={article.urlToImage}
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
