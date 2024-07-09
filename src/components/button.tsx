"use client";

import React from "react";

type ButtonColorType = "PRIMARY" | "SECONDARY";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: ButtonColorType;
}

export default function Button(props: ButtonProps) {
  const classNameColors =
    props.color === "SECONDARY"
      ? "text-[--primary-color] border border-[--primary-color]"
      : "bg-[--primary-color] text-[--white]";
  return (
    <button
      {...props}
      className={`w-full p-2 rounded-md shadow-md ${classNameColors} ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </button>
  );
}
