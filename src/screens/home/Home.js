import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Post from '../home/post/Post';
import './Home.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90
  },
  gridList: {
    width: 1100,
    height: 'auto',
    overflowY: 'auto'
  }
});

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postDescription: [], //1st Endpoint 
      postDetails: []  //2nd Endpoint
    };
  }

  componentWillMount() {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        that.setState({ postDescription: JSON.parse(this.responseText).data });
        that.getPostDetails();
      }
    });
    xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token=" + sessionStorage.getItem('access-token'));
    xhr.send(data)
  }

  getPostDetails = () => {
    this.state.postDescription.map(post => {
      this.getPostDetailsById(post.id)
    });
  }

  searchAddHandler = (searchFor) => {
    console.log("Search string :" + this.state.postDescription)
    let posts = this.state.postDescription;
    posts = posts.filter((post) => {
      let caption = post.caption.toLowerCase();
      let enteredStr = searchFor.toLowerCase();
      return caption.includes(enteredStr);
    })
    this.setState({
      postDescription: posts
    });
  }

  getPostDetailsById = (id) => {
    let that = this
    let xhr = new XMLHttpRequest();
    let data = null
    console.log("post id here :" + id)
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        that.setState({ postDetails: that.state.postDetails.concat(JSON.parse(this.responseText)) });
      }
    });
    xhr.open("GET", "https://graph.instagram.com/" + id + "?fields=id,media_type,media_url,username,timestamp&access_token=" + sessionStorage.getItem('access-token'))
    xhr.send(data)
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          history={this.props.history}
          title="Image Viewer"
          showHomePage="home"
        ></Header>
        <div className={classes.gridContainer}>
          <GridList className={classes.gridList} cellHeight={'auto'} cols={2}>
            {this.state.postDetails.map((item, index) => (
              <GridListTile key={item.id}>
                <Post detail={item} description={this.state.postDescription} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home);