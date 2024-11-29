import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="grid place-items-center h-screen">
      <Spinner color="primary" size="lg" />
    </div>
  );
};

export default Loading;
