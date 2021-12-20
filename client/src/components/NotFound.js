import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import classes from './styles/NotFoutd.module.css';

export const NotFound = ({isLogout}) => {
    const navigate = useNavigate();
    const backHandlear = () => {
        navigate('/');
    }
    return (
        <div className={classes.notFoundContainer}>
            <h1>Not found</h1>
            <Button className={classes.bakcBtn} onClick={backHandlear} text="Go back." />
        </div>
    )
}
