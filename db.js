const Pool = require("pg").Pool;

const pool = new Pool(
    {
        host : "localhost",
        port : "5432",
        user : "postgres",
        password : "password",
        database : "postgres"
    }
)

const createUserTable = () => {
    return pool.query('create table if not exists users_table(id serial primary key, firstname varchar(30), lastname varchar(30), username varchar(20), password varchar(8), role varchar(10))', (err ,result) => {
        if (err)
        {
            console.log("Err : ", err)
        }
        // console.log("Response", result)
    })
}

const createProductTable = () => {
    return pool.query('create table if not exists products_table(id serial primary key, product_name varchar(30), price int, qty int)', (err ,result) => {
        if (err)
        {
            console.log("Err : ",err)
        }
    })
}

const addUser = async (userId, firstname, lastname, username, password, role) => {
    let response;
    const query = pool.query(`insert into users_table(id, firstname, lastname, username, role) values*${userId}, ${firstname}, ${lastname}, ${username}, ${password}, ${role}`, (err, result) => {
        if (err)
        {
            console.log(err);
            response = false;
        }
        console.log("User ", result);
        response = true;
    })
    return response;
}
const deleteTable = async () => {
    try {
      const client = await pool.connect();
      const query = 'DROP TABLE IF EXISTS users_table';
      await client.query(query);
      client.release();
      console.log('Table deleted successfully');
    } catch (error) {
      console.error('Error deleting table:', error);
    } finally {
      pool.end();
    }
};

createUserTable();
createProductTable();
// deleteTable();
module.exports = pool;