import React from 'react'
import { CircularProgress } from '@mui/material';
import { StyledLoading } from './Style';

function LoadingCom() {
    return (
        <StyledLoading>
            <CircularProgress size="40" />
        </StyledLoading>
    )
}

export default LoadingCom
