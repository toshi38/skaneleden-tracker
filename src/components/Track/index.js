import React from "react";
import _ from 'lodash';
import Segment from './Segment';

export default class Track extends React.Component{
  constructor(props) {
    super(props);
    this.updateSegment = this.updateSegment.bind(this);
    let segmentsObject = _.keyBy(props.segments, "slug");
    this.state = {
      ...props,
      segments: segmentsObject
    };
  }

  updateSegment(completed, segmentSlug) {
    this.setState({
      segments: {
        ...this.state.segments,
        [segmentSlug]: {
          ...this.state.segments[segmentSlug],
          completed
        }
      }
    })
  }

  render() {
    let {name, slug, segments} = this.state;
    let totalLength = _.reduce(segments, (acc, seg) => acc += seg.lengthKm, 0);
    let completedLength = _.reduce(segments, (acc, seg) => {
      if(seg.completed) {
        return acc += seg.lengthKm;
      }
      return acc;
    }, 0);
    return <div style={{paddingTop: "15px", paddingBottom: "15px"}} className="col-lg-4 col-md-6">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <div>Total Length: {Math.round(totalLength * 10)/10} km</div>
          <div>Completed Length: {Math.round(completedLength * 10)/10} km</div>
          {
            _.map(segments, segment =>
              <Segment
                key={segment.slug} trackSlug={slug} name={segment.name} slug={segment.slug} lengthKm={segment.lengthKm}
                completed={segment.completed} updateSegment={this.updateSegment}
              />)
          }
        </div>
      </div>

    </div>
  }
}
