import toast from 'react-hot-toast';
import CustomToast from './CustomToast';

export const customToast = {
  success: (message: string) => {
    toast.dismiss();
    toast(<CustomToast type="success" message={message} onClose={() => toast.dismiss()} />);
  },
  info: (message: string) => {
    toast.dismiss();
    toast(<CustomToast type="info" message={message} onClose={() => toast.dismiss()} />);
  },
  error: (message: string) => {
    toast.dismiss();
    toast(<CustomToast type="error" message={message} onClose={() => toast.dismiss()} />);
  },
};
