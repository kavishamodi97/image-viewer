import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Profile.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Avatar from '@material-ui/core/Avatar';
import instaLogo from "../../assets/insta.png";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-modal';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridList: {
    width: 750,
    height: 'auto',
    overflowY: 'auto',
    textAlign: "center"
  },
  gridListTileStyle: {
    height: '750px',
    width: '750px',
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: theme.spacing(),
    width: 900,
  },
});

const postModalstyles = {
  postsStyle: {
    height: '300px',
    paddingTop: '30%',
  },
  hashtagStyle: {
    color: '#2fc3e0'
  },
  editModal: {
    position: 'relative',
    width: "180px",
    backgroundColor: "white",
    top: "28%",
    padding: "2%",
    margin: "0 auto"
  }
};

const profileStyles = {
  avatarImageStyle: {
    width: 70,
    height: 70,
    cursor: "pointer"
  },
  profileInfoStyle: {
    fontWeight: "bold",
  },
  fullnameStyle: {
    fontWeight: "bold",
    paddingTop: '6px'
  },
  hashtagStyle: {
    display: 'inline',
    paddingRight: '2px',
    marginRight: '5px',
    fontSize: '13px',
    color: "#5bbce4"
  },
  headingStyle: {
    fontSize: '20px',
  },
  redLikeIconStyle: {
    color: "red"
  },
  updateModal: {
    content: {
      top: '60%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }
}

const commentStyle = {
  commentButtonStyle: {
    marginTop: "25px",
    marginLeft: "10px"
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
      updatedFullName: '',
      postDescription: [], //1st endpoint info
      postDetails: [], //2nd endpoint info
      postModalOpen: false,
      currentImageIndex: 0,
      isAPIDataFetched: false,
      isLiked: false,
      likes: Math.floor(Math.random() * 10) + 1,
      comments: [],
      comment: ""
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
    this.setState({
      updatedFullName: e.target.value
    })
  }

  updateClickHandler = (e) => {
    if (this.state.updatedFullName === '') {
      this.setState({ fullNameRequired: 'dispBlock' })
    } else {
      this.setState({ fullNameRequired: 'dispNone' })
    }

    if (this.state.updatedFullName === "") { return }

    this.setState({
      fullName: this.state.updatedFullName
    })
    this.closeModalHandler();
  }

  postImageClickHandler = (index) => {
    this.setState({ currentImageIndex: index });
    this.openPostModelHandler();
  }

  commentChangeHandler = (e) => {
    this.setState({
      comment: e.target.value,
    });
  }

  //Add Comments To Specific Post
  commentAddHandler = () => {
    if (this.state.comment === '') {
      return
    }
    this.setState({
      comments: this.state.comments.concat(this.state.comment),
      comment: ''
    })
  }

  // Toggle the like icon And Increase And Descrease Likes
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
    const { classes } = this.props;
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
                <Typography style={profileStyles.fullnameStyle}>
                  {this.state.fullName}
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
        <div className={classes.gridContainer}>
          <GridList cellHeight={'auto'} cols={3} className={classes.gridList}>
            {this.state.postDetails.map((item, index) => (
              <GridListTile key={item.id} className={classes.gridListTileStyle}>
                <img src={item.media_url} alt={item.caption} className="postImage" onClick={() => this.postImageClickHandler(index)} />
              </GridListTile>
            ))}
          </GridList>
        </div>
        {this.state.isAPIDataFetched &&
          <Modal
            aria-labelledby="image-modal"
            aria-describedby="modal to show image details"
            isOpen={this.state.postModalOpen}
            onRequestClose={this.closePostModalHandler}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: "#fff", width: '70%', height: '70%' }}>
              <div style={{ width: '50%', padding: 10 }}>
                <img style={{ height: '100%', width: '100%' }}
                  src={instaLogo}
                  alt="modal1" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '50%', padding: 10 }}>
                <div style={{ borderBottom: '2px solid #f2f2f2', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Avatar
                    alt="User Image"
                    src={instaLogo}
                    style={{ width: "50px", height: "50px", margin: '10px' }} />
                  <Typography component="p">
                    kavisha
                  </Typography>
                </div>
                <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ marginLeft: '5px' }}>
                    <Typography component="p" style={{ paddingTop: "6px" }}>
                      hi my caption
                    </Typography>
                    <Typography style={postModalstyles.hashtagStyle} component="p" >
                      #coding #skills #passion
                    </Typography>
                  </div>
                  <div>
                    <br />  <br />   <br /><br /> <br /> <br /> <br /> <br />
                    <div className="right-botton row">
                      <IconButton aria-label="Add to favorites" onClick={this.likeClickHandler}>
                        {this.state.isLiked && <FavoriteIconFill style={profileStyles.redLikeIconStyle} />}
                        {!this.state.isLiked && <FavoriteIconBorder />}
                      </IconButton>
                      <span>
                        {this.state.likes} likes
                      </span>
                    </div>
                    <div className={classes.formControl}>
                      <FormControl style={{ flexGrow: 1 }}>
                        <InputLabel style={{ width: '100%' }} htmlFor="comment">Add a comment</InputLabel>
                        <Input id="comment" value={this.state.comment} onChange={this.commentChangeHandler} />
                      </FormControl>
                      <FormControl className="commentAdd">
                        <Button className="addBtn" variant="contained" color="primary" style={commentStyle.commentButtonStyle} onClick={this.commentAddHandler}>ADD</Button>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>}
      </div>
    )
  }
}
export default withStyles(styles)(Profile);