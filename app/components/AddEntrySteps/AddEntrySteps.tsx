import { useState } from "react";
import type { EntryData, EntryLocation } from "~/types/entry";
import Loader from "../GoogleMaps/Loader";
import EntryForm from "./EntryForm";
import LocationPicker from "./LocationPicker";
import ReviewAndPublish from "./ReviewAndPublish";

interface Props {
  googleKey: string;
  saveEntry: (location: EntryLocation, data: EntryData) => void;
}

const STEPS = [
  {
    name: "Location",
    icon: "📍",
  },
  {
    name: "Thoughts",
    icon: "💭",
  },
  {
    name: "Finish",
    icon: "✅",
  },
];

const AddEntrySteps = ({ googleKey, saveEntry }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="flex w-full flex-col items-center gap-10 md:flex-row md:items-stretch">
      <div>
        <ul className="steps md:steps-vertical">
          {STEPS.map((step, index) => (
            <li
              key={step.name}
              data-content={step.icon}
              className={`step ${
                currentStep >= index && "step-primary w-40 text-primary"
              }`}
            >
              {step.name}
            </li>
          ))}
        </ul>
      </div>
      <div className=" flex w-full justify-center">
        {currentStep === 0 && (
          <Loader googleKey={googleKey}>
            <LocationPicker nextStep={nextStep} />
          </Loader>
        )}
        {currentStep === 1 && (
          <EntryForm nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 2 && (
          <ReviewAndPublish prevStep={prevStep} saveEntry={saveEntry} />
        )}
      </div>
    </div>
  );
};

export default AddEntrySteps;
