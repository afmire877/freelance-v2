import React from "react";
import { Loader2 } from "lucide-react";
import classNames from "classnames";

export default function Spinner({ className = "", label = "", ...props }) {
  return (
    <div
      className={classNames(
        "flex h-screen w-screen items-center justify-center",
        className,
      )}
      {...props}
    >
      <Loader2 className=" h-10 w-10 animate-spin" />
      {label && <p className="ml-4">{label}</p>}
    </div>
  );
}
