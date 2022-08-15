import * as React from 'react';
import { useCelo } from "@celo/react-celo";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, CircularProgress, Grid, Typography } from '@mui/material';
import redstone from 'redstone-api'
import web3 from "web3";


import AccountTable, { BaseCurrency } from './AccountTable';


// function get prices from redstone api
async function getPrices() {
    try {
        return {
            CELO: await redstone.getPrice("CELO"),
            EUR: await redstone.getPrice("EUR"),
            ETH: await redstone.getPrice("ETH")
        }
    } catch (error) {
        return {
            CELO: 0,
            EUR: 0,
            ETH: 0,
        }
    }
}


export function AccountInfo() {
    const { kit, address, network } = useCelo();
    const [loadingBalance, setLoadingBalance] = useState(true)
    const [baseCurrency, setBaseCurrency] = useState(BaseCurrency.USD)

    const [balance, setBalance] = useState({
        CELO: { raw: "0", base: 0, exchange: 1, },
        cEUR: { raw: "0", base: 0, exchange: 1, },
        cUSD: { raw: "0", base: 0, exchange: 1, },
        cREAL: {raw: "0",},
    })


    // fetch balance
    // cusd, ceur, celo, real
    async function fetchBalance() {
        const { CELO, cUSD, cEUR, cREAL } = await kit.getTotalBalance(address)
        
        const celoAmount = web3.utils.fromWei(CELO.toString(), "ether")
        const ceurAmount = web3.utils.fromWei(cEUR.toString(), "ether")
        const cusdAmount = web3.utils.fromWei(cUSD.toString(), "ether") 

        // price 
        const { CELO: celoUsdPrice, EUR: eurUsdPrice, ETH: ethUsdPrice } = await getPrices()
        const scale =
        baseCurrency === BaseCurrency.USD
          ? 1
          : baseCurrency === BaseCurrency.EUR
          ? 1.0 / eurUsdPrice.value
          : baseCurrency === BaseCurrency.ETH
          ? 1.0 / ethUsdPrice.value
          : 1.0 / celoUsdPrice.value;
                
        setBalance({
            CELO: {
              raw: web3.utils.fromWei(CELO.toString(), "ether"),
              base: celoUsdPrice.value * +celoAmount * scale,
              exchange: celoUsdPrice.value * scale,
            },
            cEUR: {
              raw: web3.utils.fromWei(cEUR.toString(), "ether"),
              base: eurUsdPrice.value * +ceurAmount * scale,
              exchange: eurUsdPrice.value * scale,
            },
            cUSD: {
              raw: web3.utils.fromWei(cUSD.toString(), "ether"),
              base: +cusdAmount * scale,
              exchange: scale,
            },
            cREAL: {
              raw: web3.utils.fromWei(cREAL.toString(), "ether"),
            },
          });
          setLoadingBalance(false);
    }

    useEffect(() => {
        if (address) {
          setLoadingBalance(true);
          fetchBalance();
        }
      }, [network, address, baseCurrency])

    const addressLink = `${network.explorer}/address/${address}`

    return (
        <Grid container justifyContent="left">
            <Grid item sm={12} xs={12} sx={{ m: 2 }}>
                <Typography variant='h6'>Balance:</Typography>
                {loadingBalance ? (
                    <CircularProgress />
                ) : (
                <AccountTable
                   accountsData={[
                    {
                        token: BaseCurrency.CELO,
                        balance: +balance.CELO.raw,
                        value: +balance.CELO.base,
                        exchange: balance.CELO.exchange,
                        baseCurrency,
                    },
                    {
                        token: BaseCurrency.USD,
                        balance: +balance.cUSD.raw,
                        value: +balance.cUSD.base,
                        exchange: balance.cUSD.exchange,
                        baseCurrency,
                    },
                    {
                        token: BaseCurrency.EUR,
                        balance: +balance.cEUR.raw,
                        value: +balance.cEUR.base,
                        exchange: balance.cEUR.exchange,
                        baseCurrency,
                    }

                ]}
            />
            )}
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                {[
                    BaseCurrency.USD,
                    BaseCurrency.EUR,
                    BaseCurrency.ETH,
                    BaseCurrency.CELO
                ].map((currency) => (
                    <Button
                       key={currency}
                       onClick={() => setBaseCurrency(currency)}
                       variant={currency === baseCurrency ? "contained" : undefined}>
                        {currency}
                    </Button>
                ))}
            </ButtonGroup>
            </Grid>
        </Grid>
    )

}