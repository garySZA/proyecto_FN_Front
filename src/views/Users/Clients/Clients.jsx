import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import ClientService from '../../../services/User/clientService';
import { TableClients } from '../../../components/Table/TableClients';
import { defaultFilters } from '../../../helpers/defaultValues';
import { headerTableClientsUser } from '../../../helpers/tableContents';
import { StateContext } from '../../../context/stateProvider';

export const Clients = () => {
    const [filters, setFilters] = useState({ ...defaultFilters })
    const [isUpdated, setIsUpdated] = useState(false)
    const { dispatch } = useContext(StateContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const getItems = useMutation(
        () => ClientService.getAll( filters )
    );
    
    const handleCreateHistory = ( element ) => {
        const { uid } = element;
        
        dispatch({ type: 'showLoaderScreen', payload: true });

        ClientService.createHistory({idClient: uid})
            .then((response) => {
                toast.success('Historial creado')
                setIsUpdated( !isUpdated );
            })
            .catch((reason) => {
                toast.error(reason.response.data.msg)
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    const handleViewHistory = ( element ) => {
        const { uid } = element;
        navigate(`${pathname}/${ uid }`);
    }
    
    const generateDropOptions = ( item ) => {
        const optionsDrop = [
            {
                label: 'Crear historial',
                action: handleCreateHistory,
                state: item.history ? false : true
            },

            {
                label: 'Ver historial',
                action: handleViewHistory,
                state: !item.history ? false : true
            },
        ]
    
        return optionsDrop;
    }

    return (
        <>
            <div className='container'>
                <ToastContainer 
                    position='top-right'
                    autoClose= { 5000 }
                    hideProgressBar={ false }
                    newestOnTop={ false }
                    closeOnClick
                    rtl={ false }
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-letters">
                            Clientes Registrados
                        </h2>
                        <hr />
                        <TableClients 
                            getItems={ getItems }
                            filters={ filters }
                            setFilters={ setFilters }
                            isUpdated={ isUpdated }
                            setIsUpdated={ setIsUpdated }
                            headers={ headerTableClientsUser }
                            optionsDrop={ generateDropOptions }
                            createHistory={ handleCreateHistory }
                        />
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </>
    )
}
