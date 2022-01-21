class User {
    constructor(id, login, password, email, token) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.email = email;
        this.token = token;
    }
}

module.exports = User;