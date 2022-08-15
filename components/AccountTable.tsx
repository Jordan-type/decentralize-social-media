import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Tab } from '@mui/material';
import * as React from 'react'


export enum BaseCurrency {USD = "cUSD", EUR = "cEUR", ETH = "ETH", CELO = "CELO" }

type AccountDataEntry = {
    token: BaseCurrency;
    balance: number;
    value: number;
    exchange: number;
    baseCurrency: BaseCurrency;
};

function formatSmallValue(value: number) : string {
    if (value < 1e-8) return `${(value * 1e9).toFixed(3)} n`;
    if (value < 1e-5) return `${(value * 1e6).toFixed(3)} μ`;
    if (value < 1e-2) return `${(value * 1e3).toFixed(3)} m`;
    return value.toFixed(3) + " ";
}


// format values
function formatValue(value: number, currency: BaseCurrency): string {
    if (currency === BaseCurrency.USD) return `$${value?.toFixed(2) || "0.00"}`;
    if (currency === BaseCurrency.EUR) return `€${value?.toFixed(2) || "0.00"}`;
    if (currency === BaseCurrency.ETH) return `${value < 0.01 ? formatSmallValue(value) : value?.toFixed(2) || "0.00" + " "}ETH`;
    return `${value?.toFixed(2) } CELO`;
}


const AccountTable: React.FC<{accountsData: AccountDataEntry[]}> = ({accountsData}) => (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Token</TableCell>
                    <TableCell align="right">Balance</TableCell>
                    <TableCell align="right">Estimated Value</TableCell>
                    <TableCell align="right">Estimated Exchange</TableCell>
                </TableRow>
            </TableHead>
        <TableBody>
            {accountsData.map((accountData) => (
                <TableRow key={accountData.token} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                        {accountData.token}
                    </TableCell>
                    <TableCell align="right">{accountData.balance < 0.01 ? formatSmallValue(accountData.balance) : accountData.balance.toFixed(2) + " "}{accountData.token}</TableCell>
                    <TableCell align="right">{formatValue(accountData.value, accountData.baseCurrency)}</TableCell>
                    <TableCell align="right">{formatValue(accountData.exchange, accountData.baseCurrency)} / {accountData.token} </TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
)

export default AccountTable;