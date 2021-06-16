import React,{Component} from 'react';
import './Login.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

class Login extends Component {

  constructor(){
    super();
    this.state={
      username:"",
      usernameRequired: "dispNone",
      loginPassword:"",
      loginPasswordRequired: "dispNone",
    }
  }

   inputUsernameChangeHandler=(event) => {
   this.setState({username:event.target.value});
  }

  inputPasswordChangeHandler=(event)=>{
    this.setState({loginPassword:event.target.value});
  }

  render(){
      return(
        <div>
          <Header title="Image Viewer"/>
          <div>
          <Card className="login-card">
            <CardContent>
              <Typography variant="headline" component="h2">
              LOGIN
              </Typography><br/>
              <FormControl required>
               <InputLabel htmlFor="username">Username</InputLabel>
               <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler}></Input>
               <FormHelperText  className={this.state.usernameRequired}>
               <span className="red">required</span>    
               </FormHelperText>
              </FormControl><br /><br />
              <FormControl required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" loginPassword={this.state.loginPassword} onChange={this.inputPasswordChangeHandler}></Input>
                <FormHelperText className={this.state.loginPasswordRequired}>
               <span className="red">required</span>    
               </FormHelperText>
              </FormControl><br /><br />
              <Button variant="contained" color="primary">LOGIN</Button>
            </CardContent>
          </Card>
          </div>
          </div>
      )
  }
}

export default Login;