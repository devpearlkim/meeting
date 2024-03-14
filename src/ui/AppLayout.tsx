import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const HeaderStyle = styled.div`
  position: fixed;
  background-color: white;
  z-index: 1000;
  width: 100%;
`

const MainContent = styled.div`
  flex: 1;
`

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <HeaderStyle>
        <Header />
      </HeaderStyle>
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </StyledAppLayout>
  )
}

export default AppLayout
