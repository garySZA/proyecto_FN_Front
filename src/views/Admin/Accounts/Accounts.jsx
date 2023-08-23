import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa'

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
    
    const handleChangeStatus = async ( element ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await AccountService.changeStatus(element.uid, { status: !element.status })
            .then( response => {
                setIsUpdated(true);

                toast.success(`Cuenta ${ response.user.status ? 'deshabilitada' : 'habilitada' }`)
            })
            .catch( reason => {
                console.log(reason)
                toast.error(reason.response.data.msg);
            })
            .finally( () => {
                dispatch({ type: 'showModalScreen', payload: false });
                dispatch({ type: 'setDataModal', payload: {} });
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    const handleEditAccount = ( item ) => {
        const { uid } = item;
        
        navigate(`${path}/${uid}`)
    }

    const handleCreateAccount = () => {
        navigate('create_account');
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
                        <div className='d-flex'>
                            <h2 className='text-letters'>Cuentas Registradas</h2>
                            <button
                                className='ms-auto btn btn-letters text-primary rounded-fill'
                                onClick={ handleCreateAccount }
                            >
                                <FaUserPlus size={20} title='Crear cuenta'/>
                            </button>
                        </div>
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
