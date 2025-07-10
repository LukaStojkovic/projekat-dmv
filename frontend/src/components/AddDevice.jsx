import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { addDevice } from "@/services/apiDevice";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function AddDevice() {
  const queryClient = useQueryClient();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  async function onSubmit(data) {
    try {
      await addDevice(data);
      await queryClient.invalidateQueries({ queryKey: ["devices"] });
      toast.success(`You created device '${data.name}'`);
      reset();
      setIsOpenModal(false);
    } catch (err) {
      console.error("Failed to add device", err);
    }
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Device
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new device</DialogTitle>
          <DialogDescription>
            Fill the form and click add device.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                name="name"
                placeholder="Name..."
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <label htmlFor="type">Type</label>
              <Input
                id="type"
                name="type"
                placeholder="Type..."
                {...register("type", { required: "Type is required" })}
              />
              {errors.type && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <label htmlFor="location">Location</label>
              <Input
                id="location"
                name="location"
                placeholder="Location..."
                {...register("location", { required: "Location is required" })}
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
              <Button variant="outline" onClick={() => setIsOpenModal(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add Device</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
