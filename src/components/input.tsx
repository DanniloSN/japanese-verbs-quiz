"use client";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-md p-2 shadow-md ${props.className ?? ""}`}
    />
  );
}
