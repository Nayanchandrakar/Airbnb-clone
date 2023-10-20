'use client'
import NullState from '@/components/shared/NullState'
import React from 'react';


interface ErrorState {
    error: Error
}

const Error: React.FC<ErrorState> = ({ error }) => {

    React.useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <NullState
            title='Uh Oh'
            subtitle='Something went wrong!'
        />
    )
}

export default Error