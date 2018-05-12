import React from "react";

export default props => {
  return <div style={{paddingTop: "15px", paddingBottom: "15px"}}class="col-md-4 col-sm-6">
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{props.track.name}</h2>
      </div>
    </div>

  </div>
}
