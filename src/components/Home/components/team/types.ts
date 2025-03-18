export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    status: boolean;
    permissions: {
      addVM: boolean;
      addUser: boolean;
      controlVM: {
        id: string;
        name: string;
        type: 'Process' | 'System';
      }[];
      mediaTypes: {
        email: boolean;
        telegram: boolean;
      };
    };
  }
  
  export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
  
  export interface UserFormData {
    email: string;
    firstName: string;
    lastName: string;
    status: boolean;
    permissions: {
      addVM: boolean;
      addUser: boolean;
      controlVM: {
        id: string;
        name: string;
        type: 'Process' | 'System';
      }[];
      mediaTypes: {
        email: boolean;
        telegram: boolean;
      };
    };
  }