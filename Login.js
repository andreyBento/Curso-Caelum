import React, {Component} from 'react';
import {StyleSheet, Dimensions, TextInput, View, Text, Button, AsyncStorage} from 'react-native';
import { Navigation } from "react-native-navigation";
//import AsyncStorage from "@react-native-community/async-storage";

const {width} = Dimensions.get("screen");

export default class Feed extends Component {

    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            usuario: "",
            senha: "",
            mensagem: ""
        }
    }

    efetuaLogin = () =>{
        const uri = "https://instalura-api.herokuapp.com/api/public/login";

        const requestInfo = {
            method: "POST",
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({
                "content-type": "application/json"
            })
        }

        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok){
                    return response.text();
                }else{
                    throw new Error("Login ou senha incorretos.");
                }
            })
            .then(token => {
                AsyncStorage.setItem("token", token);
                AsyncStorage.setItem("usuario", this.state.usuario);

                Navigation.setRoot({
                    root: {
                        /*stack: {
                            children: [{*/
                                component: {
                                    id: 'Feed',
                                    name: "Feed",
                                    options: {},
                                    passProps: {
                                        text: "Instalura"
                                    },
                                    topBar: null
                                }
                            /*}]
                        }*/
                    }
                });
            })
            .catch(error => this.setState({mensagem: error.message}));
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput
                        autoCapitalize="none"
                        style={styles.input}
                        placeholder="Usuario..."
                        onChangeText={texto => this.setState({usuario: texto})}
                    />
                    <TextInput
                        autoCapitalize="none"
                        secureTextEntry={true}
                        style={styles.input}
                        placeholder="Senha..."
                        onChangeText={texto => this.setState({senha: texto})}
                    />
                    <Button title="Login" onPress={this.efetuaLogin} />
                    <Text style={styles.mensagem}>
                        {this.state.mensagem}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    form: {
        width: width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 26
    },
    mensagem:{
        marginTop: 15,
        color: "#e74c3c"
    }
})