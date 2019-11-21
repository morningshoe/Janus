import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container, ColDark } from "../components/Grid";
import {toast} from "react-toastify"
import { Link } from "react-router-dom";
import {moment} from "moment";
import 'react-toastify/dist/ReactToastify.css'
import Nav from "../components/Nav";
import NavLoginedIn from "../components/NavLoginedIn";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    description: "",
      allNews: [],
      allBlogs:[]
    }

  }
 
  componentDidMount() {
    this.apiNewsCall();
    this.getAllSessionForMenu();
    this.getAllBlogs();
  }
  getAllBlogs = () => {
    API.getAllBlogs3()
      .then((res) => {
        toast.info("Loading sidebar blogs");
        console.log(res.data)
        this.setState({ allBlogs: res.data })
        console.log(this.state.allBlogs)
      }).catch(err => console.log(err))
  }
  getAllSessionForMenu = ()=>{
    API.getAllSessionForMenu()
    .then((res) =>{
     console.log(res)
      if(!(res.data.isAuthorLoggin)){
      
        this.setState({
         menu:false
        })
      }else{
       this.setState({
         menu:true
        })
      }
    })
    .catch(err => console.log(err))
  }
  apiNewsCall = () => {
    API.getNews()
      .then((res) => {
        toast.info('Loading...')
        console.log(res.data)
        this.setState({allNews:res.data})
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
      {this.state.menu ? <NavLoginedIn /> : <Nav />}
      <br />
      <Container fluid>
        {/* {this.state.articles.map(singleNews => */}
        <Row>
          <Col size="md-9">
          <Col size="md-12 sm-12">
            <Col size="md-12">
              {/* <img src={this.state.newsArray.articles.urlToImage} /> */}
              {/* <p>{this.state.newsArray.articles.title}</p> */}
              {this.state.allNews.length ? (
                 <div>
                    {this.state.allNews.map(singleNews => (
                      <div className={"rowMarginSpace"}>
                      <Row>
                        <Col size={"md-3"}>
                          <img className="img-thumbnail" src={singleNews.urlToImage} />
                        </Col>
                        <Col size={"md-9"}>
                           <p><strong>Title: </strong>{singleNews.title}</p>
                           <p><small>Author: {singleNews.author}</small></p>
                           <p><strong>Description: </strong>{singleNews.description}</p>
                           <a target="_blank" href={singleNews.url} className="NewsReadMore">Read More...</a>
                        </Col>
                      </Row>
                      <hr />
                      </div>
                      
                    ))}
                  </div>

                ) : (
                    <h3></h3>
                  )} 
            </Col>
          </Col>
          </Col>
         <Col size="md-3">
         <div className="sidebar">
           <h4>Latest Blogs</h4>
            {this.state.allBlogs.length ? (
                 <div>

                    {this.state.allBlogs.map(singleBlog => (
                      <div className={"rowMarginSpace"}>
                      <Row>
                        <Col size="md-12">
                        

                          <img className="img-thumbnail" src={singleBlog.image} />
                           <p><strong>Title: </strong>{singleBlog.title}</p>
                           <Link className="text-center NewsReadMore" to={"/blogs/" + singleBlog.id}>Read More!</Link>
                        </Col>

                      </Row>
                      <hr className="divider" />
                      </div>
                      
                    ))}
                  </div>

                ) : (
                    <h3></h3>
                  )} 
              </div>
         
         </Col>

        </Row>
        </Container>
        </div>
        )
    
  };
  }
  export default News;
