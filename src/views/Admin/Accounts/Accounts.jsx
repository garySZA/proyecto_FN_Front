import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { Table } from '../../../components/Table/Table';
import AccountService from '../../../services/Admin/accountService'
import { defaultFilters, defaultResult } from '../../../helpers/defaultValues';
import { StateContext } from '../../../context/stateProvider';
import { ToastContainer, toast } from 'react-toastify';
import { headerTableAccountsAdmin } from '../../../helpers/tableContents';

export const Accounts = () => {
    const [filters, setFilters] = useState({ ...defaultFilters });
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const { dispatch } = useContext( StateContext )

    const getItems = useMutation(
        () => AccountService.getAll( filters )
    );
    
    const handleChangeStatus = async ( id ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await AccountService.changeStatus(id)
            .then( response => {
                setIsUpdated(true);
                dispatch({ type: 'showModalScreen', payload: false });
                dispatch({ type: 'setDataModal', payload: {} });

                toast.success(`Cuenta ${ response.user.status ? 'habilitada' : 'deshabilitada' }`)
            })
            .catch( reason => {
                console.log(reason)
            })
            .finally( () => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    const handleEditAccount = ( item ) => {
        const { uid } = item;
        
        navigate(`${path}/${uid}`)
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
                    <div className="col col-md-10 mx-auto">
                        <h2 className='text-letters'>Cuentas Registradas</h2>
                        <hr />
                        <Table 
                            deleteFunc={ handleChangeStatus } 
                            getItems={ getItems }
                            filters={ filters }
                            setFilters={ setFilters }
                            editFunc={ handleEditAccount }
                            isUpdated={ isUpdated }
                            setIsUpdated={ setIsUpdated }
                            headers = { headerTableAccountsAdmin }
                            options
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
