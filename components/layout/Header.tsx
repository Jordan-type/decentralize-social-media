import * as React from 'react';
import { useCelo } from "@celo/react-celo";
import { AppBar, Box, Button, Chip, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';

import { useThemeContext } from '@/contexts/userTheme';
import { ThemeSwitcher } from '../ThemeSwitcher';
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
  const { theme: themeContext, setTheme } = useThemeContext()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isMobile ? (
        <>
        <AppBar position="static">
          <Toolbar sx={{ gap: { md: 2, xs: 0.5 } }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Celo Decentralized Social
            </Typography>
            <ThemeSwitcher
                sx={{ m: 1 }}
                onChange={e => setTheme(e.target.checked)}
                checked={themeContext}
              />
          </Toolbar>
        </AppBar>
        <AppBar color="primary" sx={{ top: "auto", bottom: 0 }}>
            <Toolbar sx={{ gap: { md: 2, xs: 0.5 } }}>
              <AccountDetails />
            </Toolbar>
          </AppBar>
        </>
      ) : (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Celo Decentralized Social
            </Typography>
            <AccountDetails />
            <ThemeSwitcher
               sx={{ m: 1}}
               onChange={e => setTheme(e.target.checked)}
               checked={themeContext} />
          </Toolbar>
        </AppBar>
      )}
    </Box>
  )
}