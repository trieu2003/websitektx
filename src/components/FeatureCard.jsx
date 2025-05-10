import React from "react";

const FeatureCard = ({ title, description }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text text-muted">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
