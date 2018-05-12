import {removeTrailNumber} from "../helpers";
import {assert} from 'chai';

it('can remove single digits', () => {
  let name = '1 My Cool Trail';
  let result = removeTrailNumber(name);
  assert.equal(result, 'My Cool Trail')
});

it('can remove double digits', () => {
  let name = '14 My Cool Trail';
  let result = removeTrailNumber(name);
  assert.equal(result, 'My Cool Trail')
});

it('can remove numbers with a letter', () => {
  let name = '14B My Cool Trail';
  let result = removeTrailNumber(name);
  assert.equal(result, 'My Cool Trail')
});
