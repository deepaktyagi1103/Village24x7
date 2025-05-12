import { toast } from 'sonner';
const HorizonatlCardProduct = () => {
  const showToast = () => {
    toast.success("Product added successfully!");
  };

  return (
    <div>
      <button onClick={showToast} className="bg-blue-500 text-white p-2 rounded">
        Show Toast
      </button>
      <Toaster position="top-right" />
    </div>
  );
};

export default HorizonatlCardProduct;
