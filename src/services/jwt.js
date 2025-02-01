const jwtToken = require(`jsonwebtoken`)

let secret = 'sUpEr S3cR37'

// TODO change identity name if you use other

function createToken(userData){
    const payload = {
        email: userData.email,
        _id: userData._id
    }

    const token = jwtToken.sign(payload, secret, {
        expiresIn: '1d'
    })

    return token
}

function verifyToken(token){
    const data = jwtToken.verify(token,secret);

    return data;
}

module.exports = { verifyToken,createToken}