import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Blogs from "./pages/Blogs";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";
import News from "./pages/News";
import NewPost from "./pages/NewPost";
import NoMatch from "./pages/NoMatch";
import Footer from "./components/Footer";
import Topbar from "./components/Topbar";

function App() {
  return (
    <Router>
    <div>
      <Topbar />
      <ToastContainer />
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/news" component={News} />
      <Route exact path="/blogs" component={Blogs} />
      <Route exact path="/blogs/:id" component={Detail} />
      <Route exact path="/new-post" component={NewPost} />
      <Route exact path="/profile" component={Profile} />
      <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>

    </Router>
  );
}

export default App;
