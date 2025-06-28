import { store } from "@/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

interface props {
    children: ReactNode;
}

const Providers = ({ children }: props) => {
    return <Provider store={store}>{children}</Provider>
}

export default Providers;