import React, { Component } from "react";
import API from "../utils/API";
import Nav from "../components/Nav";
import NavLoginedIn from "../components/NavLoginedIn";
import { Col, Row, Container } from "../components/Grid";
import { Link } from "react-router-dom";
import "./style.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Detail extends Component {

  state = {
    blog: [],
    id: '',
    author: [],
    category: [],
    allNews: []
  };

  componentDidMount() {
    this.getAllSessionForMenu();
    this.getSingleBlog()
    this.apiNewsCall();
  }
  apiNewsCall = () => {
    API.getNewsFive()
      .then((res) => {
        toast.info('Loading...')
        console.log(res.data)
        this.setState({allNews:res.data})
      }).catch(err => console.log(err));
  }
  getAllSessionForMenu = () => {
    API.getAllSessionForMenu()
      .then((res) => {
        console.log(res)
        if (!(res.data.isAuthorLoggin)) {

          this.setState({
            menu: false
          })
        } else {
          this.setState({
            menu: true
          })
        }
      })
      .catch(err => console.log(err))
  }
  getSingleBlog = () => {
    API.getBlog(this.props.match.params.id)
      .then((res) => {
        this.setState({ blog: res.data, author: res.data.Author, category: res.data.Category })
        console.log(this.state.blog)
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="noSpacing">
        {this.state.menu ? <NavLoginedIn /> : <Nav />}
        <br />
        <Container>
          <Row>
            <Col size="md-9">
              <Row>
                <img className="img-fluid img-thumbnail" src={this.state.blog.image} />
              </Row>
              <Row>
                <Col size="md-12">
                  <h3 style={{ paddingTop: '15px' }} className="text-center">{this.state.blog.title}</h3>
                </Col>
              </Row>
              <Row>
                <Col size="md-12">
                  <p>{this.state.blog.body}</p>
                </Col>
              </Row>
              <hr />
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
              <span><strong> Author: {this.state.author.fname}</strong></span>
              <span> - </span>
              <span><strong>Create Date: {this.state.blog.createdAt}</strong></span>
            </Col>
            
            <Col size="md-3">
            <div className="sidebar">
            {this.state.allNews.length ? (
                 <div>

                    {this.state.allNews.map(singleNews => (
                      <div className={"rowMarginSpace"}>
                      <Row>
                        <Col size="md-12">


                          <img className="img-thumbnail" src={singleNews.urlToImage} />
                           <p><strong>Title: </strong>{singleNews.title}</p>
                           <a target="_blank" href={singleNews.url} className="NewsReadMore">Read More...</a>
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
    );
  }
}

export default Detail;
