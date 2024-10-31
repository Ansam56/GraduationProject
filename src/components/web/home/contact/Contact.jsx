import React from 'react'

export default function Contact() {
  return (
   
   <div className="contact-info  w-100 ">
    <div className="container rounded-top-3 px-3 py-4">
      <div className="row row-gap-3">
        <div className="col-lg-4">
          <div className="d-flex align-items-center">
            <a href="#">
              <i className="fa-solid fa-phone-flip text-main-color" />
            </a>
            <div className="info  text-white ">
              <h3 className="fs-6">Contact Number</h3>
              <span>+345-3909655627</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="d-flex align-items-center">
            <a href="#">
              <i className="far fa-envelope text-main-color" />
            </a>
            <div className="info  text-white ">
              <h3 className="fs-6">Email Address</h3>
              <span>+2390-875-5664</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="d-flex align-items-center">
            <a href="#">
              <i className="fas fa-map-marker-alt text-main-color" />
            </a>
            <div className="info  text-white ">
              <h3 className="fs-6">Location</h3>
              <span>Buffalo Street,#205, Northwest-3087</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 

  )
}
