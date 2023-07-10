import React, { Component } from 'react'

export class NewsItem extends Component {
    
    render() {
      let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
        <div className="my-3">
        <div className="card" >
        <span className="position-absolute top-0  translate-middle  bg-success text-light  rounded " style={{left:"85%" , zIndex:1, fontSize:"12px"}}>{source}
          </span>
        <img src={imageUrl?imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKivvwviZEIWSn37AktW02XYUiufInNC35dQ&usqp=CAU"} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItem