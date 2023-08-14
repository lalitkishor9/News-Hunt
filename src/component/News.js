import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component 
{

  Capitalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totResult: 0,
    };

    document.title = `${this.Capitalise(this.props.category)} - News Hunt`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b84ea7fe76bc4ca9888a0d1533595979&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();;
    this.props.setProgress(70);
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totResult: parseData.totalResults,
      loading: false,
      hasMore:1
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 , loading : false});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totResult: parseData.totalResults,
      hasMore: this.state.articles.length !== parseData.totalResults,
      loading : true
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">
          News Hunt - Top {this.Capitalise(this.props.category)} Headlines
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          // loader={ <Spinner />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Reached to the end</b>
            </p>
          }
          
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element,index) => {
                return (
                  <div className="col-md-4 " key={index}>
                    <NewsItem
                      title={element.title ? element.title : " "}
                      description={
                        element.description ? element.description : " "
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
              {!this.state.loading && <Spinner />}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
