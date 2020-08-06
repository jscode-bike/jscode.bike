/* eslint-disable no-restricted-globals */
// this.onmessage = function (e) {
//   if (e.data.hello !== undefined) {
//     this.postMessage({ doubleThing: e.data.thing * 2 });
//   }
// };

export default () => {
  self.addEventListener(
    "message",
    function (e) {
      if (e.data.hello !== undefined) {
        self.postMessage({ doubleThing: e.data.thing * 2 });
      }
    },
    false
  );
};
