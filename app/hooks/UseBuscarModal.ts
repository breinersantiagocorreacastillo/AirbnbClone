
import {create} from 'zustand';

interface BuscarModalStore{
    isOpen:boolean;
    onOpen: ()=> void;
    onClose: () => void;
}

const useBuscarModal = create<BuscarModalStore>((set) =>({
  isOpen: false,
  onOpen: () =>set({ isOpen:true}),
  onClose: () => set({isOpen: false}),
})); 
export default useBuscarModal;