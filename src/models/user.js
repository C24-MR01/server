class User {
    constructor (id, email, password)   {
        this.id = id;
        this.email = email;
        this.password = password;
        this.likes = [];
    }
}

module.exports = User;