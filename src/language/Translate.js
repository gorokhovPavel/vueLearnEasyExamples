import state from '../store/state'
import ru from './ru/messages'
import en from './en/messages'

export default class Translate {

    //Вызывается в отдельных js модулях
    static getMessages(option){

        let lang = state.isRuLang ? ru : en;
        return lang[option];
    }
}