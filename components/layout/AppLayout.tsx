import * as React from "react"


import { Header } from "./Header";
import Meta from "../meta/Meta";
import Footer from "./Footer"

interface Props {
    title: string;
    description: string;
    children: React.ReactNode;
}

export default function AppLayout({ title, description, children }: Props) {
    return (
        <div>
            <Header />
            <Meta title={title} description={description} />
            {children}
            <Footer />
        </div>
    )
}