import { Button } from "@nextui-org/react";
import { EditIcon } from "../buttonIcons/EditIcon";

const EditBudgetBtn = () => {
  return (
    <>
      <Button color="warning" size="sm" isIconOnly className="flex gap-2">
        <EditIcon />
      </Button>
    </>
  );
};

export default EditBudgetBtn;
