import React, {Component} from 'react';

export class UserList extends React.Component {

    constructor(props) {
        super(props);
        
    }
    render(){

        console.log("GOLAAAAA")
        console.log(this.props.usersList);
        const lista = this.props.usersList.map((user,i) => 
            <li> username : {user.user.name} email : {user.user.email} password : {user.user.password} id : {user.user.id} </li>
        );
        return(
            <div>
                
                <center>
                    <h1>
                        Data Retrieved from Backend
                    </h1>
                    {lista}
                </center>
            </div>
        );

    }
        

}

export default UserList;