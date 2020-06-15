import React from 'react'

class MainArticle extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        let {article}= this.props;
        if(!article)
            return <p>Loading</p>;
        return(
            <div class='main-article'>
                <div>
                    <img src={article.urlToImage} alt='Img'/>
                </div>
                <div>
                    <h4>{article.title}</h4>
                    <p>{article.description}</p>
                </div>
            </div>
        );
    }
}
export default MainArticle;