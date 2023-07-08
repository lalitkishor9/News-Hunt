import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  

  
    constructor(){
        super();
        console.log("I am a constructor of news")
        this.state = {
          articles: [],
          loading: false,
          page : 1,
          totResult:1
        }
    }

    async componentDidMount(){
      let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=0b67abcf2715477ca9486391e69f1af3&page=1&pageSize=18";
      let data =  await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({articles : parseData.articles, totResult : parseData.totalResults})
    }
    handleNextClick = async ()=>{
      if(Math.ceil(this.state.totResult/18) < this.state.page+1){
        alert("sorry !You reach to the end");
      }
      else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0b67abcf2715477ca9486391e69f1af3&page=${this.state.page + 1}&pageSize=18`;
        let data =  await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
          page : this.state.page + 1,
          articles: parseData.articles
        })
      }
    
    }
     handlePrevClick = async()=>{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0b67abcf2715477ca9486391e69f1af3&page=${this.state.page - 1}&pageSize=18`;
      let data =  await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        page : this.state.page + -1,
        articles: parseData.articles
      })
    }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News Hunt - Top Headlines</h1>
        <div className="row">
        {this.state.articles.map((element)=>{     

            return <div className="col-md-4 " key={element.url}>
                <NewsItem  title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage} newsUrl={element.url}/>

            </div>
        })}
        </div>
        <div className='container d-flex justify-content-between'>
        <button type="button" disabled={this.state.page <= 1} className="btn btn-dark " onClick={this.handlePrevClick}> &larr;Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News