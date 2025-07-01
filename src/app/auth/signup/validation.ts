import { SignUpFormValues } from './interface'

export const validateSignup = (values: SignUpFormValues) => {
  const errors: Partial<SignUpFormValues> = {}

  if (!values.name) {
    errors.name = 'Nama wajib diisi.'
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Format email tidak valid.'
  }

  if (!values.password) {
    errors.password = 'Password wajib diisi.'
  } else if (values.password.length < 6) {
    errors.password = 'Password minimal 6 karakter.'
  }

  return errors
}
