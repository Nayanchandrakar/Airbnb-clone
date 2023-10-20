'use client'
import { create } from 'zustand'

interface SearchTypes {
    isOpen: boolean,
}

interface SearchActions {
    closeSearchModal: () => void,
    openSearchModal: () => void,
}

const useSearchModal = create<SearchTypes & SearchActions>((set) => ({
    isOpen: false,
    closeSearchModal: () => set((state) => ({ isOpen: false })),
    openSearchModal: () => set((state) => ({ isOpen: true })),
}))

export default useSearchModal