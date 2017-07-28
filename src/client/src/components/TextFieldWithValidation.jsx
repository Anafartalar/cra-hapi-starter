// TextField with custom validation
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { observer } from "mobx-react";
import { action } from "mobx";
import Validator from "validation/validator"


@observer
export default class TextFieldWithValidation extends Component {
    onChange = null;
    validation = null;
    fieldProps = null;
    timer = null;

    constructor(props, context) {
        super(props, context);

        const { validation = null, onChange = null, ...rest } = this.props;

        if (!validation) {
            throw new Error(`validation object is missing on ${this.props.name} field`)
        }

        this.validation = validation;
        this.fieldProps = rest;
        this.onChange = onChange;
    }

    @action onValueChange = (e) => {

        this.validation.status.value = e.target.value;
        this.validateMeWithDelay();// start validation
        if (this.onChange) { this.onChange(e) }
    }

    validateMeWithDelay() {
        this.clearTimer();
        this.timer = setTimeout(() => this.validateMe(), 1500);
    };

// check all rules agains value
    @action validateMe = () => {
        let errMessage = Validator(this.validation.status.value, this.validation.rules);
        this.validation.status.error = errMessage ? errMessage : "";
    }

    clearTimer() {
        if (this.timer) clearTimeout(this.timer);
        this.timer = null;
    }



    render() {

        return (

            <TextField value={this.validation.status.value} errorText={this.validation.status.error} onChange={this.onValueChange} {...this.fieldProps} />

        );

    }
}