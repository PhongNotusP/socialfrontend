import React, { Component } from "react";
import Profile from "./Profile";
import { getUserHandle } from "../../actions/profileActions";
import { createPost, getPosts } from "../../actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Feed from "./Feed";
const axios = require("axios");

class Home extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      errors: {},
      imagePreviewUrl: "",
      extension: false,
      status: true,
      fileName: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitDisable = this.onSubmitDisable.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      text: this.state.content,
      image: this.state.imagePreviewUrl,
      extension: this.state.extension,
      fileName: this.state.fileName,
    };
    this.props.createPost(data);
    this.setState({
      content: "",
      imagePreviewUrl: "",
      extension: false,
      fileName: "",
    });
  }

  onSubmitDisable(e) {
    e.preventDefault();
    alert("Đang upload hình đợi tý");
  }

  componentDidMount() {
    this.props.getUserHandle();
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  ////////////
  _handleSubmit(e) {
    e.preventDefault();
  }

  _handleImageChange(e) {
    e.preventDefault();
    this.setState({ status: false });
    const formData = new FormData();
    formData.append("myImage", e.target.files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:1234/api/stories/upload", formData, config)
      .then((response) => {
        this.setState({
          imagePreviewUrl: response.data.data.url,
          status: true,
          extension: response.data.data.extension,
          fileName: response.data.data.originalname,
        });
      })
      .catch((error) => {});
  }
  //////////////
  render() {
    const { handle } = this.props.profile;
    const { posts, loading } = this.props.post;
    const { errors } = this.state;
    let handleLoading;
    let postLoading;
    ///////////
    let { imagePreviewUrl, status } = this.state;
    let $imagePreview = null;
    let fromSubmit = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={`https://drive.google.com/uc?export=view&id=${imagePreviewUrl}`}
        />
      );
    } else {
      $imagePreview = (
        <div
          style={{ textAlign: "center", transform: "translate(0,250%)" }}
          className="previewText"
        >
          {" "}
          Chọn hình
        </div>
      );
    }
    if (status) {
      fromSubmit = (
        <li>
          <a
            className="post_project"
            onClick={this.onSubmit}
            type="submit"
            style={{ marginLeft: "10px", transform: "translate(-20%, -220%)" }}
          >
            Đăng bài viết
          </a>
        </li>
      );
    } else {
      fromSubmit = (
        <li>
          <a
            className="post_project"
            onClick={this.onSubmitDisable}
            type="submit"
            style={{ marginLeft: "10px" }}
          >
            Đang upload
          </a>
        </li>
      );
    }

    //////////////
    if (!handle) {
      handleLoading = <Spinner />;
    } else {
      handleLoading = (
        <div className="post-topbar">
          <div className="user-picy">
            <img
              style={{ paddingTop: "10px" }}
              src={handle.avatar}
              alt={handle.name}
            />
          </div>
          <div className="search-bar">
            <form
              style={{ wordBreak: "break-all" }}
              onSubmit={(e) => this._handleSubmit(e)}
            >
              <input
                style={{
                  width: "500px",
                  wordBreak: "break-all",
                  paddingBottom: "100px",
                  border: "1px solid grey",
                  height: "180px",
                  width: "640px",
                }}
                type="text"
                name="content"
                placeholder="Đăng new feed....."
                onChange={this.onChange}
                value={this.state.content}
              />
              <input
                className="fileInput"
                name="myImage"
                style={{
                  paddingTop: "20px",
                  border: "1px solid grey",
                  width: "350px",
                  height: "60px",
                  transform: "translate(42%, 20%)",
                }}
                type="file"
                onChange={(e) => this._handleImageChange(e)}
              />
              <p
                className="text-danger"
                style={{ width: "500px", wordBreak: "break-all" }}
              >
                {errors.content}
              </p>
              <div
                style={{
                  border: "1px solid grey",
                  transform: "translate(20%,-40%)",
                  height: "120px",
                  width: "120px",
                }}
                className="imgPreview"
              >
                {$imagePreview}
              </div>
              <div className="post-st">
                <ul>{fromSubmit}</ul>
                <ul></ul>
              </div>
            </form>
          </div>
        </div>
      );
    }
    if (!loading) {
      postLoading = <Feed posts={posts} />;
    } else {
      postLoading = <Spinner />;
    }

    return (
      <div>
        <main>
          <div className="main-section">
            <div className="container">
              <div className="main-section-data">
                <div className="row">
                  <div className="col-lg-3 col-md-4 pd-left-none no-pd">
                    <div className="main-left-sidebar no-margin">
                      <Profile handle={handle} />
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 no-pd">
                    <div className="main-ws-sec">
                      {handleLoading}
                      <div className="posts-section">{postLoading}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
Home.propTypes = {
  getUserHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
  post: state.post,
});
export default connect(mapStateToProps, {
  getUserHandle,
  createPost,
  getPosts,
})(Home);
