import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
   Capitalise = (string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}
    static defaultProps = {
      country:'in',
      pageSize :8,
      category:'general'
    }
    constructor(props){
        super(props);
        console.log("I am a constructor of news")
        this.state = {
          articles: [],
          loading: false,
          page : 1,
          totResult:1
        }
        document.title = `${this.Capitalise(this.props.category)} - News Hunt`;
    }

    // async updateNews(){
    //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b84ea7fe76bc4ca9888a0d1533595979&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading : true});
    //   let data =  await fetch(url);
    //   let parseData = await data.json();
    //   console.log(parseData);
    //   this.setState({articles : parseData.articles, totResult : parseData.totalResults , loading : false})
    // }


    async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b84ea7fe76bc4ca9888a0d1533595979&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading : true});
      let data =  await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({articles : parseData.articles, totResult : parseData.totalResults , loading : false})
    }
    handleNextClick = async ()=>{
      if(!(Math.ceil(this.state.totResult/this.props.pageSize) < this.state.page+1)){
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b84ea7fe76bc4ca9888a0d1533595979&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data =  await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
          page : this.state.page + 1,
          articles: parseData.articles,
          loading : false
        })
      }
      // this.setState({page: this.state.page + 1});
      // this.updateNews();

    }
     handlePrevClick = async()=>{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b84ea7fe76bc4ca9888a0d1533595979&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true});
      let data =  await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        page : this.state.page  - 1,
        articles: parseData.articles,
        loading : false
      })

    //   this.setState({page: this.state.page - 1});
    //   this.updateNews();
    }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News Hunt - Top {this.Capitalise(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}
        <div className="row">
        {!(this.state.loading) && this.state.articles.map((element)=>{     

            return <div className="col-md-4 " key={element.url}>
                <NewsItem  title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>

            </div>
        })}
        </div>
        <div className='container d-flex justify-content-between'>
        <button type="button" disabled={this.state.page <= 1} className="btn btn-dark " onClick={this.handlePrevClick}> &larr;Previous</button>
        <button type="button" disabled={Math.ceil(this.state.totResult/this.props.pageSize) < this.state.page + 1} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News