import { Slide, Snackbar } from "@mui/material";
import { FC, ReactNode, createContext, useState } from "react"
import { Snack, TypeSnackBarContext } from "../@types/types";

interface Props {
    children: ReactNode
}

export const SnackBarContext = createContext({} as TypeSnackBarContext);

export const SnackBarProvider: FC<Props> = ({children}: Props) => {
    const [ snack, setSnack ] = useState<Snack>({
        message: '',
        color: '',
        open: false,
      });
      const setSnackBar = (snack: Snack) => {
        setSnack(snack);
        setTimeout(() => {
            setSnack({...snack, open: false});
        }, 4000);
      };

  return (
    <SnackBarContext.Provider value={{snack, setSnackBar}}>
        {children}
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={snack.open}
            message={snack.message}
            TransitionComponent={Slide}
        />
    </SnackBarContext.Provider>
  )
}