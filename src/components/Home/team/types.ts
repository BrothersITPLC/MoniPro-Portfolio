export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  status: boolean
  permissions: {
    addVM: boolean
    addUser: boolean
    mediaTypes: {
      email: boolean
      telegram: boolean
    }
    controlVM: string[]
  }
}
  
  export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
  
  export interface UserFormData {
    username: string
    firstName: string
    lastName: string
    status: boolean
    password: string
    confirmPassword: string
    mediaTypes: {
      email: boolean
      telegram: boolean
    }
    email: string
    telegramusername: string
  }