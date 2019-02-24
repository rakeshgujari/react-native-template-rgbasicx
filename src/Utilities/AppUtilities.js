/*
  All App Utilities defined here.
  Rakesh Gujari
*/
import {
  Alert
} from 'react-native'
import {ERROR_MESSAGES} from './AppConstants'
import DBManager from '../Database/DBManager';
export default class AppUtilities {
  dbManager = new DBManager()
  
  showAlert(message, positiveButtonText, onPositiveButtonPress, negativeButtonText, onNegativeButtonPress) {
    let buttonArray = []
    buttonArray.push({text: (positiveButtonText) ? positiveButtonText : 'Ok', onPress: () => {(onPositiveButtonPress) ? onPositiveButtonPress() : console.log('On Ok pressed function not available')}})
    if (negativeButtonText) {
      buttonArray.push({text: (negativeButtonText) ? negativeButtonText : 'Cancel', onPress: () => {(onNegativeButtonPress) ? onNegativeButtonPress() : console.log('On Cancel pressed function not available')}})
    }
    Alert.alert(
      'Alert',
      (message) ? message : ERROR_MESSAGES.DEFAULT_MESSAGE,
      buttonArray
    )
  }

}
