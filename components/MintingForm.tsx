import { useFormFields, FormFields } from "@/hooks/useFormFields";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { RDF } from "radix-declarative-form/lib/cjs/RDF";
import { useRDF } from "radix-declarative-form/lib/cjs/useRDF";

export const MintingForm = () => {
  const { fields } = useFormFields();
  const { isInFlight, handleSubmit } = useFormSubmit();
  const form = useRDF(fields, handleSubmit);

  return (
    <div className="minting-form">
      <h1>Mint a license</h1>
      <RDF<FormFields>
        form={form}
        isInFlight={isInFlight}
        submitButtonLabel="Create License"
        submitButtonLabelInFlight=""
      />
    </div>
  )
}