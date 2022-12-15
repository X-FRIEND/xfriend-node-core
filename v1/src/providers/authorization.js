const { JWT } = require('../security');

const { appTokenAttribute } = require('../config');

const attributesDict = {
  [appTokenAttribute]: 'userInfo',
  authorization: 'authorizationInfo',
};

module.exports = class AuthenticationProvider {
  constructor(authData, authenticationAttributes) {
    this.authData = authData;
    this.authenticationAttributes = authenticationAttributes;

    this.SECRET_KEY = process.env.JWT_SECRET_KEY;
    this.jwt = new JWT(this.SECRET_KEY);
  }

  isValid() {
    try {
      this.authenticationAttributes.forEach((attribute) => {
        const jwtToken = this.authData && this.authData[attribute];

        this.jwt.verify(jwtToken, this.SECRET_KEY);
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  getAuthorization() {
    const authorization = {};

    Object.keys(attributesDict).forEach((attribute) => {
      if (this.authData[attribute]) {
        const tokenData = this.jwt.decode(this.authData[attribute]);

        delete tokenData.iat;
        authorization[attributesDict[attribute]] = tokenData;
      }
    });

    return authorization;
  }
};
