import React from "react";
import {removeTrailNumber} from "../../helpers";

export default class Segment extends React.Component {
  constructor(props) {
    super(props);
    this.completed = props.completed;
  }
  render () {
    let {trackSlug, name, slug, lengthKm, updateSegment} = this.props;
    const checkId = `${trackSlug}-${slug}`;
    const segmentName = removeTrailNumber(name);

    let toggleSegment = (event) => {
      this.setState({completed: true});
      updateSegment(event.target.checked, slug);
    };

    return <div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id={checkId} checked={this.completed} onChange={toggleSegment}/>
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

}
