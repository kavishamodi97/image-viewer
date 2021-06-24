import React, { Component } from "react";
import './Profile.css';
import Header from '../../common/header/Header';
import Avatar from '@material-ui/core/Avatar';
import instaLogo from "../../assets/insta.png";
import Typography from "@material-ui/core/Typography";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(),
    width: 250,
  },
  buttonControl: {
    margin: theme.spacing(),
    pointer: "cursor",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #c0c0c0',
    borderRadius: '4px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  gridListPost: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    width: '100%'
  },
});

const profileStyle = {
  avatarImageStyle: {
    width: 120,
    height: 120,
    cursor: "pointer"
  },
  profileInfoStyle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  editIconStyle: {
    display: "flex",
    flexDirection: "row",
    marginTop: 3
  },
  editTextStyle: {
    fontSize: "20px",
    fontWeight: "bold",
    paddingTop: "15px"
  },
  gridListTileStyle: {
    width: "350px",
    margin: "20px",
  }
}

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      postCount: 20,
      follows: 100,
      followedBy: 120,
      modalOpen: false,
      fullname: "",
      fullnameRequired: "dispNone",
      postDescription: [], //1st endpoint info
      postDetails: [], //2nd endpoint info
      likeCount: Math.floor(Math.random() * 50),
    }
  }

  openModelHandler = () => {
    this.setState({ modalOpen: true })
  }

  closeModelHandler = () => {
    this.setState({ modalOpen: false })
  }

  inputFullNameChangeHandler = (event) => {
    this.setState({ fullname: event.target.value })
  }

  updateClickHandler = (event) => {
    this.state.fullname === "" ? this.setState({ fullnameRequired: "dispBlock" }) : this.setState({ fullnameRequired: "dispNone" });
  }

  //Fetching Post Details From Instagram API Using AJAX Calls
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

  //Get Post Caption When Post Id Match
  getEachCaptionsFromPost = (id) => {
    return this.state.postDescription.map((post) => {
      if (post.id === id) {
        console.log("get each caption from post" + post.caption);
        return post.caption;
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          title="Image Viewer"
          history={this.props.history}
          showProfilePage="profile"
        />
        <br />
        <div className="profile-container">
          <div className="avatar-left">
            <Avatar style={profileStyle.avatarImageStyle} aria-label="recipe" src={instaLogo} />
          </div>
          <div className="profile-info">
            <div>
              <Typography style={profileStyle.profileInfoStyle}>
                Set Username Here
              </Typography>
            </div>
            <div className="info-section">
              <Typography>
                <span className="profile-text">Posts: {this.state.postCount}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="profile-text">Follows: {this.state.follows}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="profile-text">Followed By: {this.state.followedBy}</span>
              </Typography>
            </div>
            <br />
            <div className="edit-section">
              <div>
                <Typography style={profileStyle.editTextStyle}>
                  upgrad
                </Typography>
              </div>
              <div className="edit-button">
                <Fab style={profileStyle.editIconStyle} color="secondary" aria-label="edit" onClick={this.openModelHandler}>
                  <EditIcon />
                </Fab>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={this.state.modalOpen}
                  onClose={this.closeModelHandler}
                >
                  <div className={classes.paper}>
                    <Typography variant="headline" component="h2">
                      Edit
                    </Typography>
                    <br />
                    <FormControl className={classes.formControl} required>
                      <InputLabel htmlFor="fullname">Full Name</InputLabel>
                      <Input
                        id="fullname"
                        type="text"
                        fullname={this.state.fullname}
                        onChange={this.inputFullNameChangeHandler}
                      />
                      <FormHelperText className={this.state.fullnameRequired}>
                        <span className="red">required</span>
                      </FormHelperText>
                    </FormControl>
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(event) => this.updateClickHandler()}
                    >
                      UPDATE
                    </Button>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Profile);
