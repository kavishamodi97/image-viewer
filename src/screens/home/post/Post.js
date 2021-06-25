import React, { Component } from 'react';
import './Post.css';
import instaLogo from "../../../assets/insta.png";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Divider from "@material-ui/core/Divider";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    media: {
        height: 0,
        paddingTop: '60%',
        cursor: 'pointer'
    },
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    }
})

const cardStyle = {
    width: "60%",
    height: "100%",
};

const postStyle = {
    hashtagStyle: {
        display: "inline",
        paddingRight: "2px",
        fontSize: "13px",
        color: "#5bbce4",
    },
    captionStyle: {
        fontSize: "14px",
        fontWeight: "bold",
    },
    redLikeIconStyle: {
        color: "red"
    }
};

const commentStyle = {
    commentButtonStyle: {
        marginTop: "25px",
        marginLeft: "10px"
    },
};

class Post extends Component {
    constructor() {
        super()
        this.state = {
            isLiked: false,
            likes: Math.floor(Math.random() * 10) + 1,
            comments: [],
            comment: ""
        }
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
            comments: this.state.comments.concat(this.state.comment)
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

    render() {
        const { classes, detail, description } = this.props;
        let caption = '';

        //Get Caption For Each Post
        description.forEach(post => {
            if (detail.id === post.id) {
                caption = post.caption;
            }
        });

        return (
            <div>
                <Card style={{ cardStyle }} variant="outlined">
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" style={{ cursor: 'pointer' }} src={instaLogo}></Avatar>
                        }
                        title={detail.username}
                        subheader={this.convertTimeStampIntoDateFormat(detail.timestamp)}
                    />
                    <CardMedia
                        className={classes.media}
                        image={detail.media_url}
                        alt={detail.username}
                    />
                    <br />
                    <Divider style={{ backgroundColor: "#c0c0c0" }} />
                    <CardContent>
                        <Typography variant="h5" style={postStyle.captionStyle}>
                            {caption}
                        </Typography>
                        <Typography display="inline" variant="caption" style={postStyle.hashtagStyle}>#Coding #Skills #Passion</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="Add to favorites" onClick={this.likeClickHandler}>
                            {this.state.isLiked && <FavoriteIconFill style={postStyle.redLikeIconStyle} />}
                            {!this.state.isLiked && <FavoriteIconBorder />}
                        </IconButton>
                        <Typography>
                            {this.state.likes} likes
                        </Typography>
                    </CardActions>
                    <CardContent>
                        {this.state.comments.map((c, index) => (
                            <div key={index} className={classes.row}>
                                <Typography component="p" style={{ fontWeight: 'bold' }}>
                                    {detail.username}:
                                </Typography>
                                <Typography component="p" style={{ marginLeft: "3px" }}>
                                    {c}
                                </Typography>
                            </div>
                        ))}
                        <div className={classes.formControl}>
                            <FormControl style={{ flexGrow: 1 }}>
                                <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                <Input id="comment" value={this.state.comment} onChange={this.commentChangeHandler} />
                            </FormControl>
                            <FormControl className="commentAdd">
                                <Button className="addBtn" variant="contained" color="primary" style={commentStyle.commentButtonStyle} onClick={this.commentAddHandler}>ADD</Button>
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Post);