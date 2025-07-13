import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { addDevice } from "@/services/apiDevice";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import DeviceForm from "./DeviceForm";

export default function AddDevice() {
  const queryClient = useQueryClient();
  const [isOpenModal, setIsOpenModal] = useState(false);

  async function onSubmit(data) {
    try {
      await addDevice(data);
      await queryClient.invalidateQueries({ queryKey: ["devices"] });

      setIsOpenModal(false);
    } catch (err) {
      console.error("Failed to add device", err);
    }
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button variant={"primary"}>
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
        <DeviceForm
          handleSubmitForm={onSubmit}
          submitLabel="Add Device"
          onCancel={() => setIsOpenModal(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
