import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "./Input";
import { PropsWithChildren, useRef } from "react";
import { REGISTER_FIELDS } from "../utils/constants";
import { IUserDetailsFormProps } from "../interfaces/components";

interface IUserFormActionData {
  msg: string;
  data?: { name: string; value: string; message: string }[];
}

function UserDetailsForm({
  title,
  buttonText,
  className,
  children,
}: PropsWithChildren<IUserDetailsFormProps>) {
  const actionData = useActionData() as IUserFormActionData;
  const insertedPassword = useRef<HTMLInputElement>();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="POST" id="register-form" className={className} noValidate>
      <h3 className="title">{title}</h3>
      {REGISTER_FIELDS.map((f) => {
        const validator =
          f.id === "passwordConfirm"
            ? (value: string) =>
                f.validator(insertedPassword.current?.value || "", value)
            : f.validator;

        let severErrorMsg = "";
        let prevValue = "";

        if (actionData && actionData.data) {
          const inputItem = actionData.data.find((item) => item.name === f.id);
          if (inputItem) {
            severErrorMsg = inputItem.message;
            prevValue = inputItem.value;
          }
        }

        return (
          <Input
            key={f.id}
            label={f.label}
            id={f.id}
            type={f.type}
            autoComplete={f.autoComplete ?? "off"}
            ref={f.id === "password" ? insertedPassword : null}
            placeholder={f.placeholder}
            validator={validator}
            severErrorMsg={severErrorMsg}
            prevValue={prevValue}
            help={f.help}
            isSubmitted={actionData?.msg === "Invalid inputs"}
            disabled={f.id === "IDcard" && title === "edit details"}
          />
        );
      })}
      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : `${buttonText}`}
      </button>
      {children}
    </Form>
  );
}

export default UserDetailsForm;