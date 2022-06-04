export default { 
    // fromByteArray(imageObj) { 
    //     let url = btoa(new Uint8Array(imageObj).reduce(function(data,byte) { 
    //         return data + String.fromCharCode(byte);
    //       }, ''))
    // },
    getUrl(imageBuf) { 
        let url = imageBuf.toString('base64')
        let completeUrl = `data:image/jpeg;base64,${url}`
        return completeUrl
    }
}