import {useMemo} from "react";

export const useFormatCurrency = (amount: number | undefined | null) => {
    return useMemo(() => {
       

        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    }, [amount]);
}



