import React from "react";

const Iframe = ({ src }: { src: string }) => {
  return (
    <iframe
      src={src}
      className="h-[1000px] w-full"
      title="jovial-worker-xsnz7c"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
};

export default Iframe;
