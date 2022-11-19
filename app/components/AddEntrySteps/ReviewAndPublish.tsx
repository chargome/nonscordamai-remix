import type { LoaderFunction } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useSubmit, useTransition } from "@remix-run/react";
import { useAddEntryStore } from "~/store/AddEntry";
import { FORM_DATA_DATA, FORM_DATA_LOCATION } from "~/types/entry";
import { ActionDataError } from "~/types/error";
import Button from "../Button";
import LocationDisplay from "../LocationDisplay";
import TextEditor from "../TextEditor";

interface Props {
  prevStep: () => void;
}

const ReviewAndPublish = ({ prevStep }: Props) => {
  const [data, location] = useAddEntryStore((state) => [
    state.data,
    state.location,
  ]);
  const transition = useTransition();
  const submit = useSubmit();
  const actionData = useActionData<ActionDataError>();

  const saveEntry = () => {
    const formData = new FormData();
    formData.append(FORM_DATA_LOCATION, JSON.stringify(location));
    formData.append(FORM_DATA_DATA, JSON.stringify(data));
    submit(formData, { method: "post" });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="text-md text-center text-error">{actionData?.msg}</div>
      <LocationDisplay location={location} />
      <TextEditor initialData={data.blocks} readOnly />
      <Button
        color="primary"
        onClick={saveEntry}
        isDisabled={transition.state === "submitting"}
      >
        SAVE
      </Button>
      <Button onClick={prevStep} isDisabled={transition.state === "submitting"}>
        BACK
      </Button>
    </div>
  );
};

export default ReviewAndPublish;
