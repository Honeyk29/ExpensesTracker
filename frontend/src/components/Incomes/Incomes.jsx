import React from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/layouts';
import { useGlobalContext } from '../../context/globalContext';
import Forms from '../Forms/Forms';
function Incomes() {
    const {addIncome} = useGlobalContext();
    return (
        <IncomesStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <div className="income-content">
                    <div className="form-container">
                        <Forms/>
                    </div>
                    <div className="incomes">
                        
                    </div>
                </div>
            </InnerLayout>
        </IncomesStyled>
    )
}
const IncomesStyled = styled.div`

`;
export default Incomes
