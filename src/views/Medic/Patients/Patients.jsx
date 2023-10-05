import React, { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { TableValorations } from '../../../components/Table/TableValorations';
import { headerTableValorationsMedic } from '../../../helpers/tableContents';
import { defaultFilters } from '../../../helpers/defaultValues';
import { AuthContext } from '../../../context/AuthContext';
import ValorationsService from '../../../services/Medic/valorationsService';

export const Patients = () => {
    const { user } = useContext( AuthContext );
    const { pathname } = useLocation();
    const [filters, setFilters] = useState({ ...defaultFilters });
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();

    const getItems = useMutation(
        () => ValorationsService.getAll( filters )
    );

    const handleViewValoration = (item) => {
        const { item: { id }, patient: { uid } } = item;
        navigate(`${ pathname }/${ uid }/item/${ id }`);
    }

    const generateDropOptions = ( item ) => {
        const dropOptions = [
            {
                label: 'Ver valoración',
                action: handleViewValoration,
                state: true
            }
        ]

        return dropOptions;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col col-md-10 mx-auto">
                    <div className="d-flex">
                        <h2 className='text-letters'>Items valorados</h2>
                    </div>
                    <hr />
                    {
                        !user.pending ? (
                            <TableValorations 
                                headers={ headerTableValorationsMedic }
                                filters={ filters }
                                setFilters={ setFilters }
                                getItems={ getItems }
                                isUpdated={ isUpdated }
                                setIsUpdated={ setIsUpdated }
                                optionsDrop={ generateDropOptions }
                            />
                        ) : (
                            <p>Tu cuenta aún no ha sido autorizada, por favor intenta mas tarde.</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
