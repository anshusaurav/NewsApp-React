import React from 'react'
import shortid from "shortid";
class HeadArticles extends React.Component {
  render () {
    var articles = this.props.articles
    if (!articles) return <p>Loading</p>
    return (
      <>
        <h2>Headlines</h2>
        <div className='headline-section-grid'>
          {articles.map(article => {
            return (
              <div className='headline-elem' key={shortid.generate()}>
                <div className='headline-elem-header'>
                  <p className='source-name'>{article.source.name}</p>
                  <p className='published-date'>{article.publishedAt.substr(0,10)}</p>
                </div>
                <p>{article.title}</p>
              </div>
            )
          })}
        </div>
      </>
    )
  }
}
export default HeadArticles
