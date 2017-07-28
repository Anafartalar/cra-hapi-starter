import { observable, action, computed, reaction } from "mobx";
import { putDataToLocalStore, getDataFromLocalStore } from "utils/utils";
import ApiFetch from "apiFetch/apiFetch";

export default class User {
    @observable token = "";
    name = "";

    constructor() {

        let { token, name } = getDataFromLocalStore("fkHomeAuth");
        this.setUser({token,name});


        reaction(
            () => this.toJson,
            (json) => {
                putDataToLocalStore("fkHomeAuth", json);
            }
        );
    }

    login(authInfo) {
        return ApiFetch.user.login(authInfo);
    }

    @action setUser = ({ token, name }) => {
        if (!token || !name) return;

        this.name = name;
        this.token = token;
    }

    @action signOut = () => {
        this.name = "";
        this.token = "";
    }


    @computed get isAuth() {
        if (this.token) {
            return true;
        } else {
            return false;
        }
    }

    @computed get toJson() {
        return {
            name: this.name,
            token: this.token
        };
    }


}