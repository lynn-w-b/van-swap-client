import React from "react";

export default function ErrorMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p>This field is required.</p>;
      case "minLength":
        return <p>This field requires a minimum of 2 characters.</p>;
      case "email":
        return <p>Please enter a valid email address.</p>;
      case "pattern":
        return (
          <p>
            Passwords must be at least 6 characters long and contain a number,
            an upper case and a lower case letter.
          </p>
        );
      case "validate":
        return <p>Username is already being used</p>;
      default:
        return null;
    }
  }

  return null;
}
