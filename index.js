/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import {AsyncStorage} from 'react-native';
import Feed from './Feed';
import Login from './Login';

Navigation.registerComponent(`Login`, () => Login);
Navigation.registerComponent(`Feed`, () => Feed);
Navigation.registerComponent(`PerfilUsuario`, () => Feed);

Navigation.events().registerAppLaunchedListener(() => {
    AsyncStorage.getItem("token")
        .then(token => {
            if (token) {
                return {
                    /*stack: {
                        children: [{*/
                            component: {
                                id: 'Feed',
                                name: "Feed",
                                options: {},
                                passProps: {
                                    text: "Instalura"
                                }
                            }
                        /*}]
                    }*/
                }
            }
            return {
                component: {
                    id: "Login",
                    name: "Login",
                    options: {},
                    passProps: {
                        text: "Login"
                    }
                }
            };
        })
        .then(screen => Navigation.setRoot({
            root: screen
        }));
});
