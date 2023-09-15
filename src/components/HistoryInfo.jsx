import React from 'react';
import moment from 'moment/moment';
import 'moment/locale/es';

import { getLabelGender } from '../helpers/getLabels';

export const HistoryInfo = ({ client, history, historyItems, isClient }) => {
    return (
        <>
            <div className="col-12 col-md-6 col-lg-4 text-letters d-flex flex-column my-3 ms-lg-4">
                <h3>Datos { isClient ? 'Personales' : ' del paciente' }</h3>
                <strong>Paciente:</strong> { client.first_name } { client.last_name }
                <strong>Fecha de nacimiento:</strong> { moment.utc(client.date).format('l') }
                <strong>Género:</strong> { getLabelGender( client.gender ) }
            </div>
            <div className="col-12 col-md-6 col-lg-4 text-letters d-flex flex-column my-3">
                <h3>Datos del historial</h3>
                <strong>Código:</strong> { history._id || 'id' }
                <strong>Fecha de creación:</strong> { moment(history.createdAt).locale('es').fromNow() }, { moment(history.createdAt).locale('es').format('LLL') }
                <strong>Número de elementos:</strong> { historyItems.length }
            </div>
        </>
    )
}
