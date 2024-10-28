import React from "react";
import * as icons from "../../assets/icons";

const Icon = ({ name, alt, size, className }) => {
  const iconSrc = icons[name];

  if (!iconSrc) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <img
      src={iconSrc}
      alt={alt || name}
      style={{ width: size, height: size }}
      className={className}
    />
  );
};

export default Icon;
