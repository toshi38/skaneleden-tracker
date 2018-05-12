import React from "react";
import _ from 'lodash';
import Segment from './Segment';
import firebase from '../../firebase';

export default class Track extends React.Component{
  constructor(props) {
    super(props);
    this.updateSegment = this.updateSegment.bind(this);
    let segmentsObject = _.keyBy(props.segments, "slug");
    let segmentsCompleted = props.segments.reduce((acc, val) => ({...acc, [val.slug]: false}), {});
    this.state = {
      ...props,
      segments: segmentsObject,
      segmentsCompleted,
      userProfile: null,
      isSignedIn: false
    };
    this.databaseLocationBase = `/progress/${this.state.slug}/`;

  }

  updateSegment(completed, segmentSlug) {
    let segmentsCompleted = {
      ...this.state.segmentsCompleted,
      [segmentSlug]: completed
    };
    if(this.state.isSignedIn && this.state.userProfile) { //Logged in:
      firebase.database().ref(this.databaseLocationBase + this.state.userProfile.uid).set(segmentsCompleted)
    } else {
      //Can't depend on firebase so update state ourselves:
      //Normally this is done in the firebase callback.
      this.setState({segmentsCompleted});
    }
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ isSignedIn: !!user, userProfile: user });
        this.firebaseRef = firebase.database().ref(this.databaseLocationBase + user.uid);
        this.firebaseCallback = this.firebaseRef.on('value', (snap) => {
          console.log("Update!", snap.val())
          if(snap.val()) {
            this.setState({ segmentsCompleted: snap.val() });
          }
          else {
            console.log("No state found in database, initializing to current state");
            firebase.database().ref(this.databaseLocation + this.state.userProfile.uid).set(this.state.segmentsCompleted);
          }
        });
      }
    });
  }

  componentWillUnmount() {
    // Un-registers the auth state observer.
    this.unregisterAuthObserver();

    // Un-register the listener on '/someData'.
    if(this.firebaseCallback) {
      this.firebaseRef.off('value', this.firebaseCallback);
    }
  }

  render() {
    let {name, slug, segments} = this.state;
    let totalLength = _.reduce(segments, (acc, seg) => acc += seg.lengthKm, 0);
    let completedLength = _.reduce(segments, (acc, seg) => {
      if(this.state.segmentsCompleted[seg.slug]) {
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
                key={`${segment.slug}-${this.state.segmentsCompleted[segment.slug]}`} trackSlug={slug} name={segment.name} slug={segment.slug} lengthKm={segment.lengthKm}
                completed={this.state.segmentsCompleted[segment.slug]} updateSegment={this.updateSegment}
              />)
          }
        </div>
      </div>

    </div>
  }
}
