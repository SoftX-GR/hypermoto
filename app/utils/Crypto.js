import { NativeModules } from 'react-native';

let AES = NativeModules.Aes;
let _crypto = {
    generateKey: async (password, salt) => {
        return await AES.pbkdf2(password, salt);
    },
    encrypt: async (textOrObject, password = null) => {
        //const iv = 'base 64 random 16 bytes string';
        try {
            if(!password)
                password = _crypto.randomString(10);
            let data = typeof(textOrObject) == 'object' ? JSON.stringify(textOrObject) : textOrObject;
            const iv = await AES.randomKey(16);
            //const iv = '2a5c461e981cd73beecb1ff542f78e09';
            //const key = 'd8e025b38b68576838e8cc36cb43d60cbdd7d1379463213d13518e4724f9758c';
            //const key = await AES.pbkdf2('TAB123TAB123TAB123TAB123', 'xen19cpk111');
            const key = await AES.pbkdf2(password, _crypto.randomString(8), 5000, 256);
            //console.log('iv, key', iv, key);
            const cipherText = await AES.encrypt(data, key, iv);
            return { cipherText, iv, key };
        } catch (error) {
            throw error;
        }
    },

    decodeHttpData: async requestJson => {
        let inputHttpData = null;
        if(requestJson && typeof(requestJson['O']) !== undefined) {
            let encryptedData = requestJson['O'];

            if(encryptedData.length <= 96) {
                //console.log('encryptedData.length <= 96', encryptedData);
                return inputHttpData;
            }

            let cypherKeysScrabled = encryptedData.substr(0, 96);
            let cypherEncrypted = encryptedData.substr(96);

            let cypherKeys = _crypto.unscrableKeys(cypherKeysScrabled);

            if(cypherKeys.iv.length != 32 || cypherKeys.k.length != 64) {
                //console.log('cypherKeys.iv.length != 32 || cypherKeys.k != 64', cypherKeys);
                return inputHttpData;
            }

            try {
                let jsonData = await AES.decrypt(cypherEncrypted, cypherKeys.k, cypherKeys.iv);

                //console.log('jsonData', jsonData);

                if(jsonData && jsonData.length > 0) {
                    try {
                        inputHttpData = JSON.parse(jsonData);
                        if(inputHttpData && !inputHttpData['t'])
                            inputHttpData = false;
                    } catch(err) {
                        inputHttpData = false;
                    }
                }
            } catch(err) {
                inputHttpData = false;
            }
        }

        return inputHttpData;
    },

    packEncryption: encryption => {
        return _crypto.scrableKeys(encryption.key, encryption.iv) + encryption.cipherText;
    },

    scrableKeys: (k, iv) => {
        let result = '';
        for(let i = 0; i < iv.length; i++) {
            result += k.substr(i * 2, 2) + iv[i];
        }

        return result;
    },

    unscrableKeys: sk => {
        let k = '', iv = '', i = 0;
        while(i < sk.length) {
            k += sk.substr(i, 2);
            iv += sk[i + 2];
            i += 3;
        }

        return { k, iv };
    },

    randomKey: async length => {
        return await AES.randomKey(length);
    },

    randomChar: () => {
        var n = Math.floor(Math.random() * 62);
        if (n < 10) return n; //1-10
        if (n < 36) return String.fromCharCode(n + 55); //A-Z
        return String.fromCharCode(n + 61); //a-z
    },

    randomString: (stringLength = 10) => {
        let s = '';
        while (s.length < stringLength) s += _crypto.randomChar();
        return s;
    }
}

export default _crypto;