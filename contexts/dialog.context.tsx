interface DialofgContextProps {
    openedDialogs: string[];
    openDialog: (dialogId: string) => void;
    closeDialog: (dialogId: string) => void;
}

import { createContext, useContext, useState } from 'react';

const DialogContext = createContext<DialofgContextProps | undefined>(undefined);
export const useDialogContext = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialogContext must be used within a DialogProvider');
    }
    return context;
};
export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [openedDialogs, setOpenedDialogs] = useState<string[]>([]);

    const openDialog = (dialogId: string) => {
        setOpenedDialogs((prev) => [...prev, dialogId]);
    };

    const closeDialog = (dialogId: string) => {
        setOpenedDialogs((prev) => prev.filter((id) => id !== dialogId));
    };

    return (
        <DialogContext.Provider value={{ openedDialogs, openDialog, closeDialog }}>
            {children}
        </DialogContext.Provider>
    );
};
export const useDialog = (dialogId: string) => {
    const { openedDialogs, openDialog, closeDialog } = useDialogContext();

    const isOpen = openedDialogs.includes(dialogId);

    return {
        isOpen,
        open: () => openDialog(dialogId),
        close: () => closeDialog(dialogId),
    };
};


export enum DialogEnum {
    ORDER_PRODUCT= 'ORDER_PRODUCT',
    PRODUCT_DETAIL= 'PRODUCT_DETAIL',
}