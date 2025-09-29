import { useCallback } from 'react';
import toast from 'react-hot-toast';
import CustomToast from './CustomToast';

export const useToast = () => {
  const toastSuccess = useCallback((message: string) => {
    toast.dismiss();
    toast(<CustomToast type="success" message={message} onClose={() => toast.dismiss()} />);
  }, []);

  const toastInfo = useCallback((message: string) => {
    toast.dismiss();
    toast(<CustomToast type="info" message={message} onClose={() => toast.dismiss()} />);
  }, []);

  const toastError = useCallback((message: string) => {
    toast.dismiss();
    toast(<CustomToast type="error" message={message} onClose={() => toast.dismiss()} />);
  }, []);

  return { toastSuccess, toastInfo, toastError };
};
