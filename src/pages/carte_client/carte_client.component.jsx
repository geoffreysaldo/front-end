import React from 'react';
import Paper from '@material-ui/core/Paper'
import './carte_client.styles.scss'

export default function CarteClient(props){
    return(
        <Paper style={{display:'flex',flexDirection:'row',justifyContent:'center',width:'100%',height:'70px',margin:'5px',background:'linear-gradient(#343333, #090909)',color:'white',fontWeight:'bold'}}>
            <div className="identite" >
                <div className="info">{props.nom} {props.prenom}</div>
                <div className="info">{props.dateNaissance}</div>
            </div>
            <div className="adresse">
                <div className="info">{props.adresse} - {props.codePostal}</div>
                <div className="info">{props.ville}</div>
            </div>
            <div className="contact">
                <div className="info">{props.telephone}</div>
                <div className="info">{props.email}</div>
            </div>
        </Paper>
    )
}