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

class Login extends Component {
  render(){
      return(
        <div>
          <Header title="Image Viewer"/>
          <div className="card-container">
          <Card className="login-card">
            <CardContent>
              <Typography variant="headline" component="h2">
              LOGIN
              </Typography><br/>
              <FormControl>
               <InputLabel htmlFor="username">Username</InputLabel>
               <Input id="username" type="text"></Input>
              </FormControl><br /><br />
              <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password"></Input>
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