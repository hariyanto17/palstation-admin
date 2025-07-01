import { SignInFormValues } from './inteface'

export const validateSignIn = (values: SignInFormValues) => {
  const errors: Partial<SignInFormValues> = {}

  if (!values.password) {
    errors.password = 'Password wajib diisi.'
  } else if (values.password.length < 6) {
    errors.password = 'Password minimal 6 karakter.'
  }

  // Jika ada validasi lain (misal: format email jika ada field email)
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Format email tidak valid.'
  }

  return errors
}
