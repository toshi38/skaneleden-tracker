import React from "react";
import {removeTrailNumber} from "../../helpers";

export default ({trackSlug, name, slug, lengthKm}) => {
  const checkId = `${trackSlug}-${slug}`;
  const segmentName = removeTrailNumber(name);
  return <div>
    <div className="form-check">
      <input type="checkbox" className="form-check-input" id={checkId}/>
      <label className="form-check-label float-right" htmlFor={checkId}>{Math.round(lengthKm * 10)/10} km</label>
      <label
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: "block"
        }}
        className="form-check-label"
        htmlFor={checkId}
        title={segmentName}>
          {segmentName}
      </label>
    </div>
  </div>
}
