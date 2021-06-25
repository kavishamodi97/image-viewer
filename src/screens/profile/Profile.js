import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Profile.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Avatar from '@material-ui/core/Avatar';
import instaLogo from "../../assets/insta.png";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-modal';
import FormHelperText from '@material-ui/core/FormHelperText';

const profileStyles = {
  avatarImageStyle: {
    width: 90,
    height: 90,
    cursor: "pointer"
  },
  profileInfoStyle: {
    fontWeight: "bold",
  },
  tagStyle: {
    display: 'inline',
    paddingRight: '2px',
    marginRight: '5px',
    fontSize: '15px',
    color: '#00FFFF'
  },
  headingStyle: {
    fontSize: '20px',
  },
  likeIconStyle: {
    fontSize: "40px",
  },
  updateModal: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }
}

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

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      postCount: 20,
      follows: 100,
      followedBy: 120,
      editModalOpen: false,
      fullname: "",
      fullnameRequired: "dispNone",
      postDescription: [], //1st endpoint info
      postDetails: [], //2nd endpoint info
      postModalOpen: false,
      isAPIDataFetched: false,
      isLiked: false,
      likeCount: Math.floor(Math.random() * 50),
    }
  }


  //Fetching Post Details From Instagram API Using AJAX Calls
  UNSAFE_componentWillMount() {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({
          postDescription: JSON.parse(this.responseText).data,
          isAPIDataFetched: true
        });
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
            JSON.parse(this.responseText),
          ),
          isAPIDataFetched: true
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

  //Get Post Caption When Post Id Match
  getEachCaptionsFromPost = (id) => {
    this.state.postDescription.map((post) => {
      return post.id === id ? post.caption : null;
    });
  }

  openModelHandler = () => {
    this.setState({ editModalOpen: true });
  }

  closeModalHandler = () => {
    this.setState({ editModalOpen: false });
  }

  openPostModelHandler = () => {
    this.setState({ postModalOpen: true });
  }

  closePostModalHandler = () => {
    this.setState({ postModalOpen: false });
  }

  inputFullnameChangeHandler = (e) => {
    this.setState({ fullname: e.target.value });
  }

  updateClickHandler = (e) => {
    this.state.fullname === "" ? this.setState({ fullnameRequired: "dispBlock" }) : this.setState({ fullnameRequired: "dispNone" });
  }

  //Like and Dislike Post and Toggle Like Icon
  likeClickHandler = () => {
    if (this.state.isLiked) {
      this.setState({ isLiked: false });
    } else {
      this.setState({ isLiked: true });
    }
    if (!this.state.isLiked) {
      this.setState({ likes: this.state.likes + 1 })
    } else {
      this.setState({ likes: this.state.likes - 1 })
    }
  }

  render() {
    if (sessionStorage.getItem("access-token") === null) {
      this.props.history.push("/");
    }
    return (
      <div>
        <Header
          title="Image Viewer"
          history={this.props.history}
          showProfilePage="profile"
        />
        <br /><br />
        <div className="profile-info">
          <div id="avatar">
            <Avatar style={profileStyles.avatarImageStyle} aria-label="recipe" src={instaLogo} />
          </div>
          <div id="header-details">
            <div>
              <Typography variant="subtitle1" style={profileStyles.profileInfoStyle}>
                upgrad
              </Typography>
            </div>
            <Typography variant="caption" style={profileStyles.profileInfoStyle}>
              <div id="postInfo">
                <span className="stat">Posts: {this.state.postCount}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="stat">Follows: {this.state.follows}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="stat">Followed By: {this.state.followedBy}</span>
              </div>
            </Typography>
            <br />
            <div id="editSection">
              <div>
                <Typography style={profileStyles.profileInfoStyle}>
                  update name
                </Typography>
              </div>
              <div>&nbsp;&nbsp;&nbsp;</div>
              <div className="edit-button">
                <Fab size="small" color="secondary" aria-label="edit" onClick={this.openModelHandler}>
                  <EditIcon />
                </Fab>
                <Modal
                  ariaHideApp={false}
                  isOpen={this.state.editModalOpen}
                  contentLabel="Edit"
                  onRequestClose={this.closeModalHandler}
                  style={profileStyles.updateModal}
                >
                  <Typography variant="headline" component="h2">
                    Edit
                  </Typography>
                  <br />
                  <FormControl required>
                    <InputLabel htmlFor="fullname">Full Name</InputLabel>
                    <Input id="fullname" type="text" fullname={this.state.fullname} onChange={this.inputFullnameChangeHandler} />
                    <FormHelperText className={this.state.fullnameRequired}>
                      <span className="red">required</span>
                    </FormHelperText>
                  </FormControl>
                  <br /><br /><br />
                  <Button variant="contained" color="primary" onClick={this.updateClickHandler}>Update</Button>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br />
        <div className="image-posts">
          <GridList cellHeight={160} cols={3} style={{ marginLeft: "15%", marginRight: "10%", textAlign: "center" }}>
            {this.state.postDetails.map((post, index) => (
              <GridListTile key={"postImg" + post.id} style={{ height: '300px', width: '300px' }}>
                <img src={post.media_url} alt={post.username} className="postImage" onClick={() => this.onPostImageClickedHandler(index)} />
              </GridListTile>
            ))}
          </GridList>
        </div>
        {this.state.isAPIDataFetched &&
          <div className="image-modal">
            <Modal
              ariaHideApp={false}
              isOpen={this.state.postModalOpen}
              contentLabel="Post-Modal"
              onRequestClose={this.closePostModalHandler}
            >
              <div className="postModalContainer">
                <div id="postImg">
                  <img src={instaLogo} alt="post-modal-image" className="postModalImage" />
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="modalDetailPane">
                  <div id="titleBar">
                    <div id="modalAvatar">
                      <Avatar aria-label="recipe" src={instaLogo}>
                      </Avatar>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div id="modalUserName">
                      username
                    </div>
                  </div>
                  <Divider style={{ backgroundColor: "#c0c0c0" }} />
                  <br />
                  <Typography variant="h5" style={profileStyles.headingStyle} >
                    set caption here
                  </Typography>
                  <div>
                    <Typography
                      display="inline"
                      variant="caption"
                      style={profileStyles.tagStyle}
                    >
                      #upgrad #skills #onlineplatform
                    </Typography>
                  </div>
                  <br />
                  <div className="like-section">
                    {this.state.isLiked && <FavoriteIcon style={{ color: 'red' }} />}
                    {!this.state.isLiked && <FavoriteBorderIcon style={profileStyles.likeIconStyle} />}
                    <span className="like-post">  {this.state.likeCount} likes</span>
                  </div>
                  <br />  <br /><br /><br /><br /><br /><br /><br /><br />
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
                  <div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>}
      </div>
    )
  }
}

export default Profile;