import React, { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'

import ContactService from '../../../services/Admin/contactService'
import { defaultFilters } from '../../../helpers/defaultValues'
import { headerTableContactsAdmin } from '../../../helpers/tableContents'
import { TableContacts } from '../../../components/Table/TableContacts'
import { StateContext } from '../../../context/stateProvider'

export const Contacts = () => {
    const [filters, setFilters] = useState({ ...defaultFilters })
    const [dataUpdated, setDataUpdated] = useState(false);
    const { dispatch } = useContext( StateContext );

    const getItems = useMutation(
        () => ContactService.getAll( filters )
    );
    
    const handleClickSendEmail = ( item ) => {
        window.open(`mailto:${item.emailClient}`, '_blank');
    };

    const handleChangeStatus = ( item ) => {
        const { status, id } = item;
        const data = { status: !status }

        dispatch({ type: 'showLoaderScreen', payload: true });

        ContactService.changeStatus( id, data )
            .then( response => {
                toast.success('Estado cambiado');
                setDataUpdated(!dataUpdated)
            })
            .catch( reason => {
                toast.error('Error al cambiar estado');
            })
            .finally( () => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    return (
        <>
            <div className="container">
                <ToastContainer 
                    position='top-right'
                    autoClose={ 5000 }
                    hideProgressBar={ false }
                    newestOnTop={ false }
                    closeOnClick
                    rtl={ false }
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="row">
                    <div className="col col-md-12 mx-auto">
                        <div className="d-flex">
                            <h2 className='text-letters'>Contactos Registrados</h2>
                        </div>
                        <hr />
                        <TableContacts
                            getItems={ getItems }
                            filters={ filters }
                            setFilters={ setFilters }
                            headers={ headerTableContactsAdmin }
                            sendEmail={ handleClickSendEmail }
                            changeStatus={ handleChangeStatus }
                            isDataUpdated={ dataUpdated }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
