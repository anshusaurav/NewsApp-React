import React from 'react'
class HeadArticles extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        var articles = this.props.articles;
        if(!articles)
            return <p>Loading</p>;
        return (
            <div className='headline-section-grid'>
                {
                    articles.map(article =>{
                        return (
                            <div className='headline-elem'>
                                <div>
                                    <img src= {article.urlToImage} alt={article.title}/>
                                </div>
                                <p>{article.title}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default HeadArticles;