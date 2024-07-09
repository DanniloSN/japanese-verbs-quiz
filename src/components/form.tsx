"use client";

import React, { FormEvent } from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: (values: any, event?: FormEvent<HTMLFormElement>) => void;
}

export default function Form(props: FormProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const elementsArray = Array.from(
      (event.target as HTMLFormElement).elements
    ) as HTMLInputElement[];
    const formValues = elementsArray.reduce((previous, current) => {
      const name = (current as HTMLInputElement).name;
      const value =
        current.type === "checkbox" ? current.checked : current.value;
      if (!name && !value) return previous;
      return { ...previous, [name]: value };
    }, {});
    props.onSubmit(formValues, event);
  };
  return (
    <form {...props} onSubmit={onSubmit}>
      {props.children}
    </form>
  );
}
