import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container, ColLight } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import Nav from "../components/Nav";
import NavLoginedIn from "../components/NavLoginedIn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class NewPost extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    AuthorId: 0
  };
  componentDidMount() {
    this.loadCategories();
    this.checkSession();
    this.getAllSessionForMenu();
  }

  getAllSessionForMenu = () => {
    API.getAllSessionForMenu()
      .then(res => {
        if (!res.data.isAuthorLoggin) {
          this.setState({
            menu: false
          });
        } else {
          this.setState({
            menu: true
          });
        }
      })
      .catch(err => console.log(err));
  };
  checkSession = () => {
    API.getAllSession()
      .then(res => {
        if (!res.data.isAuthorLoggin) {
          this.props.history.push("/login", { some: "state" });
        } else {
          this.setState({
            AuthorId: res.data.authorId
          });
        }
      })
      .catch(err => console.log(err));
  };
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      content: "",
      categories: []
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  loadCategories = () => {
    API.getCategories()
      .then(res => {
        this.setState({ categories: res.data.dataCategory });
      })
      .catch(err => console.log(err));
  };

  handleSelectChange = event => {
    this.setState({
      category: event.target.value
    });
  };
  handleTextChange = event => {
    this.setState({
      content: event.target.value
    });
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  resetFields = () => {
    this.setState({
      title: "",
      description: "",
      body: "",
      image: ""
    });
    document.getElementById("bodyToReset").value = "";
  };
  handleFormSubmit = event => {
    event.preventDefault();
    API.savePost({
      title: this.state.title,
      description: this.state.description,
      body: this.state.content,
      image: this.state.image,
      AuthorId: this.state.AuthorId,
      CategoryId: this.state.category
    })
      .then(result => {
        toast.info("Your blog has been posted!");
        this.resetFields();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        {this.state.menu ? <NavLoginedIn /> : <Nav />}
        <Container fluid>
          <Row>
            <Col size="md-12 sm-12">
              <Col size="md-12">
                <h1 className="text-center">Share a New Post</h1>
              </Col>
            </Col>
          </Row>

          <Row>
            <Col size="md-2"></Col>
            <ColLight size="md-8">
              <form>
                <label>Post Title:</label>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="title (required)"
                />
                <label>Post Description:</label>
                <Input
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  name="description"
                  placeholder="description (required)"
                />
                <label>Post Category:</label>
                <div className="form-group">
                  {this.state.categories.length ? (
                    <select
                      className="postCategory"
                      name="category"
                      value={this.state.category}
                      onChange={this.handleSelectChange}
                    >
                      {this.state.categories.map(singleCategory => (
                        <option
                          key={singleCategory.id}
                          value={singleCategory.id}
                        >
                          {singleCategory.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <h3>No Results to Display</h3>
                  )}
                </div>

                <label>Post Content:</label>
                <div className="form-group">
                  <textarea
                    id="bodyToReset"
                    className="form-control"
                    onChange={this.handleTextChange}
                    name="content"
                    placeholder="content (required)"
                  ></textarea>
                </div>
                <label>Featured Image (URL):</label>
                <div className="form-group">
                  <input
                    value={this.state.image}
                    placeholder="http:// (required)"
                    className="form-control"
                    onChange={this.handleInputChange}
                    name="image"
                  />
                </div>
                <hr />
                <FormBtn onClick={this.handleFormSubmit}>Post</FormBtn>
                <a
                  onClick={() => this.resetFields()}
                  href="#"
                  className="registrationLink"
                >
                  Reset
                </a>
              </form>
            </ColLight>
            <Col size="md-2"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default NewPost;
