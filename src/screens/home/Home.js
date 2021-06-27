import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import Post from '../home/post/Post';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
    marginLeft: '10%'
  },
  gridList: {
    width: 1100,
    height: 'auto',
    overflowY: 'auto'
  },
});

const gridListTileStyle = {
  width: "490px",
  margin: "10px",
};

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postDescription: [], //1st Endpoint 
      postDetails: [], //2nd Endpoint
      postDescriptionCopy: [],
      postDetailsCopy: []
    };
  }

  //Fetch Instagram Data Using AJAX Calls
  UNSAFE_componentWillMount() {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        let apiResponseData = JSON.parse(this.responseText).data;
        that.setState({
          postDescription: apiResponseData,
          postDescriptionCopy: apiResponseData
        });
        that.getPostDetails();
      }
    });
    xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token=" + sessionStorage.getItem('access-token'));
    xhr.send(data)
  }

  //Get List Of Ids From API
  getPostDetails = () => {
    return this.state.postDescription.map(post => {
      return this.getPostDetailsById(post.id)
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
        let apiResponseData = JSON.parse(this.responseText);
        that.setState({
          postDetails: that.state.postDetails.concat(apiResponseData),
          postDetailsCopy: that.state.postDetailsCopy.concat(apiResponseData)
        });
      }
    });
    xhr.open("GET", "https://graph.instagram.com/" + id + "?fields=id,media_type,media_url,username,timestamp&access_token=" + sessionStorage.getItem('access-token'))
    xhr.send(data)
  }

  //Filter Post By Post Caption
  searchTextHandler = (searchString) => {
    let posts = this.state.postDescriptionCopy;
    let filteredPost = []
    posts = posts.filter((post) => {
      let caption = post.caption.toLowerCase();
      let enteredStr = searchString.toLowerCase();
      if (caption.includes(enteredStr)) {
        filteredPost.push(post.id)
        return true;
      } else {
        return false;
      }
    })
    this.setState({
      postDescription: posts
    })
    console.log("selected posts " + filteredPost)
    console.log("postDetails " + this.state.postDetails)
    let postInfo = this.state.postDetailsCopy
    postInfo = postInfo.filter(item => filteredPost.includes(item.id));
    this.setState({
      postDetails: postInfo
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          history={this.props.history}
          title="Image Viewer"
          showHomePage="home"
          searchHandler={this.searchTextHandler}
        ></Header>
        <div className={classes.gridContainer}>
          <GridList cellHeight={'auto'} cols={2} className={classes.gridList}>
            {this.state.postDetails.map((item, index) => (
              <GridListTile key={item.id} style={gridListTileStyle}>
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