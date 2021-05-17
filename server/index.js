const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const pool = require( './db' );

app.use( cors() );
app.use( express.json() );

app.get( "/todos", async ( request, response, next ) => {
  try {
    await pool.query( 'SELECT * FROM todo', ( err, res ) => {
      response.json( res.rows );
    } );
  } catch ( error ) {
    return next( error );
  }
} );

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

app.put( "/todos/:id", ( request, response, next ) => {
  try {
    const { id } = request.params;
    const keys = [ 'name', 'description', 'completed' ];
    const fields = [];

    keys.forEach( key => {
      if ( request.body[ key ] ) {
        fields.push( key );
      }
    } );

    fields.forEach( ( field, index ) => {
      pool.query(
        `UPDATE todo SET ${field}=($1) WHERE id=($2)`,
        [ request.body[ field ], id ],
        ( err, res ) => {
          if ( err ) return next( err );

          if ( index === fields.length - 1 ) response.json( { data: { success: "true", id: id } } );
        }
      );
    } );
  } catch ( error ) {
    return next( error );
  }
} );

app.delete( "/todos/:id", async ( request, response, next ) => {
  try {
    const { id } = request.params;
    const { subtasksIds } = request.body;

    await pool.query( 'DELETE FROM todo WHERE id=($1)', [ id ], ( err, res ) => {
      if ( err ) return next( err );

      console.log( subtasksIds );
      if ( subtasksIds ) {
      subtasksIds.forEach( id => {
        pool.query(
          'DELETE FROM subtasks WHERE id=($1)', [id],
          ( err, res ) => {
            if ( err ) return next( err );
          }
        )
      })
      }
    } );
    response.json( { data: { success: "true", id: id } } );
  } catch ( error ) {
    return next( error );
  }
} );

app.listen( 5000, () => {
  console.log( "server has started on port 5000" );
} );