
const {response} =  require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const userGet = async(req, res = response) => {

    const {limit=5, from=0} = req.query;
    const stateQuery = { state: true};

    const [ total, users ] = await Promise.all([
        User.countDocuments(stateQuery),
        User.find(stateQuery)
            .limit(Number(limit))
            .skip(Number(from))
    ]);

    res.json({
       total,
       users
    });
}

const userPost = async(req, res) => {

    const { name, email, password, role } = req.body;
    const user = new User({name, email, password, role});

    //encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //guardar en BD

    await user.save();

    res.json({
        mssg: 'post API',
        user
    })
}

const userPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, email, ...other } =req.body;

    //Validar en base de datos.
    if(password){
        const salt = bcryptjs.genSaltSync();
        other.password = bcryptjs.hashSync(password, salt);
    };

    const user = await User.findByIdAndUpdate(id, other);

    res.json(user);
}

const userPatch = (req, res) => {
    res.json({
        mssg: 'patch API'
    })
}

const userDelete = async(req, res) => {

    const { id } = req.params;

    //borrado FÍSICO
    //const user = await User.findByIdAndDelete(id);

    //Borrado por CAMBIO de estado.
    const user = await User.findByIdAndUpdate(id, {state: false});

    res.json({
        user
    })
}

module.exports = {
    userGet, userPut,
    userPost, userDelete,
    userPatch
}
