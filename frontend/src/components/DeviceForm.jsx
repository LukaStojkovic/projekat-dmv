import { Input } from "./ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
    control,
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
          <Controller
            name="type"
            control={control}
            rules={{
              required: "Type is required",
            }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Devices</SelectLabel>
                    <SelectItem value="Radar">Radar</SelectItem>
                    <SelectItem value="Semafor">Semafor</SelectItem>
                    <SelectItem value="Senzor">Senzor</SelectItem>
                    <SelectItem value="Kamera">Kamera</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
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
        <Button type="submit" variant={"primary"}>
          {submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}
