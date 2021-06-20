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

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  gridListMain: {
    transform: "translateZ(0)",
    width: "1500px",
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

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header title="Image Viewer" showHomePage="home"></Header>
        <div className="grid-container">
          <GridList cols={2} cellHeight={900} className={classes.gridListMain}>
            <GridListTile key="post1" style={gridListTileStyle}>
              <Card style={{ cardStyle }} variant="outlined">
                <CardHeader
                  avatar={<Avatar aria-label="recipe" src={instaLogo}></Avatar>}
                  title="modi_kavisha18"
                  subheader="12/12/23 22:33:44"
                ></CardHeader>
                <CardContent>
                  <img src={instaLogo} alt="imag1" className="post-image" />
                  <br />
                  <br />
                  <Divider style={{ backgroundColor: "#c0c0c0" }} />
                  <Typography variant="h5" style={postStyle.captionStyle}>
                    Team of Great People at Upgrad
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
                    <span className="like-post"> 2 likes</span>
                  </div>
                </CardContent>
              </Card>
            </GridListTile>
          </GridList>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
