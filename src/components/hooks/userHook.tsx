import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const userHook = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()

    
    return { user }
}

export default userHook;
