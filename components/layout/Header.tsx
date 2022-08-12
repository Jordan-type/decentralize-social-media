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

      {address ? (
        <Chip label={ truncateAddress(address)} color='info' onDelete={destroy} sx={{ mx: 1 }} />
         ) : (
         <Button color='inherit' variant='outlined' onClick={() => connect().catch(e => console.log(e))}>Connect Wallet</Button>
         )}
      </>
    );
}


export function Header() {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <AccountDetails />
        </Toolbar>
      </AppBar>
    </Box>

  )
}