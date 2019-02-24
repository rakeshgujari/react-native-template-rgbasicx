'use strict';

/*
*@RakeshGujari
*
* Create DB table class here and define properties.
* then add the class obj in export statement
*/

class User {}
User.schema = {
  name: "User",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    email: 'string',
    password: 'string'
  }
}

export default [User]
