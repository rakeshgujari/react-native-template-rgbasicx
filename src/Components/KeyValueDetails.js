import React, {Component} from 'react';
import { Body, View, Card, CardItem, Text } from 'native-base';
import {FlatList} from 'react-native';
import { COLORS } from '../Utilities/AppConstants';


export default class KeyValueDetails extends Component {

    render() {
        const {dataArray} = this.props
        return (
                <FlatList
                data={dataArray}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={this._renderItem}
                />
          );
    }

    _renderItem = ({item, index}) => (
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: (item.isHeader ? COLORS.APP_DEFAULT_COLOR : 'white')}}>
            {item.title && (<Text style={{marginTop: 16, marginBottom: 5, fontWeight:'bold', paddingLeft:16, textAlign: (item.isHeader ? 'center' : 'left'), color: (item.isHeader ? 'white' : 'black')}}>{item.title ? item.title : ''}</Text>)}
            {item.details && (<Text style={{flex: 0.3, paddingLeft: 16, marginTop: 5, marginBottom: 8, fontWeight:'100', textAlign: (item.isHeader ? 'center' : 'left'), color: (item.isHeader ? 'white' : 'black')}}>{item.details ? item.details : ''}</Text>)}
            </View>
    );
}