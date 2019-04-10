import React, {Component} from 'react';
import {StyleSheet, Text, Dimensions, View, Image} from 'react-native';

const {width} = Dimensions.get("screen");

export default class Post extends Component {

    render(){
        const {foto} = this.props;
        return(
            <View>
                <View style={styles.cabecalho}>
                    <Image source={{uri: foto.urlPerfil}} style={styles.fotoPerfil} />
                    <Text style={{fontSize: 14}}>{foto.loginUsuario}</Text>
                </View>
                <Image source={{uri: foto.urlFoto}} style={styles.foto} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cabecalho:{
      margin: 10,
      flexDirection: "row",
      alignItems: "center"
    },
    fotoPerfil:{
      marginRight: 10,
      borderRadius: 20,
      width: 40,
      height: 40
    },
    foto: {
      width: width,
      height: width
    }
  });