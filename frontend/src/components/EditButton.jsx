import { Edit } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { updateDevice } from "@/services/apiDevice";
import { useQueryClient } from "@tanstack/react-query";
import DeviceForm from "./DeviceForm";

export default function EditButton({ device }) {
  const queryClient = useQueryClient();
  const [isOpenModal, setIsOpenModal] = useState(false);

  async function handleSaveChanges(data) {
    await updateDevice(data, device.id);
    await queryClient.invalidateQueries({ queryKey: ["devices"] });

    setIsOpenModal(false);
  }

  return (
    <>
      <button onClick={() => setIsOpenModal((open) => !open)}>
        <Edit className="size-4 text-gray-500 cursor-pointer hover:text-gray-700" />
      </button>

      <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit device</DialogTitle>
            <DialogDescription>
              Fill the form and click update device.
            </DialogDescription>
          </DialogHeader>
          <DeviceForm
            handleSubmitForm={handleSaveChanges}
            submitLabel="Save Changes"
            defaultValues={device}
            onCancel={() => setIsOpenModal(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
