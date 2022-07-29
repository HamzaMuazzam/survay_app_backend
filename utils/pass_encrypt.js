const bcrypt = require('bcrypt');

exports.cryptPassword = async (password) =>
    await bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash);

exports.comparePassword = async (password, hashPassword) =>
    await bcrypt.compare(password, hashPassword)
        .then(resp => resp)
