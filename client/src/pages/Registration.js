import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container, ColDark } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from "../components/Nav";
import NavLoginedIn from "../components/NavLoginedIn";

class Registration extends Component {
  componentDidMount() {
    this.getAllSessionForMenu();
  }
  getAllSessionForMenu = () => {
    API.getAllSessionForMenu()
      .then((res) => {
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
  state = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    rPassword: "",
    flagTrue: "",
    flagFalse: "",
    profileURL: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  resetFields = () => {
    this.setState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      rPassword: "",
      flagFalse: "",
      flagTrue: ""
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.password.length < 6) {
      toast.error("Password is weak...(minimum 6 charachter)")
    }
    else {
      if (this.state.password === this.state.rPassword) {
        this.setState({ flagTrue: 'MATCHED', flagFalse: '' })
        API.authorRegister({
          fname: this.state.fname,
          lname: this.state.lname,
          email: this.state.email,
          password: this.state.password,
          profileURL: this.state.profileURL
        })
          .then((result) => {
            if (result.data.existed === true) {
              toast.error("User already exists...!");

            }
            else {

              toast.info("Your profile has been created, please login");

              this.props.history.push('/login', { some: 'state' })
            }
          })
          .catch(err => console.log(err));

      } else {
        this.setState({ flagFalse: 'NOT MATCHED', flagTrue: '' })
      }
    }

  }



  render() {
    return (
      <div>
        {this.state.menu ? <NavLoginedIn /> : <Nav />}
        <Container fluid>
          <Row>
            <Col size="md-12 sm-12">
              <Col size="md-12">
                <h1 className="text-center">Registration</h1>
              </Col>
            </Col>
          </Row>

          <Row>
            <Col size="md-4"></Col>
            <ColDark size="md-4">
              <form>
                <label>First Name:</label>
                <Input
                  value={this.state.fname}
                  onChange={this.handleInputChange}
                  name="fname"
                  placeholder="John (required)"
                />
                <label>Last Name:</label>
                <Input
                  value={this.state.lname}
                  onChange={this.handleInputChange}
                  name="lname"
                  placeholder="Wick (required)"
                />
                <label>Email Address:</label>
                <Input
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  name="email"
                  type="email"
                  placeholder="john@site.com (required)"
                />
                <label>Password:</label>
                <Input
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  name="password"
                  type="password"
                  placeholder="***** (required)"
                />
                <label>Repeat Password:</label>
                <label style={{ color: 'red', fontWeight: 'bolder' }} >{this.state.flagFalse}</label>
                <label style={{ color: 'Green', fontWeight: 'bolder' }} >{this.state.flagTrue}</label>
                <Input
                  value={this.state.rPassword}
                  onChange={this.handleInputChange}
                  name="rPassword"
                  type="password"
                  placeholder="***** (required)"
                />
                <label>Profile Picture URL:</label>
                <Input
                  value={this.state.profileURL}
                  onChange={this.handleInputChange}
                  name="profileURL"
                  type="text"

                  placeholder="http://.... (required)"
                />
                <hr />
                <FormBtn
                  disabled={!(this.state.fname && this.state.lname && this.state.email && this.state.password && this.state.rPassword && this.state.profileURL)}
                  onClick={this.handleFormSubmit}
                >
                  Register
              </FormBtn>

                <a onClick={() => this.resetFields()} href="#" className="registrationLink">Reset</a>

              </form>
            </ColDark>
            <Col size="md-4"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Registration;
