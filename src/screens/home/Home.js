import React, { Component } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import instaLogo from "../../assets/insta.png";
import Divider from "@material-ui/core/Divider";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  gridListMain: {
    transform: "translateZ(0)",
    width: "1500px",
  },
  formControl: {
    margin: theme.spacing(),
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  },
});

const postStyle = {
  hashtagStyle: {
    display: "inline",
    paddingRight: "2px",
    fontSize: "15px",
    color: "#5bbce4",
  },
  captionStyle: {
    fontSize: "20px",
    paddingTop: "10px",
    fontWeight: "bold",
    color: "black",
  },
  likeIconStyle: {
    fontSize: "40px",
  },
};

const gridListTileStyle = {
  width: "650px",
  margin: "20px",
};

const cardStyle = {
  width: "100%",
  height: "100%",
};

const commentStyle = {
  formControlStyle: {
    width: "90%",
    marginRight: "10px",
    height: "40px",
    marginTop: "60px",
  },
  commentButtonStyle: {
    height: "50px",
    marginTop: "60px",
  },
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      postDescription: [], //1st endpoint info
      postDetails: [], //2nd endpoint info
      searchField: '',
      likeIcon: "dispBlock",
      likedIcon: "dispNone",
      likeCount: Math.floor(Math.random() * 50),
    };
  }

  UNSAFE_componentWillMount() {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({ postDescription: JSON.parse(this.responseText).data });
        // get the post details for each post description
        that.getPostDetails();
      }
    });
    xhr.open(
      "GET",
      "https://graph.instagram.com/me/media?fields=id,caption&access_token=" +
      window.sessionStorage.getItem("access-token")
    );
    xhr.send(data);
  }

  //get post details
  getPostDetails = () => {
    this.state.postDescription.map((post) => {
      return this.getPostDetailsById(post.id, post.caption);
    });
  };

  //get unique post Id
  getPostDetailsById = (id, caption) => {
    let that = this;
    let xhr = new XMLHttpRequest();
    let data = null;
    console.log("post id here :" + id);
    console.log("post caption here:" + caption);
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({
          postDetails: that.state.postDetails.concat(
            JSON.parse(this.responseText)
          ),
        });
      }
    });
    xhr.open(
      "GET",
      "https://graph.instagram.com/" +
      id +
      "?fields=id,media_type,media_url,username,timestamp&access_token=" +
      sessionStorage.getItem("access-token")
    );
    xhr.send(data);
  };

  //search specific post by caption
  searchTextChangeHandler = (e) => {
    const { postDescription, searchField } = this.state;
    const filteredPost = postDescription.filter((post) => {
      return post.caption.toLowerCase().includes(searchField.toLowerCase())
    });
    this.setState({ postDetails: filteredPost });
  }

  // Convert post date into DD/MM/YYYY HH:MM:SS format
  convertTimeStampIntoDateFormat = (newDate) => {
    let date = new Date(newDate);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let hh = date.getHours();
    let MM = date.getMinutes();
    let ss = date.getSeconds();
    dd = dd < 10 ? "0" + dd : dd;
    mm = mm < 10 ? "0" + mm : mm;
    return (dd + "/" + mm + "/" + yyyy + " " + hh + ":" + MM + ":" + ss);
  }

  //Get Post Caption When Post Id Match
  getEachCaptionsFromPost = (id) => {
    return this.state.postDescription.map((post) => {
      if (post.id === id) {
        console.log("get each caption from post" + post.caption);
        return post.caption.split("\n")[0];
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          history={this.props.history}
          title="Image Viewer"
          showHomePage="home"
          onSearchTextChanged={(e) => this.searchTextChangeHandler(e.target.value)}
        ></Header>
        <div className="grid-container">
          <GridList cols={2} cellHeight={1100} className={classes.gridListMain}>
            {this.state.postDetails.map((post) => (
              <GridListTile key={"post" + post.id} style={gridListTileStyle}>
                <Card
                  style={{ cardStyle }}
                  variant="outlined"
                  key={"post" + post.id}
                >
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" src={instaLogo}></Avatar>
                    }
                    title={post.username}
                    subheader={this.convertTimeStampIntoDateFormat(post.timestamp)}
                  ></CardHeader>
                  <CardContent>
                    <img
                      src={post.media_url}
                      alt={post.username}
                      className="post-image"
                    />
                    <br />
                    <br />
                    <Divider style={{ backgroundColor: "#c0c0c0" }} />
                    <Typography variant="h5" style={postStyle.captionStyle}>
                      {this.getEachCaptionsFromPost(post.id)}
                    </Typography>
                    <div>
                      <Typography
                        display="inline"
                        variant="caption"
                        style={postStyle.hashtagStyle}
                      >
                        #upgrad #skills #onlineplatform
                      </Typography>
                    </div>
                    <div className="like-section">
                      <FavoriteBorderIcon style={postStyle.likeIconStyle} />
                      <span className="like-post">  {this.state.likeCount}likes</span>
                    </div>
                    <div className="comment-section">
                      <FormControl style={commentStyle.formControlStyle}>
                        <InputLabel htmlFor="addComment">
                          Add a comment
                        </InputLabel>
                        <Input
                          id="addComment"
                          type="text"
                          placeholder="Add a comment"
                        />
                      </FormControl>
                      <Button
                        variant="contained"
                        color="primary"
                        style={commentStyle.commentButtonStyle}
                      >
                        ADD
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);