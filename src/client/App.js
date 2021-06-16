import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './app.css';
import WhitelistForm from './WhitelistForm/WhitelistForm';
import AdminList from './AdminList/AdminList';
import UserProfile from './UserProfile/UserProfile';
import DiscordSync from './DiscordSync/DiscordSync';
import EditApplication from './EditApplication/EditApplication';
import HeaderNav from './HeaderNav/HeaderNav';
import 'semantic-ui-css/semantic.min.css';

export default class App extends Component {
  state = {
    session: {
      isLogged: false,
    }
  };
  //  .then(user => this.setState({ username: user.username }));  
  componentDidMount() {
    fetch('/api/getSession')
      .then(res => res.json())
      .then(session => this.setState({
        session: {
          isLogged: session.isLogged,
          name: session.name,
          id: session.id,
          avatar: session.avatar,
          discriminator: session.discriminator,
        }

      }));
  }

  render() {
    const { session } = this.state;
    let comContent = <DiscordSync />;
    let dsc = 'none';
    if (session.isLogged) {
      dsc = session.name + '#' + session.discriminator;
      console.log('dsc: ' + dsc)
      comContent = <UserProfile title="Formularz zgłoszeniowy" name={session.name} avatar={session.avatar} id={session.id} />;
    }
    const App = () => (
      <div>
        <div className="ui container">
          <div>
            <HeaderNav />
            <Switch>
              <Route exact path='/'>
                {comContent}
              </Route>
              <Route path='/whitelist'>
                <WhitelistForm discord={dsc} name={session.name} avatar={session.avatar} id={session.id} />
              </Route>
              <Route path="/adminpanel" component={AdminList}/>
              <Route path="/editApplication/:id" component={EditApplication}/> 
            </Switch>

          </div>
        </div>
      </div>
    )
    return (
      <Switch>
        <App />
      </Switch>
    );

  }
}
