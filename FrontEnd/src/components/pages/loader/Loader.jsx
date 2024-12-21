import * as React from 'react';
import Backdrop from '@mui/material/Backdrop'; 
import style from "./Loader.module.css"
export default function Loader() {
  return (
    <div> 
      <Backdrop
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        open= {true}
        className={`${style.page}`}
      > 
       <div className={`${style.loader}`}></div>   
      </Backdrop>
    </div>
  );
}
