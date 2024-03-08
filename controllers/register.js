const handleRegister = (req, res, db, bcrypt) => {

    if(!req.body.email || !req.body.name || !req.body.password){
        return res.status(400).json("Incorrect Form Submission");
    }

    const hashed_pass = bcrypt.hashSync(req.body.password);

    db.transaction(trx => {
        trx.insert({
            hash: hashed_pass,
            email: req.body.email
        })
          .into('login_info')
          .returning('email')
          .then(login_email => {
            return trx('users')
            .returning('*')
            .insert({
                email: req.body.email,
                name: req.body.name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
          })
           .then(trx.commit)
           .catch(trx.rollback)
    }).catch(err => res.status(400).json('Unable to Register'));
    
}

module.exports = {
    handleRegister
};