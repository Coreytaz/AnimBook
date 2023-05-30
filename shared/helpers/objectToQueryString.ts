export function objectToQueryString(obj: { [x: string]: any }) {
    let queryString = ''

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (queryString !== '') {
                queryString += '&'
            }
            queryString += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
        }
    }

    return queryString
}
