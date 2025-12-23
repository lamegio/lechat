"use client";

import { HiLocationMarker } from "react-icons/hi";
import { MdDevices } from "react-icons/md";

interface CommentMetaProps {
  location?: string;
  device?: string;
}

export function CommentMeta({ location, device }: CommentMetaProps) {
  return (
    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
      {location && (
        <span className="flex items-center gap-1">
          <HiLocationMarker size={12} />
          { location }
          {/*{location.region*/}
          {/*  ? `${location.country} · ${location.region}`*/}
          {/*  : location.country}*/}
        </span>
      )}
      {device && (
        <span className="flex items-center gap-1">
          <MdDevices size={12} />
          { device }
          {/*{device.os} · {device.browser}*/}
        </span>
      )}
    </div>
  );
}
