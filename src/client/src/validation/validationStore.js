import { observable, action, reaction,computed } from "mobx";

const getObservables = () => {
    let obs = observable({
        error: "",
        dirty: false,
        value: ""
    });
    return obs;
};


export default class ValidationStore {

    reactionDisposers = [];
    timer = null;

    constructor(rules) {
        const keys = Object.keys(rules);
        this.fields = {};

        keys.forEach((k) => {

            this.fields[k] = {
                rules: rules[k].rules,
                status: getObservables()
            }

            // add reactions to respond value changes
            let re = reaction(() => this.fields[k].status.value,
                () => this.validateWithDelay(k));

            this.reactionDisposers.push(re);
        });

    }

    validateWithDelay(field) {
        this.clearTimer();
        this.timer = setTimeout(() => this.validateField(field), 1500);
    };

    // check all rules agains value
    @action validateField = (field) => {
        if (!this.fields[field].status.dirty){
            this.fields[field].status.dirty = true
        }

        let errMessage = this.validator(this.fields[field].status.value, this.fields[field].rules);
        this.fields[field].status.error = errMessage ? errMessage : "";
    }

    clearTimer() {
        if (this.timer) clearTimeout(this.timer);
        this.timer = null;
    }

    validator(value, rules) {
        let rls = Object.getOwnPropertyNames(rules);

        for (let rule of rls) {

            let isError = rules[rule].validate(value);

            if (!isError) return rules[rule].message;
        }

        return false; // false means no error

    }

    @computed get isFormValid() {
        const keys = Object.keys(this.fields);

        for (let x in keys) {
            let k = keys[x];

            if (this.fields[k].status.dirty && this.fields[k].status.error) {
                return false;
            }else if (!this.fields[k].status.dirty){
                return false;
            }else{
            }

        }

        return true;

    }

    clearDisposers = () => {
        this.reactionDisposers.forEach(f => f());
    }



}
