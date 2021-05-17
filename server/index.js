const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const pool = require( './db' );

app.use( cors() );
app.use( express.json() );

app.post( "/todos", async ( request, response, next ) => {
  try {
    const { id, name, description, completed, subtasksIds, subtasks } = request.body;
    await pool.query(
      'INSERT INTO todo(id, name, description, completed, subtasks) VALUES($1, $2, $3, $4, $5)',
      [ id, name, description, completed, subtasksIds ],
      ( err, res ) => {
        if ( err ) return next( err );
      }
      )
      if ( subtasks ) {
      subtasks.forEach( task => {
        pool.query(
          'INSERT INTO subtasks(id, description, completed) VALUES($1, $2, $3)',
          [ task.id, task.description, task.completed ],
          ( err, res ) => {
            if ( err ) return next( err );
          }
        )
      })
      }
    response.json( { data: { success: "true", id: id, task: name, description: description, subtasks: {...subtasks} } } );
  } catch ( error ) {
    console.log( error );
  };
} );

app.listen( 5000, () => {
  console.log( "server has started on port 5000" );
} );