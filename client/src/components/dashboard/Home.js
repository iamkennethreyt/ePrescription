import React from "react";

export default function Home({ drugs, users, prescriptions, patients }) {
  return (
    <section className="text-center">
      <h2 className="h1-responsive font-weight-bold">
        Welcome to the e-Prescription
      </h2>
      <p className="lead grey-text w-responsive mx-auto mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>

      <div className="row">
        <div className="col-md-3">
          <i className="fas fa-user-md fa-3x red-text" />
          <h5 className="font-weight-bold my-4">Users ({users})</h5>
          <p className="grey-text mb-md-0 mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit maiores aperiam minima assumenda deleniti hic.
          </p>
        </div>
        <div className="col-md-3">
          <i className="fas fa-prescription-bottle fa-3x cyan-text" />
          <h5 className="font-weight-bold my-4">Drugs ({drugs})</h5>
          <p className="grey-text mb-md-0 mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit maiores aperiam minima assumenda deleniti hic.
          </p>
        </div>
        <div className="col-md-3">
          <i className="fas fa-prescription fa-3x orange-text" />
          <h5 className="font-weight-bold my-4">
            Prescriptions ({prescriptions})
          </h5>
          <p className="grey-text mb-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit maiores aperiam minima assumenda deleniti hic.
          </p>
        </div>
        <div className="col-md-3">
          <i className="fas fa-users fa-3x green-text" />
          <h5 className="font-weight-bold my-4">Patients ({patients})</h5>
          <p className="grey-text mb-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit maiores aperiam minima assumenda deleniti hic.
          </p>
        </div>
      </div>
    </section>
  );
}
