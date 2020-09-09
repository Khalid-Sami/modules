import * as VeeValidate from 'vee-validate';
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
import Vue from 'vue'
import i18n from "../lang/lang";
import * as rules from 'vee-validate/dist/rules';
import {ar as arAttributes, en as enAttributes} from '../lang/i18n/attributes'
import en from 'vee-validate/dist/locale/en';
import ar from 'vee-validate/dist/locale/ar';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Object.keys(rules).forEach(rule => {
    extend(rule, {
        ...rules[rule], // copies rule configuration
        message: i18n.t(`messages.${rule}`) // assign message
    });
});

extend('locale_required', {
    getMessage(field, params, data) {
        return 'Something went wrong Locale error';
    },
    validate(value) {
        console.log('locale validated', value);
        return false;
    }
});

Vue.use(VeeValidate, {
    i18n,
    dictionary: {
        ar: {
            messages: ar.messages,
            attributes: arAttributes
        },
        en: {
            messages: en.messages,
            attributes: enAttributes
        }
    }
});

