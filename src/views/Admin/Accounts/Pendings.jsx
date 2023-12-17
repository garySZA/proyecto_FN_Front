import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { TablePendings } from '../../../components/Table/TablePendings'
import { defaultFilters } from '../../../helpers/defaultValues'
import { useMutation } from '@tanstack/react-query'
import { headerTablePendingsAdmin } from '../../../helpers/tableContents'
import AccountService from '../../../services/Admin/accountService'
import { StateContext } from '../../../context/stateProvider'

export const Pendings = () => {
    const [filters, setFilters] = useState({ ...defaultFilters });
    const [isUpdated, setIsUpdated] = useState(false);
    const { dispatch } = useContext( StateContext );
    const getItems = useMutation(
        () => AccountService.getPendings( filters )
    );
    
    const handleChangePending = async ( element ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await AccountService.changePending({ id: element.uid,  pending: !element.pending })
            .then( response => {
                toast.success(`Cuenta ${ response.user.pending ? 'rechazada' : 'aprobada' }`)
                setIsUpdated(true);
            })
            .catch( reason => {
                console.log(reason)
                toast.error(reason.response.data.msg);
            })
            .finally( () => {
                dispatch({ type: 'showLoaderScreen', payload: false });                
            })
    }

    const handleRejectAccount = async ( element ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await AccountService.changePending({ id: element.uid,  pending: element.pending })
            .then( response => {
                toast.success('Cuenta Rechazada')
                setIsUpdated(true);
            })
            .catch( reason => {
                console.log(reason)
                toast.error(reason.response.data.msg);
            })
            .finally( () => {
                dispatch({ type: 'showLoaderScreen', payload: false });                
            })
    }
    
    const generateDropOptions = ( item ) => {
        const dropOptions = [
            {
                label: 'Aprobar cuenta',
                action: handleChangePending,
                state: true
            },
            {
                label: 'Rechazar cuenta',
                action: handleRejectAccount,
                state: true
            },
        ]

        return dropOptions;
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
                        <h2 className='text-letters'>Cuentas Pendientes</h2>
                    </div>
                    <hr />
                    <TablePendings 
                        changePending={ handleChangePending }
                        filters={ filters }
                        getItems={ getItems }
                        headers={ headerTablePendingsAdmin }
                        isUpdated={ isUpdated }
                        options
                        optionsDrop={ generateDropOptions }
                        setFilters={ setFilters }
                        setIsUpdated={ setIsUpdated }
                        showSearch
                    />
                </div>
            </div>
        </div>
        </>
    )
}
