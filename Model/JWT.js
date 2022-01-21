class JWT {
    constructor(id, expirationDate, token) {
      this.id = id;
      this.expirationDate = expirationDate;
      this.token = token;
    }
  }
module.exports = JWT;