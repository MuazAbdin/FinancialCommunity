import { Form, useNavigation } from "react-router-dom";
import Input from "./Input";
import { LOAN_FIELDS } from "../utils/constants";

function LoanForm({ className }: { className?: string }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form id="transfer-form" className={className} noValidate>
      <h3 className="title">loan</h3>
      {LOAN_FIELDS.map((f) => {
        return (
          <Input
            key={f.id}
            label={f.label}
            id={f.id}
            type={f.type}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete ?? "off"}
            validator={f.validator}
            formatter={f.formatter}
            // severErrorMsg={severErrorMsg}
            // prevValue={values?.[f.id as Extract<UserDetails, "IDcard">] || ""}
            help={f.help}
            // isSubmitted={actionData?.msg === "Invalid inputs"}
            formID="transfer-form"
            min={
              f.type === "date"
                ? new Date().toLocaleDateString("fr-ca")
                : undefined
            }
          />
        );
      })}
      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : "calculate"}
      </button>
    </Form>
  );
}

export default LoanForm;
