import React , { Component } from 'react';
import { View, Image } from 'react-native';
import {  Button, Text } from 'native-base';
import { Field,reduxForm } from 'redux-form';
import FormInput from './Elements/FormInput.js';
import AppValidations from './../../Utilities/AppValidations.js';
import {COLORS} from '../../Utilities/AppConstants.js';


const validate = values => {
  const error= {};
  error.email= '';
  error.password= '';
  var email = values.email;
  var password = values.password;
  if(values.email === undefined){
    email = '';
  }
  if(values.password === undefined){
    password = '';
  }
  var validationObj = new AppValidations();
  error.email = validationObj.validateEmail(email)
  if(password.length > 15){
    error.password= 'max 15 characters';
  }
  return error;
};


class LoginForm extends Component {
  constructor(props){
    super(props);
  }

  renderInput({ input, label, type, meta: { touched, error, warning, active } }){
    var hasError= false;
    if(touched && error !== undefined){
      hasError= true;
    }
    return(
        <FormInput hasError={hasError} error={error} input={input} placeholder={"Username"} isActive={active}/>
    )
  }

  renderPWInput({ input, label, type, meta: { touched, error, warning, active } }){
    var hasError= false;
    if(error !== undefined){
      hasError= true;
    }
    return(
      <FormInput hasError={hasError} error={error} input={input} placeholder={"Password"} secureTextEntry isActive={active} maxLength={15}/>
    )
  }

  render(){
     const { handleSubmit, pristine, reset, submitting, invalid } = this.props;

    return (
        <View style={{flex: 1, alignItems: 'center', marginBottom: 50}}>
        <View style={{flex: 0.6, alignSelf: 'stretch', justifyContent: 'center'}}>
        <Image source={require('../../Images/app_logo.jpg')} style={{resizeMode: 'contain', height: 130, width: '100%'}}/>
        </View>
          <Field name="email" component={this.renderInput} />
          <Field name="password" component={this.renderPWInput} />
          <Button block primary  onPress= {handleSubmit} disabled={submitting} style={{marginTop: 16,alignSelf: 'center',backgroundColor: '#FFFFFF', paddingLeft: 50, paddingRight: 50}}>
            <Text style={{color: COLORS.DEFAULT_BUTTON_COLOR}}>LOG IN</Text>
          </Button>
        </View>
    )
  }
}

export default reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm)
