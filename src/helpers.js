//Removes trail number from name:
//Expects names like:
// - 1 My Cool Trail
// - 100 My Other Cool Trail
// - 10A My Other Cool Trail
export function removeTrailNumber(trailName) {
  return trailName.replace(/\d+[a-z]? /i, '');
}
