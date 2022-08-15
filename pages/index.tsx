import * as React from "react";
import { Box } from "@mui/material";

import AppLayout from '../components/layout/AppLayout';
import Profiles from "../components/profiles";
import { AccountInfo } from "../components/AccountInfo";


export default function Home() {

  return (
    <AppLayout title='Celo Decentralized Social' description='A decentralized social network built on the Celo Blockchain.'>
       <Box>
       <Profiles />
       <AccountInfo/>

       </Box>
    </AppLayout>
    
  // <div className="grid grid-cols-3 divide-x">
  //     <AccountDetails />
  //     <div className="col-span-3">
  //       <div className="px-4 py-8">
  //         <h1 className="text-3xl font-bold leading-tight text-center">
  //           Decentralized Social Network - Lens protocol
  //         </h1>
  //         <p className="text-center">
  //           This is a decentralized social network built on the Celo Blockchain.
  //         </p>
  //       </div>
  //     </div>

  //   </div>
  );
}
