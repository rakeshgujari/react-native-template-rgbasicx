/**
 * Template
 *
 *
 * @Rakesh Gujari
 */

import React, {Component} from 'react';
import {StackActions, NavigationActions } from 'react-navigation';
import LoginForm from '../../Components/Forms/LoginForm.js';
import { Container, Content, Button, Text } from 'native-base';
import {NETWORK_CONSTANTS, LOGGED_IN_USER_DETAILS, COLORS} from '../../Utilities/AppConstants'
import AppUtilities from '../../Utilities/AppUtilities'
import NetworkManager from '../../Network/NetworkManager.js'
import DBManager from '../../Database/DBManager.js';
import {Keyboard} from 'react-native'

  export default class Login extends Component {
    networkManager = new NetworkManager()
    appUtilities = new AppUtilities()
    dataBaseManager = new DBManager()

    render() {
      return (
        <Container>
        <Content padder bounces={false} contentContainerStyle={{ flex: 1, paddingTop: 25}}>
        <LoginForm onSubmit={this.loginFormValidated} initialValues={{ email: (__DEV__) ? 'test@website.com' : '', password: (__DEV__) ? 'test' : '' }}/>
        
        </Content>
        </Container>
      );
    }

   /**
    * Dev defined Funcs
    */
    loginFormValidated = (values) => {
      Keyboard.dismiss();
     const body = JSON.stringify({
       email: values.email,
       password: values.password
     })
     
    }

    navigateToHomeScreen() {
      
    }

    
}
