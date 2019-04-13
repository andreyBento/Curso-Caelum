/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, Dimensions, AsyncStorage, ScrollView} from 'react-native';
import Post from "./components/Post";
import InstaluraFetchService from "./services/InstaluraFetchService";
import Notificacao from "../api/Notificacao"
import HeaderUsuario from './components/HeaderUsuario';

const {width} = Dimensions.get("screen");

export default class Feed extends Component {
  constructor(){
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount(){

    this.props.navigator.setOnNavigatorEvent(evento => {
      if(evento.id === "willAppear"){
        this.carregaFotos();
      }
    })

  }

  carregaFotos(){
    let uri = "/fotos";

    if(this.props.usuario){
      uri = "/public/fotos/${this.props.usuario}";
    }

    InstaluraFetchService.get(uri)
      .then(json => this.setState({fotos: json}))
  }

  buscaPorId(idFoto){
    const foto = this.state.fotos.find(foto => foto.id === idFoto);
    return foto;
  }

  atualizarFotos(fotoAtualizada){
    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);
    this.setState({fotos});
  }

  like = (idFoto) => {
    const foto = this.buscaPorId(idFoto);
    const listaOriginal = this.state.fotos;

    AsyncStorage.getItem("usuario")
      .then(usuarioLogado => {
        let novaLista = [];

        if(!foto.likeada){
          novaLista = [
            ...foto.likers,
            {login: usuarioLogado}
          ];
        } else {
          novaLista = foto.likers.filter(liker => {
            return liker.login !== usuarioLogado;
          })
        }
      })
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        }
    
        this.atualizarFotos(fotoAtualizada);
      });

    InstaluraFetchService.post("/fotos/${idFoto}/like")
      .catch(e => {
        this.setState({fotos: listaOriginal})
        Notificacao.exibe("Ops...", "Algo deu errado ao curtir");
      })
  }

  adicionaComentario = (idFoto, valorComentario, inputComentario) => {
    if(valorComentario === ""){
      return;
    } else {
      const foto = this.buscaPorId(idFoto);
      const comentario = {
        texto: valorComentario
      };
      const listaOriginal = this.state.fotos;

      InstaluraFetchService.post("/fotos/${idFoto}/comment", comentario)
        .then(comentario => [...foto.comentarios, comentario])
        .then(novaLista => {
          const fotoAtualizada = {
            ...foto,
            comentarios: novaLista
          }
          this.atualizarFotos(fotoAtualizada);
          inputComentario.clear()
        })
        .catch(e => {
          this.setState({fotos: listaOriginal});
          Notificacao.exibe("Ops..", "Algo deu errado ao adicionar comentários");
        })
    }
  }

  verPerfilUsuario = (idFoto) => {
    const foto = this.buscaPorId(idFoto);
    this.props.navigator.push({
      screen: "PerfilUsuario",
      title: foto.loginUsuario,
      backButtonTitle: "",
      passProps: {
        usuario: foto.loginUsuario,
        fotoDePerfil: foto.urlPerfil
      }
    })
  }

  exibeHeader() {
    if(this.props.usuario){
      return <HeaderUsuario {...this.props} posts={this.state.fotos.length} />
    }
  }

  render() {

    return (
      <ScrollView>
        {this.exibeHeader()}
        <FlatList
          keyExtractor={item => item.id + item.loginUsuario}
          data={this.state.fotos}
          renderItem={ ({item}) => 
            <Post 
              foto={item} 
              likeCallback={this.like} 
              comentarioCallback={this.adicionaComentario} 
              verPerfilCallback={this.verPerfilUsuario}
            />
          }
        />
      </ScrollView>
    );
  }
}