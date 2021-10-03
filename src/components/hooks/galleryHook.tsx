import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GalleryState } from '../../redux/module/gallery/type';
import { ADDIMAGE } from '../../redux/module/gallery/gallery';

const galleryHook = () => {
    const dispatch = useDispatch();
    const {} = useSelector((state: GalleryState) => state.images)

    const onSaveButtonPress = useCallback(() => {
        
    }, [])

    return {

    }
}

export default galleryHook;
