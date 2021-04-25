class PictureService {
    constructor() {
        this.url = "http://localhost:4000/picture/";
    }
    _creatRequest = (token, method, url) => {
        return fetch(url, {
            method: method,
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'authorization': token,
                 "Access-Control-Allow-Origin": "*"
            }
        }).then((response) => {
            return response.json();
        }).then(data => { return data })
    }
    _creatRequestWithBody = (token, url, values) => {
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'authorization': token,
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(values)
        }).then((response) => {
            return response.json();
        }).then(data => { return data })
    }

    createByRequest = (token, method) => {
        return this._creatRequest(token, method, `${this.url}createByRequest`);
    }

    getHistory = (token, method) => {
        return this._creatRequest(token, method, `${this.url}getHistory`);
    }
    createByUser = (token, values) => {
        return this._creatRequestWithBody(token, `${this.url}createByUser`, values)
    }
    deletePicture=(token,method,id)=>{
        return this._creatRequest(token, method, `${this.url}delete/${id}`);
    }
}
export default new PictureService();