import { hidenHUDLoading, showHUDLoading } from '../Libraries/UniversalLoader';
import AppUtilities from '../Utilities/AppUtilities';
import { ERROR_MESSAGES, NETWORK_CONSTANTS } from './../Utilities/AppConstants';


export default class NetworkManager {
  appUtilities = new AppUtilities()

  loadData(successBlock, pathurl, errorBlock, baseurl) {
    showHUDLoading();
    const url = (baseurl) ? baseurl + pathurl : NETWORK_CONSTANTS.BASE_URL + pathurl
    console.log('hitting get url = ' + url);
    fetch(url,{method: NETWORK_CONSTANTS.METHODS.GET, headers: NETWORK_CONSTANTS.DEFAULT_HEADERS})
      .then((response) => response.json())
      .then((responseJson) => {
        hidenHUDLoading();
        console.log('success response for get url = ' + url + ' and response = ' + JSON.stringify(responseJson));
        this.handleResponse(responseJson, successBlock);
      })
      .catch((error) =>{
        hidenHUDLoading();
        console.log('error response for get url = ' + url + ' and response = ' + error);
        if (errorBlock) {
          errorBlock(error)
        } else {
          this.appUtilities.showAlert(ERROR_MESSAGES.NETWORK_CONNECTION_ERROR)
        }
      });
  }

  loadPostData(successBlock, pathurl, body, errorBlock, baseurl) {
    showHUDLoading();
    const url = (baseurl) ? baseurl + pathurl : NETWORK_CONSTANTS.BASE_URL + pathurl
    console.log('hitting get url = ' + url);
    fetch(url,{method: NETWORK_CONSTANTS.METHODS.POST, headers: NETWORK_CONSTANTS.DEFAULT_HEADERS, body: body})
      .then((response) => response.json())
      .then((responseJson) => {
        hidenHUDLoading();
        console.log('success response for get url = ' + url + ' and response = ' + JSON.stringify(responseJson));
        this.handleResponse(responseJson, successBlock)
      })
      .catch((error) =>{
        hidenHUDLoading();
        console.log('error response for get url = ' + url + ' and response = ' + error);
        if(errorBlock) {
          errorBlock(error)
        } else {
          this.appUtilities.showAlert(ERROR_MESSAGES.NETWORK_CONNECTION_ERROR)
        }
      });
  }


  sendData(body, successBlock, pathurl, errorBlock, baseurl) {
    showHUDLoading();
    const url = (baseurl) ? baseurl + pathurl : NETWORK_CONSTANTS.BASE_URL + pathurl
    console.log('hitting post url = ' + url + ' with body = ' + body);
    fetch(url,{method: NETWORK_CONSTANTS.METHODS.POST, headers: NETWORK_CONSTANTS.DEFAULT_HEADERS, body: body})
      .then((response) => response.json())
      .then((responseJson) => {
        hidenHUDLoading();
        console.log('success response for post url = ' + url + ' with body = ' + body + ' and response = ' + JSON.stringify(responseJson));
        this.handleResponse(responseJson, successBlock)
      })
      .catch((error) =>{
        hidenHUDLoading();
        console.log('error response for post url = ' + url + ' with body = ' + body + ' and response = ' + error);
        if (errorBlock) {
          errorBlock(error)
        } else {
          this.appUtilities.showAlert(ERROR_MESSAGES.NETWORK_CONNECTION_ERROR)
        }
        
      });
  }

  silentAPICall(body, pathurl, baseurl) {
    
    const url = (baseurl) ? baseurl + pathurl : NETWORK_CONSTANTS.BASE_URL + pathurl
    console.log('hitting post url = ' + url + ' with body = ' + body);
    fetch(url,{method: NETWORK_CONSTANTS.METHODS.POST, headers: NETWORK_CONSTANTS.DEFAULT_HEADERS, body: body})
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('success response for post url = ' + url + ' with body = ' + body + ' and response = ' + JSON.stringify(responseJson));
        this.handleResponse(responseJson)
      })
      .catch((error) =>{
        console.log('error response for post url = ' + url + ' with body = ' + body + ' and response = ' + error);
        
      });
  }

  handleResponse(responseJson, successBlock) {
    if (responseJson.errorcode == 2) {
      // Perform logout action as the employee is deactivated
      this.appUtilities.showAlert(responseJson.Errormessage, 'Ok', () => {this.appUtilities.logout()})
    } else if (successBlock && successBlock != undefined) {
      successBlock(responseJson)
    }
  }
}
