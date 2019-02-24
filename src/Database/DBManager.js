'use strict';

import Realm from 'realm';
import Entities from "./Entities.js";
const currentVersion = Realm.schemaVersion(Realm.defaultPath);

class DBManager {
    static realm
    constructor(){
        this.schemas = Entities;
        this.realm = this.realm ? this.realm : new Realm({
            schema: Entities,
            schemaVersion: 1
        })  
    }

    // Wrapper to use use Realm's native .create() method
    create(objectType, properties) {
        this.realm.write(() => {
            this.realm.create(objectType, properties);
        })
    }

    // If you want to do multiple "Realm things" in one transaction, just call this
    //   method and it'll run them all in the single write transaction.
    // This was a better approach to updating a realm object vs .updateObject() below
    write(transactions) {
        this.realm.write(transactions)
    }

    // Update a Realm object
    updateProp(objectType, properties) {
        this.realm.write(() => {
            this.realm.create(objectType, properties, true);
        })
    }

    // Update a Realm object child that is itself, another Realm object.
    // I actually don't use this anymore, believe I solved the problem another way
    // Update -- I did, I use .write(() => { UpdateObjectHere })  instead
    updateObject(objectType, objId, objectName, realmObjProps) {
        this.realm.write(() => {
            let retrievedObject = this.realm.create(objectType, {id: objId}, true);
            retrievedObject[objectName] = realmObjProps
            this.realm.create(objectType, retrievedObject, true);
        })
    }

    // Updates a Realm List, creating the "objectType" if it doesn't already exist.
    updateList(objectType, objId, listName, realmListProps) {
        this.realm.write(() => {
            let obj = this.realm.objects(objectType).filtered(`id == ${objId}`);
            if(!obj.length) {
                console.log("Creating...");
                let newRealmObject = this.construct(objectType, {id: objId})
                this.realm.create(objectType, newRealmObject)
            }
            // How to access a specific object in Realm, "create" one with the id you wish to update
            //   with the update flag set to true
            let realmObj = this.realm.create(objectType, {id: objId}, true); // Not updating, we're getting here
            let realmList = realmObj[listName] // <-  Now we have our list
            let filteredProps = realmList.filtered(`id == '${realmListProps.id}'`);
            !filteredProps.length && realmList.push(realmListProps)
        })
    }

    // Used internally to get Realm object results before using in another transaction
    query(objectType, query) {
        if(!query) { return this.realm.objects(objectType) }
        return this.realm.objects(objectType).filtered(query);
    }

    // First iteration, queryToArray and queryToList do a better job
    queryList(realmObj, query){
        return realmObj.filtered(query);
    }

    // Get the first object based on the query (should use the id of the object)
    // I should create a failsafe that mentions this can't be used without "id" in the query
    getOne(objectType, query) {
        if(!query) { return this.realm.objects(objectType)[0] }
        return this.realm.objects(objectType).filtered(query)[0];
    }

    // Bye bye data
    deleteDB() {
        this.realm.write(() => {
            this.realm.deleteAll();
        })
    }

    delete(tableName){
      let tableRows = this.realm.objects(tableName)
      this.realm.write(() => {
          this.realm.delete(tableRows);
      })
    }

    // Delete's a Realm object and all instances of it's child Realm objects.
    // ie, Development has a Floorplan Realm object, without this, when Development
    //   was deleted, Floorplan would still exist.
    delete(objectType, query) {
        let listChildren = this.deconstruct(objectType, query)
        let results = this.query(objectType, query);
        this.realm.write(() => {
            listChildren.forEach((child) => { this.realm.delete(child) })
            this.realm.delete(results);
        })
    }

    // Gets all of the realm object's children for one reason or another.
    deconstruct(objectType, query) {
        let results = this.queryToArray(objectType, query)
        let children = [];
        this.schemas.forEach((schemaConstruct) => {
            if(schemaConstruct.schema.name !== objectType) { return; }
            let props = schemaConstruct.schema.properties;
            for(let prop in props) {
                if(typeof props[prop] === 'object' && props[prop].type === 'list') {
                    let listType = props[prop].objectType
                    children = results.map((obj) =>
                        this.query(listType, `parentId == ${obj.id}`)
                    )
                }
            }
        })
        return children;
    }

    // Used to create a Realm object and its default propteries, including lists
    construct(objectType, properties) {
        let newRealmObject = properties;
        let foundSchema = this.schemas.filter((schemaConstruct) =>
            schemaConstruct.schema.name === objectType
        );
        let props = foundSchema[0].schema.properties
        Object.keys(props).forEach((key) => {
            if(typeof props[key] === 'object' && props[key].type === 'list') {
                !newRealmObject[key] && (newRealmObject[key] = []);
            }
        })
        return newRealmObject;
    }

    // Convert the realm query into a JS array
    queryToArray(objectType, query) {
        let queryResults = this.query(objectType, query);
        let objectArr = [];
        for(let obj in queryResults) {
            objectArr.push(queryResults[obj])
        }
        return objectArr;
    }

    // Convert the list of a Realm object into a JS array
    listToArray(object, listName){
        let listArray = [];
        for(let arrItem in object[listName]) {
            listArray.push(object[listName][arrItem])
        }
        return listArray;
    }

    closeDB(){
      this.realm.close()
    }

}

export default DBManager
