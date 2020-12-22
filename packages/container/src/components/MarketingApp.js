import React, { useRef, useEffect } from 'react';
// "'marketing'" has to match the key found in container's ModuleFederationPlugin remotes
// "/MarketingApp" has to match whatever is exposed via the marketing apps ModuleFederationPlugin "exposes" key
import { mount } from 'marketing/MarketingApp';

export default () => {
  const ref = useRef(null);
  useEffect(() => {
    mount(ref.current);
  }, []);
  return <div ref={ref} />;
};
