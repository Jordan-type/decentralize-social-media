import * as React from 'react';
import { useCelo } from "@celo/react-celo";
import { AppBar, Box, Button, Chip, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { truncateAddress } from '../../utils';


function AccountDetails() {
  const { connect, destroy, network, address } = useCelo();
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))


    return(
      <>
      {network && <Chip label={network.name} color='secondary' />}

      {address && (
        <>
        <Chip label={ truncateAddress(address)} color='info' onDelete={destroy} sx={{ mx: 1 }} />
        {!isMobile ? (
        <Button variant="outlined" color="inherit" onClick={destroy}>
          Disconnect
        </Button>
        ) : (
          ""
        )}
        </>
      )}
      {!address && (
         <Button color='inherit' variant='outlined' onClick={() => connect().catch(e => console.log(e))}>Connect Wallet</Button>
      )}
    </>
  )
}


export function Header() {
  const theme = useTheme()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <>
      <AppBar position="static" >
        <Toolbar sx={{ gap: { md: 2, xs: 0.5 } }}>
          <AccountDetails />
        </Toolbar>
      </AppBar>
      </>
    </Box>
  )
}