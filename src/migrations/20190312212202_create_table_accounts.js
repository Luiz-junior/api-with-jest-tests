
exports.up = (knex, Promise) => {
    return knex.schema.createTable('accounts', (t) => {
        t.increments('id').primary();
        t.string('name').notNull();
        t.integer('user_id')
            .references('id')
            .inTable('users')
            .notNull()
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('accounts')
};
