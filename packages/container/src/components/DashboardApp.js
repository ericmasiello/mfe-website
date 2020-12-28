import React, { useRef, useEffect } from 'react';
// "'dashboard'" has to match the key found in container's ModuleFederationPlugin remotes
// "/DashboardApp" has to match whatever is exposed via the marketing apps ModuleFederationPlugin "exposes" key
import { mount } from 'dashboard/DashboardApp';

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
