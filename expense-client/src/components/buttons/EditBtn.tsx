import { Button, useDisclosure } from "@nextui-org/react";
import { EditIcon } from "../buttonIcons/EditIcon";
import { Expense, SingleExpense } from "@/utils/ExpenseType";
import EditModal from "../modals/EditModal";

const EditBtn = ({ info }: { info: SingleExpense }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        size="sm"
        variant="flat"
        isIconOnly
        color="warning"
      >
        <EditIcon />
      </Button>
      <EditModal isOpen={isOpen} onOpenChange={onOpenChange} info={info} />
    </>
  );
};

export default EditBtn;
