const baseUrl = 'http://localhost:10086'

export const successAlert = (message?: string) => {
    return {
        severity: 'success',
        message: message ?? 'Success',
    };
}

export const errorAlert = (message?: string) => {
    return {
        severity: 'error',
        message: message ?? 'Error',
    };
}

// TODO:
const responseHandling = (res: Response) => {
    if (res.status === 200) {
        return Promise.resolve(res.json());
    } else if (res.status === 400) {
        throw Promise.reject("Invalid request");
    } else {
        throw Promise.reject("Internal error");
    }
}

export const get = async (url: string) => {
    return await fetch(baseUrl + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

export const post = async (url: string, data: any, contentType?: string) => {
    return await fetch(baseUrl + url, {
        method: 'POST',
        headers: {
            ...(contentType ? {} : { 'Content-Type': 'application/json' }),
        },
        body: contentType ? data : JSON.stringify(data)
    }).then(res => res.json());
}

export const put = async (url: string, data: any) => {
    return await fetch(baseUrl + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}