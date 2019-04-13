import React, {Component} from 'react';
import {StyleSheet, Text, Dimensions, View, Image, TouchableOpacity, TextInput} from 'react-native';
import InputComentario from './InputComentario';
import Likes from './Likes';

import PropTypes from "prop-types";

const {width} = Dimensions.get("screen");

export default class Post extends Component {

  constructor(props){
    super(props);
    this.state = {
      foto: this.props.foto,
      valorComentario:  ""
    }
  }

  exibeLegenda(foto){
    if(foto.comentario === ""){
      return;
    } else {
      return (
        <View style={styles.comentario}>
          <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
          <Text>{foto.comentario}</Text>
        </View>
      );
    }
  }

  render(){
    const {likeCallback, foto, comentarioCallback, verPerfilCallback} = this.props;
    return(
      <View>
        <TouchableOpacity style={styles.cabecalho} onPress={() => verPerfilCallback(fotoid)}>
          <Image source={{uri: foto.urlPerfil}} style={styles.fotoPerfil} />
          <Text style={{fontSize: 14}}>{foto.loginUsuario}</Text>
        </TouchableOpacity>
        <Image source={{uri: foto.urlFoto}} style={styles.foto} />
        <View style={styles.rodape}>
          <Likes foto={foto} likeCallback={likeCallback} />
        </View>
        {this.exibeLegenda(foto)}

        {foto.comentarios.map(comentario => 
          <View style={styles.comentario} key={comentario.id}>
            <Text style={styles.tituloComentario}>{comentario.login}</Text>
            <Text>{comentario.texto}</Text>
          </View>
        )}
        
        <InputComentario idFoto={foto.id} comentarioCallback={comentarioCallback} />
      </View>
    )
  }
}

Likes.propTypes = {
  likeCallback: PropTypes.func.isRequired,
  comentarioCallback: PropTypes.func.isRequired,
  foto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    likeada: PropTypes.bool.isRequired,
    likers: PropTypes.array.isRequired,
    comentario: PropTypes.string.isRequired
  })
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
  },
  rodape: {
    margin: 10
  },
  comentario: {
    flexDirection: "row",
    paddingHorizontal: 10
  },
  tituloComentario: {
    fontWeight: "bold",
    marginRight: 5
  }
});