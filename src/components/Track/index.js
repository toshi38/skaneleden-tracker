import React from "react";
import Segment from './Segment';

export default ({name, slug, segments}) => {
  let totalLength = segments.reduce((acc, seg) => acc += seg.lengthKm, 0);
  return <div style={{paddingTop: "15px", paddingBottom: "15px"}} className="col-lg-4 col-md-6">
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        Total Length: {Math.round(totalLength * 10)/10} km
        {segments.map(segment => <Segment trackSlug={slug} key={segment.slug} name={segment.name} slug={segment.slug} lengthKm={segment.lengthKm}/>)}
      </div>
    </div>

  </div>
}
