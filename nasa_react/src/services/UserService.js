class UserService {
    constructor() {
        this.url = "http://localhost:4000/user/";
    }
    _creatRequest = (values, url) => {
        console.log(JSON.stringify(values));
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(values)
        }).then((response) => {
            console.log(response);
            return response.json();
        }).then(data => { return data })
    }

    login = (values) => {
        return this._creatRequest(values, `${this.url}login`);
    }

    register = (values) => {
        return this._creatRequest(values, `${this.url}create`);
    }
}
export default new UserService();