/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, FlatList, Dimensions} from 'react-native';
import Post from "./components/Post"

const {width} = Dimensions.get("screen");

export default class Feed extends Component {
  constructor(){
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount(){
    fetch("https://instalura-api.herokuapp.com/api/public/fotos/rafael")
      .then(resposta => resposta.json())
      .then(json => this.setState({fotos: json}));
  }

  render() {

    return (
      <FlatList
        keyExtractor={item => item.id + item.loginUsuario}
        data={this.state.fotos}
        renderItem={ ({item}) => 
          <Post foto={item} />
        }
      />
    );
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
