import React from 'react';
import http from '../../api/http';
import TextAreaForm from '../TextAreaForm/TextAreaForm';

export default class editApplication extends React.Component {
  state = {
    user: [],
    showPopup: false
  }
    componentDidMount() {
      http.get(`/api/getApplication/${this.props.match.params.id}`)
      .then(res => {
        const user = res.data.data;
        console.log('==users==')
        console.log(user)
        this.setState({ user });
      })
    }

    render() {
      return (
        <div className="ui segment left aligned editApp ">             
                         { this.state.user.map(user => 
                            <div key={user.id}>
                              {/* <td className="left aligned"><img className="ui avatar image" src={user.avatar} /></td>
                              <td>{user.name}</td>
                              <td>{user.age}</td>
                              <td>{user.steamid}</td> 
                              <td>{user.discord}</td> 
                              <td>{user.whitelist_status}</td> 
                              <td>{user.whitelist_comment}</td> 
                              <td><Link to={`/editApplication/${user.id}`}>Edytuj</Link></td>  */}
                              <div className="ui segment grid">
                                <div className="five wide column">
                                  <img className="ui medium rounded image " src={user.avatar}/>
                                </div>
                                <div className="nine wide column">
                                  <h1 className="ui header">
                                    {user.name}
                                    <div className="sub header">{user.age} lat</div>  
                                  </h1>
                                  <div className="ui list">
                                    <div className="item"><i className="steam icon"></i> {user.steamid}</div>
                                    <div className="item"><i className="discord icon"></i> {user.discord}</div>
                                  </div>
                                  <h3 class="ui header">Przegląd podania</h3>
                                  <form className="whitelistForm form ui" action="/api/editApplication" method="POST">
                                    <TextAreaForm label="Komentarz" name="comment"  />   
                                    <div className="ui buttons">
                                      <button className="ui button">Odrzuć</button>
                                      <div className="or"></div>
                                      <button className="ui positive button">Zaakceptuj</button>
                                    </div>
                                  </form>
                                </div>
                                </div>
                              <div className="ui segment">
                                <h1 className="ui header">Postać</h1>                                
                                <div className="ui list">
                                    <div className="item"><i className="angle right icon"></i> {user.charName}</div>
                                    <div className="item"><i className="angle right icon"></i> {user.charBirthday}</div>
                                  </div>
                                <p>{user.history}</p>
                              </div>
                            
                            </div>
                        )} 
 
        </div>
        
      )
    }
  }