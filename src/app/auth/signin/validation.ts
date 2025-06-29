interface SignupFormValues {
  username: string
  password: string
}

export const validateSignIn = (values: SignupFormValues) => {
  const errors: Partial<SignupFormValues> = {}

  if (!values.username) {
    errors.username = 'Username wajib diisi.'
  } else if (values.username.length < 3) {
    errors.username = 'Username minimal 3 karakter.'
  }

  if (!values.password) {
    errors.password = 'Password wajib diisi.'
  } else if (values.password.length < 6) {
    errors.password = 'Password minimal 6 karakter.'
  }

  // Jika ada validasi lain (misal: format email jika ada field email)
  // if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
  //   errors.email = 'Format email tidak valid.';
  // }

  return errors
}
