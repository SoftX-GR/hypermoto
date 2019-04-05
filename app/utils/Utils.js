//import { Lang } from '../lang/strings';
import App from '../App';


export default {
    randomColor: () => '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6),
    styles: {
        display: visible => visible ? 'flex' : 'none'
    },
    untone(text) {
        Object.entries({
			'Ά':'Α', 'Έ':'Ε', 'Ή':'Η', 'Ί':'Ι', 'Ό':'Ο', 'Ύ':'Υ', 'Ώ':'Ω', 'ά':'α', 'έ':'ε', 'ή':'η', 'ί':'ι', 'ό':'ο', 'ύ':'υ', 'ώ':'ω'
		}).forEach((entry) => {
            text = text.replace(new RegExp(entry[0], 'g'), entry[1]);
        });
        return text;
    },
    fullUntone(text) {
        Object.entries({
			'Ά':'Α', 'Έ':'Ε', 'Ή':'Η', 'Ί':'Ι', 'Ϊ':'Ι', 'Ό':'Ο', 'Ύ':'Υ', 'Ϋ':'Υ', 'Ώ':'Ω', 'ά':'α', 'έ':'ε', 'ή':'η', 'ί':'ι', 'ΐ':'ι', 'ϊ':'ι', 'ό':'ο', 'ύ':'υ', 'ϋ':'υ', 'ΰ':'υ', 'ώ':'ω'
		}).forEach((entry) => {
            text = text.replace(new RegExp(entry[0], 'g'), entry[1]);
        });
        return text;
    },
    chars: {
        en: ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z'],
        el: ['Α', 'Ά', 'α', 'ά', 'Β', 'β', 'Γ', 'γ', 'Δ', 'δ', 'Ε', 'Έ', 'ε', 'έ', 'Ζ', 'ζ', 'Η', 'Ή', 'η', 'ή', 'Θ', 'θ', 'Ι', 'Ί', 'Ϊ', 'ι', 'ί', 'ϊ', 'ΐ', 'Κ', 'κ', 'Λ', 'λ', 'Μ', 'μ', 'Ν', 'ν', 'Ξ', 'ξ', 'Ο', 'Ό', 'ο', 'ό', 'Π', 'π', 'Ρ', 'ρ', 'Σ', 'σ', 'Τ', 'τ', 'Υ', 'Ύ', 'Ϋ', 'υ', 'ύ', 'ϋ', 'ΰ', 'Φ', 'φ', 'Χ', 'χ', 'Ψ', 'ψ', 'Ώ', 'Ω', 'ω', 'ώ'],
        fixEnEl: {
            'A': 'Α', 'B': 'Β', 'E': 'Ε', 'F': 'Φ', 'G': 'Γ', 'H': 'Η', 'I': 'Ι', 'K': 'Κ', 'L': 'Λ', 'M': 'Μ', 'N': 'Ν', 'O': 'Ο', 'P': 'Ρ', 'T': 'Τ', 'X': 'Χ', 'Y': 'Υ', 'Z': 'Ζ',
            'a': 'α', 'b': 'β', 'd': 'δ', 'e': 'ε', 'f': 'φ', 'g': 'γ', 'h': 'η', 'i': 'ι', 'k': 'κ', 'l': 'λ', 'm': 'μ', 'n': 'ν', 'o': 'ο', 's': 'σ', 't': 'τ', 'u': 'υ', 'x': 'χ', 'y': 'υ', 'z': 'ζ'
        }
    },
    // fixEnElLocaleInvalidWords(text) {
    //     var that = this;
    //     return text
    //     .split(' ')
    //     .map(word => {
    //         let wordChars = word.split(''),
    //             charsInWord = {
    //                 en: [],
    //                 el: []
    //             };
            
    //         for(let charIndex in wordChars) {
    //             if(that.chars.en.indexOf(wordChars[charIndex]) >= 0) {
    //                 charsInWord.en.push(charIndex);
    //             } else {
    //                 charsInWord.el.push(charIndex);
    //             }
    //         }

    //         if(charsInWord.en.length > 0 && charsInWord.el.length > 0) {
    //             let charsFix = that.chars.fixEnEl,
    //                 changeFrom = 'en';

    //             if(charsInWord.en.length > charsInWord.el.length) {
    //                 charsFix = Object.keys(charsFix).reduce((obj, key) => (obj[charsFix[key]] = key, obj), {});
    //                 changeFrom = 'el';
    //             }

    //             charsInWord[changeFrom].forEach(c => {
    //                 wordChars[c] = charsFix[wordChars[c]];
    //             });
    //         }

    //         return wordChars.join('');
    //     })
    //     .join(' ');
    // },
    hasLocaleChars(text, locale) {
        let result = false,
            textChars = text.split('');
        for(let charIndex in textChars)
            if(result = this.chars[locale].indexOf(textChars[charIndex]) >= 0) break;
        return result;
    },
    arraySort(arr, prop, asc) {
        return arr.sort((a, b) => {
            if(asc) {
                return a.localeCompare(b, ['en', 'el'], {sensitivity: 'base'});
                //return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                //return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
                return b.localeCompare(a, ['en', 'el'], {sensitivity: 'base'});
            }
        });
    },
    arraySortForLocale(arr, prop, locale, asc, untone = false) {
        var that = this;
        return arr.sort((a, b) => {
            let av = untone ? that.untone(a[prop][locale]) : a[prop][locale];
            let bv = untone ? that.untone(b[prop][locale]) : b[prop][locale];

            if(asc)
                //return av > bv ? 1 : (av < bv ? -1 : 0);
                return av.localeCompare(bv, ['en', 'el'], {sensitivity: 'base'});
            else
                //return bv > av ? 1 : (bv < av ? -1 : 0);
                return bv.localeCompare(av, ['en', 'el'], {sensitivity: 'base'});
        });
    },
    camelize(str) {
        return str
        .replace(/[_-]/g, ' ')
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
            return letter.toUpperCase();
        })
        .replace(/\s+/g, '');
    },
    doubleSpaceTitles: (text, joinWith = "\n") => {
        return text.split('  ').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(joinWith);
    },
    //ionicIconSelect: name => Platform.select({ios: `ios-${name}`, android: `md-${name}`}),
    fetchWithTimeout: (url, options, timeout = 30000) => {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('timeout')), timeout)
            )
        ]);
    },
    pointInRect: ({x, y}, {x1, y1, x2, y2}) => x >= x1 && x <= x2 && y >= y1 && y <= y2,
    pointInPoly: ({x, y}, points) => {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        
        var inside = false;
        for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
            var xi = points[i][0], yi = points[i][1];
            var xj = points[j][0], yj = points[j][1];
            
            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        
        return inside;
    },
    polyRect: points => {
        const initX = points[0][0], initY = points[0][1];
        let x1 = initX, y1 = initY, x2 = initX, y2 = initY;

        for(let i = 0; i < points.length; i++) {
            let px = points[i][0], py = points[i][1];
            if(px < x1) x1 = px; else if(px > x2) x2 = px;
            if(py < y1) y1 = py; else if(py > y2) y2 = py;
        }

        return { x1, y1, x2, y2 }
    },
    rectToPoly: ({x1, y1, x2, y2}) => [[x1, y1], [x1, y2], [x2, y2], [x2, y1]],
    resetPolyXY(points) {
        let prc = this.polyRect(points);
        return points.map(v => [v[0] - prc.x1, v[1] - prc.y1]);
    },
    getMapDeltas: (lat, lon, distance) => {
        const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
        const latitudeDelta =distance / oneDegreeOfLatitudeInMeters;
        const longitudeDelta = distance / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));
 
        return result = {
            latitude: lat,
            longitude: lon,
            latitudeDelta,
            longitudeDelta,
        }
    },
    getDistanceToVenue(lat, lon) {
        return this.getDistanceFromLatLonInKm(lat, lon, App.map.metropolitanExpo.coords.lat, App.map.metropolitanExpo.coords.lon);
    },
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = this.deg2rad(lon2 - lon1); 
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const d = R * c; // Distance in km
        return d;
    },
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    },
    // fixClientAddress(address, glue = "\n") {
    //     // "address": {
    //     //     "en": "25A, P.KALLIGA STR.,11473,ATHENS,GREECE",
    //     //     "el": "Π.ΚΑΛΛΙΓΑ 25Α,11473,ΑΘΗΝΑ,ΕΛΛΑΣ"
    //     // },
    //     let locale = Lang.utils.getCurrentLocale();
    //     let addrTokens = address.split(',').map(v => v.trim());
        
    //     if(locale == 'el') {
    //         if(addrTokens.length == 4) {
    //             if(addrTokens[1].length > 0) {
    //                 addrTokens[1] = 'ΤΚ: ' + addrTokens[1];
    //             }
    //             if(addrTokens[3].toUpperCase() == 'ΕΛΛΑΣ') {
    //                 addrTokens[3] = '';
    //             }
    //         }
    //     } else {
    //         if(addrTokens.length == 5) {
    //             if(addrTokens[0].length > 0) {
    //                 addrTokens[0] += addrTokens[1];
    //                 addrTokens[1] = '';
    //             }
    //         }
    //     }

    //     if(addrTokens.length > 0) {
    //         return addrTokens.filter(v => v.length > 0).join(glue);
    //     }

    //     return address;
    // },
    appendProtocol(uri, append = 'http:') {
        let result = uri;
        if(uri.substr(0, 4) != 'tel:' &&
           uri.substr(0, 7) != 'mailto:' &&
           uri.substr(0, 5) != 'ftp:' &&
           uri.substr(0, 5) != 'fax:' &&
           uri.substr(0, 5) != 'http:' &&
           uri.substr(0, 6) != 'https:' &&
           uri.substr(0, append.length) != append &&
           !/:\/\//.test(uri))
        {
            if(uri.substr(0, 2) != '//') {
                result = `//${result}`;
            }
            result =  `${append}${result}`;
        }
        return result;
    }
}