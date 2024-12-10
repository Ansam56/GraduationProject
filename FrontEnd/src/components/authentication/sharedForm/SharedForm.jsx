import React from "react";
import style from "../Auth.module.css";
import Logo from "../../pages/logo/Logo";
import { Link } from "react-router-dom";

 
export default function SharedForm({
  title,
  formik_handelSubmit,
  renderInputs,
  secondaryAction = " ",
  secondaryAction_targetComponent,
  mainAction,
  formik_isValid,
}) {
  return (
    <div className={`${style.authLayout} `}>
      <div className={`${style.formDesign} `}>
        <div className="text-center w-25 mx-auto">
          <Logo />
        </div>
        <h2 className={`${style.formTitle} text-center mt-3 mb-4 custom-text`}>{title}</h2>

        <form onSubmit={formik_handelSubmit} className={`${style.form} custom-text`}>
          <div className="container-fluid">
            {renderInputs}
            {secondaryAction && (
              <div className="d-flex justify-content-end">
                <Link
                  className={`${style.LinkForget}`}
                  to={secondaryAction_targetComponent}
                >
                  {secondaryAction}
                </Link>
              </div>
            )}

            <div className="  mt-3">
              <button
                type="submit"
                disabled={!formik_isValid}
                className={`${style.button}  `}
              >
                {mainAction}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
   
   
  );
}
 
 
 
 
  
 
