import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// "'marketing'" has to match the key found in container's ModuleFederationPlugin remotes
// "/MarketingApp" has to match whatever is exposed via the marketing apps ModuleFederationPlugin "exposes" key
import { mount } from 'marketing/MarketingApp';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
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
