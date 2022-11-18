import { useAddEntryStore } from "~/store/AddEntry";
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

  return (
    <div className="flex w-full flex-col gap-4">
      <LocationDisplay location={location} />
      <TextEditor initialData={data.blocks} readOnly />
      <Button color="primary">SAVE</Button>
      <Button onClick={prevStep}>BACK</Button>
    </div>
  );
};

export default ReviewAndPublish;
