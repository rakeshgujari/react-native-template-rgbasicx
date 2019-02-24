/**
 * 
 * @Rakesh Gujari
 * 
 *  */

import React, {Component} from 'react';
import {Container, Content, Spinner } from 'native-base';
import {WebView, View} from 'react-native';
import BackHeader from './BackHeader';
import { COLORS } from '../Utilities/AppConstants';
import AppUtilities from '../Utilities/AppUtilities';

  export default class AppWebview extends Component {
    appUtilities = new AppUtilities();

    constructor(props) {
      super(props);
      this.state = { visible: true };
    }
  
    hideLoader() {
      this.setState({ visible: false });
    }

    render() {
      const {navigation} = this.props
      const screenTitle = navigation.getParam('screenTitle', '');
      var pathUrl = navigation.getParam('url', '')
      if (!pathUrl.includes('https')) {
        pathUrl = pathUrl.replace('http','https')
      }
      console.log('Url = ' + pathUrl);
      const baseUrl = 'https://drive.google.com/viewerng/viewer?embedded=true&url=';
      var url = baseUrl + pathUrl;
      let customJs = 'document.querySelector(\'[role=\"toolbar\"]\').remove()';
      return (
        <Container>
          <BackHeader goBackFunction={this.goBack} title={screenTitle}></BackHeader>
        <Content contentContainerStyle={{ flex: 1 }}>
        <WebView
        onLoad={() => this.hideLoader()}
        source={{uri: url}}
        style={{flex: 1}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={customJs}
        mixedContentMode={'always'}
        onError={(error) => {this.appUtilities.showAlert(JSON.stringify(error))}}
          />
      {this.state.visible && (
          <View style={{top: 0,right: 0,bottom: 0,left: 0,backgroundColor: 'white', position: 'absolute', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{alignSelf: 'center', height: 70, width: 70, justifyContent:'center'}}>
              <Spinner color={COLORS.APP_DEFAULT_COLOR} />
          </View>
      </View>
        )}
        </Content>
      </Container>
          
         
      )
    }

     goBack = () => {
        this.props.navigation.goBack()
    }

  }
