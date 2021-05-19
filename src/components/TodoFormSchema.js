import * as Yup from 'yup';


export const TodoFormSchema = Yup.object().shape( {
  name: Yup.string()
    .min( 2, 'Length must be at least 2' )
    .max( 30, 'Length must be less than 30' )
    .required( 'Required' ),
  description: Yup.string()
    .min( 5, 'Length must be at least 5' )
    .max( 150, 'Length must be less than 150' ),
  description: Yup.string()
    .min( 2, 'Too Short' )
    .max( 300, 'Too Long' ),
} );