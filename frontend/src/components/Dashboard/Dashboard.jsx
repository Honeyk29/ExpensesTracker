import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/layouts';
function Dashboard() {
  return (
    <DashboardStyled>
      <InnerLayout>
        Dashboard
      </InnerLayout>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`

`;

export default Dashboard
