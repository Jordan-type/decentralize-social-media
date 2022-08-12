import * as React from 'react';

import { useCelo } from "@celo/react-celo";
import { useEffect, useState } from "react";

import web3 from "web3";
import { Grid, Typography } from '@mui/material';



export function AccountInfo() {
    const { kit, address, network } = useCelo();
    const [loadingBalance, setLoadingBalance] = useState(true)


    return (
        <Grid>
            <Typography>
                Select base currency for display:
            </Typography>

        </Grid>
    )

}