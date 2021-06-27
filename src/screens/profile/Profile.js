import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Profile.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import instaLogo from "../../assets/insta.png";

const styles = {
  media: {
    height: '200px',
    paddingTop: '56.25%',
    cursor: 'pointer'
  },
  editFullNameContainer: {
    boxShadow: "2px 2px #888888",
    padding: "20px",
    position: 'relative',
    width: "180px",
    backgroundColor: "#fff",
    top: "30%",
    margin: "0 auto",
  },
  profileHeadInfo: { float: "left", width: "200px", fontSize: '16px', fontWeight: 'bold' },
  profileSummary: { width: "600px", fontSize: '16px', fontWeight: 'bold' },
  openedImageObjModal: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  openedImageObjContainer: { display: 'flex', flexDirection: 'row', backgroundColor: "#fff", width: '70%', height: '70%' },
  openedImageObjContainerRow1: { width: '50%', padding: 10 },
  openedImageObjContainerRow2: { display: 'flex', flexDirection: 'column', width: '50%', padding: 10 },
  openedImageObjContainerRow21: { borderBottom: '2px solid #c0c0c0', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
  openedImageObjContainerRow22: { display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }
};

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      postDescription: [], //1st Endpoint 
      postDetails: [], //2nd Endpoint
      likes: Math.floor(Math.random() * 10) + 1,
      follows: Math.floor(Math.random() * 10) + 1,
      followedBy: Math.floor(Math.random() * 10) + 1,
      isLiked: false,
      user: "kavisha",
      fullname: "Kavisha Modi",
      newFullName: '',
      editModalIsOpen: false,
      fullNameRequired: 'dispNone',
      imageModalIsOpen: false,
      openedPostObj: null,
      postMediaObj: null,
      comments: {},
      postComment: '',
    }
  }

  //Fetch Instagram Data Using AJAX Calls
  componentWillMount() {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        that.setState({ postDescription: JSON.parse(this.responseText).data });
        that.getPostDetails();
      }
    })
    xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token=" + sessionStorage.getItem('access-token'));
    xhr.send(data)
  }

  //Get List Of Ids From API
  getPostDetails = () => {
    this.state.postDescription.map(post => {
      this.getPostDetailsById(post.id)
    });
  }

  //Get Post Details From API
  getPostDetailsById = (id) => {
    let that = this
    let xhr = new XMLHttpRequest();
    let data = null
    console.log("post id here :" + id)
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        that.setState({
          postDetails: that.state.postDetails.concat(JSON.parse(this.responseText))
        });
      }
    })
    xhr.open("GET", "https://graph.instagram.com/" + id + "?fields=id,media_type,media_url,username,timestamp&access_token=" + sessionStorage.getItem('access-token'))
    xhr.send(data)
  }

  openEditModalHandler = () => {
    this.setState({ editModalIsOpen: true });
  }

  closeEditModalHandler = () => {
    this.setState({
      editModalIsOpen: false,
      fullNameRequired: 'dispNone'
    });
  }

  fullNameChangeHandler = (e) => {
    this.setState({
      newFullName: e.target.value
    })
  }

  updateFullNameHandler = () => {
    if (this.state.newFullName === '') {
      this.setState({ fullNameRequired: 'dispBlock' })
    } else {
      this.setState({ fullNameRequired: 'dispNone' })
    }

    if (this.state.newFullName === '') { return }

    this.setState({
      fullname: this.state.newFullName
    })

    this.closeEditModalHandler()
  }

  openPostImageModalHandler = (event) => {
    var descResult = this.state.postDescription.find(item => {
      return item.id === event.target.id
    })
    var mediaDetails = this.state.postDetails.find(item => {
      return item.id === event.target.id
    })
    this.setState({ imageModalIsOpen: true, openedPostObj: descResult, postMediaObj: mediaDetails });
  }

  closeImageModalHandler = () => {
    this.setState({ imageModalIsOpen: false });
  }

  likeClickHandler = (id) => {
    if (!this.state.isLiked) {
      this.setState({
        likes: this.state.likes + 1
      })
    } else {
      this.setState({
        likes: this.state.likes - 1
      })
    }
    if (this.state.isLiked) {
      this.setState({
        isLiked: false
      });
    } else {
      this.setState({
        isLiked: true
      });
    }
  }

  addCommentHandler = (id) => {
    console.log('id', id);
    if (this.state.postComment === "" || typeof this.state.postComment === undefined) {
      return;
    }

    let commentList = this.state.comments.hasOwnProperty(id) ?
      this.state.comments[id].concat(this.state.postComment) : [].concat(this.state.postComment);

    this.setState({
      comments: {
        ...this.state.comments,
        [id]: commentList
      },
      postComment: ''
    })
  }

  commentChangeHandler = (e) => {
    this.setState({
      postComment: e.target.value
    });
  }

  render() {
    const { classes } = this.props;
    let likeCount = this.state.likes;
    return (
      <div>
        <Header
          title="Image Viewer"
          history={this.props.history}
          showProfilePage="profile"
        />
        <div className="top-container">
          <Avatar className="profile-picture-avatar"
            alt="User Image"
            style={{ cursor: 'pointer' }}
            src={instaLogo}
          />
          <span style={{ marginLeft: "20px" }}>
            <div className={classes.profileSummary}> {this.state.user} <br /><br />
              <div className={classes.profileHeadInfo}> Posts: {this.state.postDetails.length} </div>
              <div className={classes.profileHeadInfo}> Follows:  {this.state.follows}</div>
              <div className={classes.profileHeadInfo}> Followed By: {this.state.followedBy} </div> <br />
            </div><br />
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}> {this.state.fullname}
              <Fab mini variant="round" color="secondary" aria-label="Edit" style={{ marginLeft: "20px" }} onClick={this.openEditModalHandler}>
                <EditIcon />
              </Fab>
            </div>
            <Modal
              aria-labelledby="edit-full-name-modal"
              open={this.state.editModalIsOpen}
              onClose={this.closeEditModalHandler}
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <div style={styles.editFullNameContainer}>
                <Typography variant="h5" id="modal-title">
                  Edit
                </Typography><br />
                <FormControl required>
                  <InputLabel htmlFor="fullname">Full Name</InputLabel>
                  <Input id="fullname" onChange={this.fullNameChangeHandler} />
                  <FormHelperText className={this.state.fullNameRequired}><span className="red">required</span></FormHelperText>
                </FormControl><br /><br /><br />
                <Button variant="contained" color="primary" onClick={this.updateFullNameHandler}>
                  UPDATE
                </Button>
              </div>
            </Modal>
          </span>
        </div>
        {this.state.postDetails != null &&
          <GridList cellHeight={'auto'} cols={3} style={{ padding: "40px" }}>
            {this.state.postDetails.map(item => (
              <GridListTile key={item.id}>
                <CardMedia
                  id={item.id}
                  style={styles.media}
                  image={item.media_url}
                  title=""
                  onClick={this.openPostImageModalHandler}
                />
              </GridListTile>
            ))}
          </GridList>}
        {this.state.openedPostObj != null &&
          <Modal
            aria-labelledby="image-modal"
            aria-describedby="modal to show image details"
            open={this.state.imageModalIsOpen}
            onClose={this.closeImageModalHandler}
            className={classes.openedImageObjModal}>
            <div className={classes.openedImageObjContainer}>
              <div className={classes.openedImageObjContainerRow1}>
                <img style={{ height: '100%', width: '100%' }}
                  src={this.state.postMediaObj.media_url}
                  alt={this.state.openedPostObj.caption} />
              </div>

              <div className={classes.openedImageObjContainerRow2}>
                <div className={classes.openedImageObjContainerRow21}>
                  <Avatar
                    alt="User Image"
                    src={instaLogo}
                    style={{ width: "50px", height: "50px", margin: '10px' }} />
                  <Typography component="p" style={{ fontWeight: 'bold' }}>
                    {this.state.user}
                  </Typography>
                </div>
                <div className={classes.openedImageObjContainerRow22}>
                  <div>
                    <Typography component="p" style={{ fontWeight: 'bold', marginLeft: '5px', paddingTop: '8px' }}>
                      {this.state.openedPostObj.caption}
                    </Typography>
                    <Typography style={{ color: '#4dabf5', marginLeft: '5px' }} component="p" >
                      #Coding #Skills #Passion
                    </Typography>
                    {this.state.comments.hasOwnProperty(this.state.openedPostObj.id) && this.state.comments[this.state.openedPostObj.id].map((comment, index) => {
                      return (
                        <div key={index} className="row" style={{ paddingTop: '12px' }}>
                          <Typography component="p" style={{ fontWeight: 'bold' }}>
                            {this.state.user}:
                          </Typography>
                          <Typography component="p" style={{ marginLeft: '6px', fontWeight: 'bold' }}>
                            {comment}
                          </Typography>
                        </div>
                      )
                    })}
                  </div>
                  <div>
                    <div className="row">
                      <IconButton aria-label="Add to favorites" onClick={this.likeClickHandler.bind(this, this.state.openedPostObj.id)}>
                        {this.state.isLiked && <FavoriteIconFill style={{ color: '#F44336' }} />}
                        {!this.state.isLiked && <FavoriteIconBorder />}
                      </IconButton>
                      <Typography component="p" style={{ fontWeight: 'bold' }}>
                        {likeCount} likes
                      </Typography>
                    </div>
                    <div className="row">
                      <FormControl style={{ flexGrow: 1 }}>
                        <InputLabel htmlFor="comment">Add a comment</InputLabel>
                        <Input id="comment" value={this.state.currentComment} onChange={this.commentChangeHandler} />
                      </FormControl>
                      <FormControl>
                        <Button onClick={this.addCommentHandler.bind(this, this.state.openedPostObj.id)}
                          variant="contained" color="primary">
                          ADD
                        </Button>
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