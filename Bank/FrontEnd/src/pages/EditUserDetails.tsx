import { ActionFunctionArgs, useOutletContext } from "react-router-dom";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import { UserDetails } from "../interfaces/components";
import { EDIT_USER_FIELDS } from "../utils/constants";
import { action as submitAction } from "../utils/submitAction";

function EditUserDetails() {
  const values = useOutletContext<UserDetails>();
  return (
    <section className="content">
      <StyledUserForm
        formID="editDetails-form"
        title="edit details"
        method="PATCH"
        buttonText="save"
        values={values}
        fields={EDIT_USER_FIELDS}
      />
    </section>
  );
}

export default EditUserDetails;

export async function action({ params, request }: ActionFunctionArgs) {
  return submitAction({ params, request });
}