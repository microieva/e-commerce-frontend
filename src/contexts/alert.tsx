import { FC, ReactNode, createContext, useEffect, useState } from "react"
import { Backdrop, Dialog } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Alert, TypeAlertContext } from "../@types/types";
import AlertComponent from "../components/shared/alert";

interface Props {
    children: ReactNode
}

export const AlertContext = createContext({} as TypeAlertContext);

export const AlertProvider: FC<Props> = ({children}: Props) => {
    const [ alertInfo, setAlertInfo ] = useState<Alert>({ text: '', open: false, action:null});
    const [ isConfirming, setIsConfirming ] = useState<string | null>(null);

      const setAlert = (alertInfo: Alert) => {
        setAlertInfo(alertInfo);
      };
      const handleCancel =() => {
        setAlertInfo({...alertInfo, open:false, action: null});

      }
      const handleConfirm = () => {
        alertInfo.action && setIsConfirming(alertInfo.action);
      }

      useEffect(()=> {
        if (alertInfo.action === null) {
            setIsConfirming(null);
        }
      }, [alertInfo])


  return (
    <AlertContext.Provider value={{alertInfo, setAlert, isConfirming}}>
        {children}
        <>
            <Dialog fullWidth open={alertInfo.open} onClose={handleCancel} >
                <AlertComponent 
                    text={alertInfo.text}
                    handleCancel={handleCancel} 
                    handleConfirm={handleConfirm}
                />
            </Dialog>
            <Backdrop open={alertInfo.open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
            <Outlet />
        </>
    </AlertContext.Provider>
  )
}