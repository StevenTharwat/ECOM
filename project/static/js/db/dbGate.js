export const db = async function (url, method, data=null) {
    const response = await fetch(url, {
        method: method,
        body: data == null? null: JSON.stringify(data)
    }).catch((error) => {
        console.error('Error:', error);
    });
    return response.json();
}

export const get = async function (mainURL, id =null) {
    let url =  mainURL;
    if(id) url = url+'/'+id
    return await db(url, 'GET');
}

export const post = async function (mainURL, data) {
    await db(mainURL, 'POST', data).catch((error) => {
        console.error('Error:', error);
    });
}

export const del = async function (mainURL, id) {
    await db(mainURL+`/${id}`, 'DELETE').catch((error) => {
        console.error('Error:', error);
    });
}

export const update = async function (mainURL, id, data) {
    await db(mainURL+`/${id}`, 'PUT', data).catch((error) => {
        console.error('Error:', error);
    });
}