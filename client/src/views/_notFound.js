import React from 'react';
import { Link } from 'react-router-dom';
import logo404 from './../assets/img/svg/manypixels_404_Page-Not-Found_TwoColors.svg';

const NotFound = () => {
  return (
    <div className="container position-absolute top-0 start-0 bottom-0 end-0 d-flex align-items-center">
      <div className="row align-items-center flex-column mx-auto">
        <div className="col-md-6 py-2 d-flex justify-content-center align-items-center">
        <img src={ logo404 } alt="404 Not found" className="img-fluid" />
        </div>
        <div className="col-md-6 d-flex py-2">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="col-8 col-md-10 col-lg-11 pb-3">
              <h3 className="text-center">Sorry, we couldn't found the data you were looking for.</h3>
            </div>
            <Link className="btn btn-primary" to="/">Go to Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound;