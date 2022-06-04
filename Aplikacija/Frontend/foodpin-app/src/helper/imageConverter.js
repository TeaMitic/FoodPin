export default { 
    fromByteArray(imageObj) { 
        let url = btoa(new Uint8Array(imageObj).reduce(function(data,byte) { 
            return data + String.fromCharCode(byte);
          }, ''))
        return `data:image/jpge;base64,${url}`
    }
}