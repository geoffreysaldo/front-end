import React from 'react';
import Paper from '@material-ui/core/Paper';
import FormParameter from '../../components/form-parameter/form_parameter.component'
import './inscription.styles.scss'
const Inscription = () => {


  return (
    <div className="pageInscription">
    <Paper className="paperInscription">
        <div className="panneau">
            Salut
        </div>
        <FormParameter/>
    </Paper>
    </div>
  );
}


export default Inscription