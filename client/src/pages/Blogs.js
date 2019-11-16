import React, { Component } from "react";
import API from "../utils/API";
import Nav from "../components/Nav";
import NavLoginedIn from "../components/NavLoginedIn";
import { Col, Row, Container } from "../components/Grid";
import { Link } from "react-router-dom";
import "./style.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Blogs extends Component {
  state = {
    menu: false,
    allBlogs: []
  };


  componentDidMount() {
    this.getAllSessionForMenu();
    this.getAllBlogs();
  }
  getAllBlogs = () => {
    API.getAllBlogs()
      .then((res) => {
        toast.info("Blogs are loading... !");
        console.log(res.data)
        this.setState({ allBlogs: res.data })
        console.log(this.state.allBlogs)
      }).catch(err => console.log(err))
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


  render() {
    return (
      <div className={"noSpacing"}>
        {this.state.menu ? <NavLoginedIn /> : <Nav />}
        <Container>
          <Row>
            <Col size="md-12">
              <h3 style={{ paddingTop: '15px' }} className="text-center">Latest Blogs</h3>
            </Col>
          </Row>

          {this.state.allBlogs.length ? (
            <Row>
              {this.state.allBlogs.map(singleBlog => (

                <Col size="md-4 sm-4">
                  <img className="img-fluid img-thumbnail" src={singleBlog.image} alt="" />
                  <Col size="md-12">
                    <h6><strong>Title: </strong>{singleBlog.title}</h6>
                  </Col>
                  <Col size="md-12">
                    <p><strong>Date:</strong><small>{singleBlog.createdAt}</small><strong> By </strong><small>{singleBlog.Author.fname}</small></p>
                  </Col>
                  <p>{singleBlog.description}</p>
                  <Link className="text-center" to={"/blogs/" + singleBlog.id}>Read More!</Link>
                </Col>
              ))}
            </Row>

          ) : (<h3>No Results to Display</h3>)}





        </Container>
      </div>
    );
  }
}

export default Blogs;
