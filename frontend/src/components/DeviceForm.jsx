import { Input } from "./ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

export default function DeviceForm({
  handleSubmitForm,
  submitLabel = "Submit",
  defaultValues = {},
  onCancel,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  async function submitForm(data) {
    await handleSubmitForm(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            name="name"
            placeholder="Name..."
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 30,
                message: "Name cannot contain more than 30 characters",
              },
              min: {
                value: 3,
                message: "Name must have at least 3 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <label htmlFor="type">Type</label>
          <Input
            id="type"
            name="type"
            placeholder="Type..."
            {...register("type", {
              required: "Type is required",
              maxLength: {
                value: 20,
                message: "Type cannot contain more than 20 characters",
              },
              min: {
                value: 3,
                message: "Type must have at least 3 characters",
              },
            })}
          />
          {errors.type && (
            <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <label htmlFor="location">Location</label>
          <Input
            id="location"
            name="location"
            placeholder="Location..."
            {...register("location", {
              required: "Location is required",
              maxLength: {
                value: 20,
                message: "Location cannot contain more than 20 characters",
              },
              min: {
                value: 3,
                message: "Location must have at least 3 characters",
              },
            })}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">{submitLabel}</Button>
      </DialogFooter>
    </form>
  );
}
