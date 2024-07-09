"use client";

export default function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  return (
    <select
      {...props}
      className={`w-full bg-white rounded-md p-2 shadow-md ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </select>
  );
}
