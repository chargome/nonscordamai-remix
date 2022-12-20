import type { EntryData, EntryLocation } from "~/types/entry";
import { useTransition } from "@remix-run/react";
import { useAddEntryStore } from "~/store/AddEntry";
import Button from "../Button";
import LocationDisplay from "../LocationDisplay";
import TextEditor from "../TextEditor";

interface Props {
  saveEntry: (location: EntryLocation, data: EntryData) => void;
  prevStep: () => void;
  error?: string;
}

const ReviewAndPublish = ({ prevStep, saveEntry, error }: Props) => {
  const [data, location] = useAddEntryStore((state) => [
    state.data,
    state.location,
  ]);
  const transition = useTransition();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="text-md text-center text-error">{error}</div>
      <LocationDisplay location={location} />
      <TextEditor initialData={data.blocks} readOnly />
      <Button
        color="primary"
        onClick={() => saveEntry(location as EntryLocation, data)}
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
