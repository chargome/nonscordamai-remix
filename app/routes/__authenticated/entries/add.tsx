import AddEntrySteps from "~/components/AddEntrySteps";

const AddEntryPage = () => {
  return (
    <div className="py-10 px-10">
      <h1 className="pb-10 text-end text-xl">Create a new Entry</h1>
      <AddEntrySteps />
    </div>
  );
};

export default AddEntryPage;
