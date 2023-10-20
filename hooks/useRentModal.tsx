'use client'
import { create } from 'zustand'

interface RentTypes {
    isOpen: boolean,
}

interface RentActions {
    closeRentModal: () => void,
    openRentModal: () => void,
}

const useRentModal = create<RentTypes & RentActions>((set) => ({
    isOpen: false,
    closeRentModal: () => set((state) => ({ isOpen: false })),
    openRentModal: () => set((state) => ({ isOpen: true })),
}))

export default useRentModal