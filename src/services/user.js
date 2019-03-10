module.exports = app => {
    const findAll = () => {
        return app.db('users').select();
    };

    const save = (user) => {

        if(!user.name) return { error: "Name é um atributo obrigatório" };
        if(!user.email) return { error: "Email é um atributo obrigatório" };
        if(!user.password) return { error: "Password é um atributo obrigatório" };

        return app.db('users').insert(user, '*')
    };

    return { findAll, save };
};