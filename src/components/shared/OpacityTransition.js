import React from "react";

import { animated, useTransition } from "react-spring";

const OpacityTransition = ({ children }) => {
  // const style = useSpring({
  //   to: { opacity: 1 },
  //   from: { opacity: 0 },
  //   config: { duration: 100 },
  // });
  const t = useTransition(children, () => "thing", {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 100 },
  });
  return t.map(({ item: c, key: k, props: p }) => {
    return (
      <animated.div key={k} style={p}>
        {c}
      </animated.div>
    );
  });
};

export default OpacityTransition;
