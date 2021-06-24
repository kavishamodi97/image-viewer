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

  updateClickHandler = () => {
    this.state.fullname === "" ? this.setState({ fullnameRequired: "dispBlock" }) : this.setState({ fullnameRequired: "dispNone" });
    if (this.state.fullname === "") return;
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
                  Set full name Here
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
                      onClick={this.updateClickHandler}
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
