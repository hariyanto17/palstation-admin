export const errorMessage = (error: unknown) => {
  if (typeof error === 'string') {
    return
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'terjadi kesalahan'
}
