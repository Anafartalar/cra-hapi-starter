import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router-dom'
import { email, isAlphanumeric, isEmpty } from "validation/rules";
import ValidationStore from "validation/validationStore";

const paperStyle = {
    padding: 5,
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15

};

const validationRules = {
    email: {
        rules: {
            isEmpty: isEmpty(),
            isEmail: email()
        }
    },
    password: {
        rules: {
            isEmpty: isEmpty(),
            isAlphanumeric: isAlphanumeric()
        }
    }
};

const ENTER_KEY = 13;


@inject("stores","states")
@observer
export default class Login extends Component {

    constructor(props, context) {
        super(props, context);
        this.formValidation = new ValidationStore(validationRules);

    }

    handleEnterKeyDown = (e) => {

        if (e.keyCode !== ENTER_KEY) {
            return;
        }

        e.preventDefault();
        this.loginBtnOnClick();
    }


     loginBtnOnClick = async () => {

        return this.props.stores.user.setUser({ token:"xxxxx", name:"xxxx" });


        if (!this.formValidation.isFormValid) {
            return;
        }

        const payload = {
            email: this.formValidation.fields.email.status.value,
            password: this.formValidation.fields.password.status.value

        };

        try {
            let response = await this.props.stores.user.login(payload);
            this.props.stores.user.setUser(response);

        } catch (error) {
            this.props.states.layout.setError(error.message);
        }

    }

    handleOnChange = (e) => {
        this.formValidation.fields[e.target.name].status.value = e.target.value;
    }

    componentWillUnmount() {
        this.formValidation.clearDisposers();
    }


    render() {

        if (this.props.stores.user.isAuth) {
            return (
                <Redirect to={{ pathname: '/' }} />
            )
        }


        return (
            <div className="row center-xs">
                <div className="col-sm-4">
                    <Paper style={paperStyle} >
                        <h4>Lütfen Giriş Yapınız.</h4>
                        <TextField value={this.formValidation.fields.email.status.value}
                            name="email" hintText="E-mail adresinizi girini"
                            floatingLabelText="E-mail" onChange={this.handleOnChange}
                            errorText={this.formValidation.fields.email.status.error} />
                        <br />
                        <TextField value={this.formValidation.fields.password.status.value}
                            name="password" hintText="Parolanızı giriniz" type="password"
                            floatingLabelText="Parola" onChange={this.handleOnChange}
                            errorText={this.formValidation.fields.password.status.error} />
                        <br />
                        <RaisedButton onTouchTap={this.loginBtnOnClick} label="Giriş Yap" primary={true} />
                    </Paper>
                </div>

            </div>
        );
    }

}