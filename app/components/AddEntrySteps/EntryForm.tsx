import { useAddEntryStore } from "~/store/AddEntry";
import Button from "../Button";
import TextEditor from "../TextEditor";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
}

const EntryForm = ({ prevStep, nextStep }: Props) => {
  const [cachedData, setCachedData] = useAddEntryStore((state) => [
    state.data,
    state.setData,
  ]);

  return (
    <div className="flex w-full flex-col gap-4">
      <TextEditor
        initialData={cachedData.blocks}
        onSave={(data) => {
          setCachedData(data);
          nextStep();
        }}
        btnLabel="NEXT"
      />
      <Button onClick={prevStep}>BACK</Button>
    </div>
  );
};

export default EntryForm;
