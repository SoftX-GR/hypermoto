
export default {
    format: (text, ...params) =>  {
		var formatted = text;
		
		if(params.length == 1 && typeof params[0] == 'object')
            args = params[0];
        else
            args = params;
	
        for(let key in args)
			formatted = formatted.replace(new RegExp('\\{' + key + '\\}', 'gi'), args[key]);

		return formatted;
    },
    
    padLeft: (text, padding) => {
        let toStr = text.toString();
        return padding.length <= toStr.length ? toStr : String(padding + toStr).slice(-padding.length);
    },

    padRight: (text, padding) => {
        let toStr = text.toString();
        return padding.length <= toStr.length ? toStr : String(toStr + padding).slice(0, padding.length);
    },

    toCamelCase: text => text.replace(/^([A-Z])|\s(\w)/g, (match, p1, p2, offset) => p2 ? p2.toUpperCase() : p1.toLowerCase())
}