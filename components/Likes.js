import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';

import PropTypes from "prop-types";

export default class Likes extends Component {

    carregarIcone = (likeada) =>{
        return likeada ? require("../resources/img/s2-checked.png") : require("../resources/img/s2.png");
    }

    exibeLikes(likers){
        if(likers.length <= 0){
          return;
        } else {
          return (
            <Text style={styles.likes}>
              {likers.length} {likers.length > 1 ? "curtidas" : "curtida"}
            </Text>
          );
        }
    }
    
    render(){
        const {foto, likeCallback} = this.props;
        return(
            <View>
                <TouchableOpacity onPress={() => likeCallback(foto.id)}>
                    <Image 
                      style={styles.botaoDeLike}
                      source={this.carregarIcone(foto.likeada)}
                    />
                </TouchableOpacity>
                {this.exibeLikes(foto.likers)}
            </View>
        );
    }
}

Likes.propTypes = {
  likeCallback: PropTypes.func.isRequired,
  foto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    likeada: PropTypes.bool.isRequired,
    likers: PropTypes.array.isRequired
  })
}

const styles = StyleSheet.create({
    botaoDeLike: {
      height: 40,
      width: 40
    },
    likes: {
      fontWeight: "bold"
    }
});