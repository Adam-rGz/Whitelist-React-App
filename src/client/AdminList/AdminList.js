import React from 'react';
import http from '../../api/http';
import { Link } from 'react-router-dom';

export default class adminList extends React.Component {
    state = {
      users: []
    }
  
    componentDidMount() {
        http.get(`/api/getApplications`)
        .then(res => {
          const users = res.data.data;
          console.log('==users==')
          console.log(users)
          this.setState({ users });
        })
    }

    render() {
      return (
        <div className="ui segment left aligned ">
            <table className="ui table">
                <thead>
                    <tr><th></th>
                        <th>Imię</th>
                        <th>Wiek</th>
                        <th>SteamID</th>
                        <th>Discord</th>
                        <th>Status</th>
                        <th>Komentarz</th>
                        <th>Akcja</th>
                    </tr></thead>
                <tbody>                
                        { this.state.users.map(user => 
                            <tr key={user.id}>
                                <td className="left aligned"><img className="ui avatar image" src={user.avatar} /></td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.steamid}</td> 
                                <td>{user.discord}</td> 
                                <td>{user.whitelist_status}</td> 
                                <td>{user.whitelist_comment}</td> 
                                <td><Link to={`/editApplication/${user.id}`}>Edytuj</Link></td> 
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
        
      )
    }
  }