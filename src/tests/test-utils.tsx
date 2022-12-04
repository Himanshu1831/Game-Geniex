import { render } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query"

const queryClient = new QueryClient();

const AllProviders = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

const customRender = (ui) => {
    return render(ui, {wrapper: AllProviders}); 
}

export * from '@testing-library/react'

export { customRender as render }