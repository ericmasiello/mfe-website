import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// "'auth'" has to match the key found in container's ModuleFederationPlugin remotes
// "/AuthApp" has to match whatever is exposed via the marketing apps ModuleFederationPlugin "exposes" key
import { mount } from 'auth/AuthApp';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        // help avoid infinite loops by verifying
        // we are actaully changing the path
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
