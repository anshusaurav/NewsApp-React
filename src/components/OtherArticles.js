import React from 'react'

class OtherArticles extends React.Component{
    
    render(){
        var articles = this.props.articles;
        if(!articles)
            return <p>Loading</p>;
        return (
            <div className='other-articles'>
                {
                    articles.map(article =>{
                        return (
                            <div>
                                <div>
                                    <img src= {article.urlToImage} alt={article.title}/>
                                </div>
                                <div className='other-elem-header'>
                                    <p className='source-name'>{article.source.name}</p>
                                    <p className='published-date'>{article.publishedAt.substr(0,10)}</p>
                                </div>
                                <h4>{article.title}</h4>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default OtherArticles;