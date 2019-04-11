import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';

export default class InputComentario extends Component {
    constructor(){
        super();
        this.state = {
            valorComentario: ""
        }
    }

    render(){
        const {comentarioCallback, idFoto} = this.props;
        return (
            <View style={styles.novoComentario}>
                <TextInput
                    style={styles.input}
                    placeholder="Adicione um comentário..."
                    ref={input => this.inputComentario = input}
                    onChangeText={texto => this.setState({valorComentario: texto})}
                />
                <TouchableOpacity onPress={() => {
                    comentarioCallback(idFoto, this.state.valorComentario, this.inputComentario);
                    this.setState({valorComentario: ""});
                }}>
                    <Image
                        style={styles.icone}
                        source={require("../resources/img/send.png")}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    novoComentario: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      paddingHorizontal: 10,
      marginBottom: 10
    },
    input: {
      flex: 1,
      height: 40
    },
    icone: {
      height: 30,
      width: 30
    }
});