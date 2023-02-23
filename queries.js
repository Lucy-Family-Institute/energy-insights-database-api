const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'students',
  host: 'nd-energy-insights-db.cppnblksupih.us-east-1.rds.amazonaws.com',
  database: 'lucyaetl',
  password: 'nd_energy_insights_student',
  port: 5432,
}
)

const getEnergyData = (request, response) => {
  const id = request.query.id;
  const typeid = request.query.typeid
  const BDate = request.query.BDate;
  const EDate = request.query.EDate;
  console.log("id :", id);
  console.log("typeid :", typeid);
  console.log("EDate :", EDate);
  console.log("BDate :", BDate);

  pool.query('Select timestamp as date, asset_property_value as metric from assetpropertyupdates where asset_property_quality  = \'GOOD\' and asset_id = $1 and asset_property_id = $2 and timestamp between $3 and $4  ',
  [id,typeid,BDate,EDate], (error, results) => {  
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

//Below are only examples.... for future use.

// const getUsers = (request, response) => {
//   pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

// const getEnergyData = (request, response) => {
//   const id = request.params.id;
//   pool.query('Select  asset_id, timestamp, asset_property_value from assetpropertyupdates where asset_id = $1 and timestamp between $2 and $3 limit 200',
//   ["f36a8620-81b4-4226-8cef-791164415292","01/25/2023","01/26/2023"], (error, results) => {
  
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

// const createUser = (request, response) => {
//   const { name, email } = request.body;

//   pool.query(
//     'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
//     [name, email],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(201).send(`User added with ID: ${results.rows[0].id}`);
//     }
//   );
// };

// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id);
//   const { name, email } = request.body;

//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(`User modified with ID: ${id}`);
//     }
//   );
// };

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(`User deleted with ID: ${id}`);
//   });
// };

module.exports = {
  // getUsers,
  getEnergyData,
  // createUser,
  // updateUser,
  // deleteUser,
};
