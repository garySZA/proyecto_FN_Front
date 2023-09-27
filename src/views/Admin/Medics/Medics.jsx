import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Table } from '../../../components/Table/Table';
import { defaultFilters } from '../../../helpers/defaultValues';
import MedicService from '../../../services/Admin/medicService';
import { headerTableMedicsAdmin } from '../../../helpers/tableContents';

export const Medics = () => {
    const [filters, setFilters] = useState({ ...defaultFilters })
    const getItems = useMutation(
        () => MedicService.getAll( filters )
    );
    
    return (
        <div className="container">
            <div className="row">
                <div className="col col-md-12 mx-auto">
                    <h2 className='text-letters'>Médicos Registrados</h2>
                    <hr />
                    <Table 
                        getItems={ getItems }
                        filters={ filters }
                        setFilters={ setFilters }
                        options={ false }
                        headers={ headerTableMedicsAdmin }
                    />
                </div>
            </div>
        </div>
    )
}
