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
                    name: "Feed",
                    options: {},
                    passProps: {
                        text: "Instalura"
                    }
                }
            }
            return {
                name: "Login",
                options: {},
                passProps: {
                    text: "Login"
                }
            };
        })
        .then(screen => Navigation.setRoot({
            root: {
                component: screen
            }
        }));
});

//AppRegistry.registerComponent(appName, () => Login);
