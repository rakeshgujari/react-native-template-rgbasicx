/*
  Custom Input Component for forms
  - secureTextEntry : add this prop for passwords
  - isMandatory : add this prop for mandatory aestrik
  - maxLength : add this prop for setting text limit
  - placeholder: add placeholder
  @Rakesh Gujari
*/

import React , { Component } from 'react';
import { Item, Input, Label, Text, View } from 'native-base';
import { COLORS } from '../../../Utilities/AppConstants';

export default class FormInput extends Component{
  componentWillReceiveProps() {
    this.forceUpdate()
  }

  render(){
    const { hasError, input, error, placeholder, secureTextEntry, margin, maxLength, isMandatory, isActive} = this.props;
    console.log('FormInput isFocussed = ' + isActive);
    
    return(
      <View style={{flexDirection: 'row'}}>
      <Item error= {hasError} style={{margin: margin ? margin: 10, marginLeft: 10,flex: 1, flexDirection: 'row'}} floatingLabel>
        <Label style={{flex: 1, flexDirection: 'row', alignSelf: 'stretch'}}><Text style={{flex:1, color: (isActive || input.value.length>0) ? 'black' : COLORS.PLACEHOLDER_COLOR, fontWeight: (isActive || input.value.length>0) ? '500' : null}}>{(placeholder ? ((isActive || input.value.length>0) ? placeholder : 'Enter '+placeholder) : '')}</Text> {isMandatory?<Text style={{color: 'red'}}>*</Text>:<Text/>}</Label>
        <Input {...input} value={input.value} secureTextEntry={secureTextEntry ? secureTextEntry : false} maxLength={maxLength}/>
      </Item>
      {(hasError) ? <Text style={{position: 'absolute', right : 10, bottom: (input.value.length > 0 || isActive) ? 51 : 20, color: 'red'}}>{error}</Text> : null}
      </View>
    )
  }
}
