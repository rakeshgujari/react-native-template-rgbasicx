
import Login from '../Screens/Login/Login.js'
import { createStackNavigator, createAppContainer } from "react-navigation";

const Navigator = createStackNavigator({
  Login: { screen: Login }
},{
  initialRouteName: 'Login',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

export default createAppContainer(Navigator);
