
const baseUrl = 'http://localhost:10086'

export const get = (url: string) => {
    return fetch(baseUrl + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}

export const post = (url: string, data: any, contentType?: string) => {
    return fetch(baseUrl + url, {
        method: 'POST',
        headers: {
            ...(contentType ? {} : { 'Content-Type': 'application/json' }),
        },
        body: contentType ? data : JSON.stringify(data)
    })
}

export const put = (url: string, data: any) => {
    return fetch(baseUrl + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}