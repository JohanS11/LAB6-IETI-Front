import React from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Login.css'
import { TodoApp } from './TodoApp';
import Drawer from './Drawer';
import { Redirect, withRouter} from 'react-router-dom';

export class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {email:"", password:"",username:"",confirmPassword:""};
    }

    
    handleChangeEmail = (e) => {
        this.setState({
            email : e.target.value
        });
    }

    handleChangePasswd = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    handleConfirm = (e) => {
        this.setState({
            confirmPassword : e.target.value
        })
    }

    handleChangeUserName = (e) => {
        this.setState({
            username : e.target.value
        })
    }

    handleSend = () =>{
        if(this.state.password !== this.state.confirmPassword){
            alert("Passwords don't match")
        } else {
            fetch("http://backend.eastus.azurecontainer.io:8080",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({name:this.state.username,email:this.state.email,password:this.state.password,id:" "})
        }).then(resp=>resp.text()).then((data)=>{
            console.log("DATA SENT");
            console.log(data);
            localStorage.setItem("IsLoggedIn",true);
            const users = JSON.parse(localStorage.getItem("users"));
            users.push({name:this.state.username,email:this.state.email,password:this.state.password});
            console.log("NEW USERS");
            console.log(localStorage.getItem("users"));

            localStorage.setItem("users",JSON.stringify(users));
            localStorage.setItem("IsLoggedIn",true);
            localStorage.setItem("username",this.state.username);
            localStorage.setItem("email",this.state.email);
            this.props.history.push("/todo");
        }).catch(e=>alert("Unable to sign up this user"));

          
        }
    }
    render(){
        
        if(localStorage.getItem("users")==null){
            localStorage.setItem("users",JSON.stringify([{"username":"chan","email":"chan@mail.com","password":"chan123"}]));
        }
        return(
            <React.Fragment>
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <Avatar className="avatar">
                            <LockIcon />
                        </Avatar>
                        <Typography variant="h2">Sign Up</Typography>
                    
                        <div>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="username">Full name</InputLabel>
                                <Input
                                    name="name"
                                    id = "name"
                                    onChange={this.handleChangeUserName}
                                    autoComplete="username"
                                    required
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input 
                                required
                                id="email" 
                                name="email" 
                                autoComplete="email" 
                                onChange={this.handleChangeEmail}
                                autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    required
                                    name="password"
                                    id="password"
                                    type="password"
                                    onChange={this.handleChangePasswd}
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="cpassword">Confirm Password</InputLabel>
                                <Input
                                    required
                                    name="cpassword"
                                    id="cpassword"
                                    type="password"
                                    onChange ={this.handleConfirm}
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            
                            <Button onClick = {() => this.handleSend()}
                                type = "submit"
                                fullWidth
                                variant="raised"
                                color="primary">
                                Sign Up
                            </Button>
                        
                        </div>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

export default withRouter(SignUp);