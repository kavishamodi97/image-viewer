import React, { Component } from "react";
import './Profile.css';
import Header from '../../common/header/Header';
import Avatar from '@material-ui/core/Avatar';
import instaLogo from "../../assets/insta.png";
import Typography from "@material-ui/core/Typography";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

const profileStyle = {
  avatarImageStyle: {
    width: 120,
    height: 120,
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
  }
}

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      postCount: 6,
      follows: 4,
      followedBy: 6
    }
  }

  render() {
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
                <span className="profile-text">Follows: {this.state.follows}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="profile-text">Followed By: {this.state.followedBy}</span>
              </Typography>
            </div>
            <br />
            <div className="edit-section">
              <div>
                <Typography style={profileStyle.editTextStyle}>
                  Set full name Here
                </Typography>
              </div>
              <div className="edit-button">
                <Fab style={profileStyle.editIconStyle} color="secondary" aria-label="edit">
                  <EditIcon />
                </Fab>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
