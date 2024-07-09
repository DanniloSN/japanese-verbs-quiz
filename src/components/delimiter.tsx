import React from "react";

interface DelimiterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  fixed?: boolean;
}

export default function Delimiter(props: DelimiterProps) {
  return (
    <div
      {...props}
      className={`m-auto w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl ${
        props.className ?? ""
      } ${props.fixed ? "fixed p-3 bottom-0 left-0 right-0" : ""}`}
    >
      {props.children}
    </div>
  );
}
