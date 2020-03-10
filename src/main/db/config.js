module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB,
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB,
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB,
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};
