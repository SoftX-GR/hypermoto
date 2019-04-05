import moment from 'moment';
import 'moment/locale/el';

import Str from './Str'
import { Lang } from '../lang/strings';


let _benchStart, _benchEnd;

let getTimeDiff = (start, end) => {
    let diff = end.getTime() - start.getTime();
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -=  days * (1000 * 60 * 60 * 24);
    
    let hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    
    let minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    
    let seconds = Math.floor(diff / (1000));
    diff -= seconds * (1000);

    let milliseconds = diff;

    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds
    }
}

let Time = {
    localeUpdated: () => {
        let locale = Lang.utils.getCurrentLocale();
        moment.locale([locale, 'en']);
        Time.moment = moment;
    },
    getTimeSeconds: () => Math.floor((new Date).getTime() / 1000),
    secondsToTimecountFromNowString: seconds => {
        //let locale = Lang.utils.getCurrentLocale();
        //moment.locale([locale, 'en']);
        return moment().add(seconds, 'seconds').fromNow();
    },
    moment: moment,
    // moment: (...args) => {
    //     let locale = Lang.utils.getCurrentLocale();
    //     //moment.locale([locale, 'en']);
    //     let loc = moment.locale('el');
    //     //console.log('moment locale', moment.locale([locale, 'en']));
    //     let m = args.length > 0 ? moment.apply(moment, args) : moment;

    //     //let m = moment.apply(null, []);
    //     //let m = moment();
    //     console.log('moment', m, locale, loc, moment.apply(moment, []).unix(1535940306).format('ll'));
    //     return m;
    // },
    getTimeDiff,
    benchStart: ({text, title}) => {
        _benchStart = new Date;
        let timeData = {
            milliseconds: _benchStart.getMilliseconds(),
            seconds: _benchStart.getSeconds(),
            minutes: _benchStart.getMinutes(),
            hours: _benchStart.getHours()
        }

        if(!text)
            text = "Bench stared at [{hours}:{minutes}:{seconds}.{milliseconds}]\n";

        if(title)
            text = `[${title}] ${text}`;
        
        //console.log(Str.format(text, timeData));
    },

    parseSQLDate: sqlDate => {
        return new Date(Date.parse(sqlDate));
    },

    benchTick: ({text, diffText, title}) => {
        _benchEnd = new Date;

        let timeDiff = getTimeDiff(_benchStart, _benchEnd);

        let timeData = {
            milliseconds: _benchEnd.getMilliseconds(),
            seconds: _benchEnd.getSeconds(),
            minutes: _benchEnd.getMinutes(),
            hours: _benchEnd.getHours()
        }

        if(!text)
            text = "Bench tick/finish at [{hours}:{minutes}:{seconds}.{milliseconds}]\n";
        
        if(title)
            text = `[${title}] ${text}`;

        //console.log(Str.format(text, timeData));

        if(!diffText)
            diffText = "Bench time elapsed [{hours}h {minutes}m {seconds}s {milliseconds}ms]";

        if(title)
            diffText = `[${title}] ${diffText}`;

        //console.log(Str.format(diffText, timeDiff));
    }
}

export default Time;