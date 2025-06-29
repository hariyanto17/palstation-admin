'use client'

import { useState, useCallback, FormEvent, ChangeEvent } from 'react'

type Values<T> = {
  [K in keyof T]: T[K]
}

type Errors<T> = {
  [K in keyof T]?: string
}

type ValidateFunction<T> = (values: Values<T>) => Errors<T>

interface UseFormHookResult<T> {
  formData: Values<T>
  errors: Errors<T>
  isSubmitting: boolean
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (
    callback: (values: Values<T>) => Promise<void> | void
  ) => (e: FormEvent<HTMLFormElement>) => void
  setErrors: React.Dispatch<React.SetStateAction<Errors<T>>>
  setFormData: React.Dispatch<React.SetStateAction<Values<T>>>
  resetForm: () => void
}

export function useForm<T>(
  initialValues: T,
  validate?: ValidateFunction<T>
): UseFormHookResult<T> {
  const [formData, setFormData] = useState<Values<T>>(initialValues)
  const [errors, setErrors] = useState<Errors<T>>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Mengelola perubahan input
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))

      if (errors[name as keyof T]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: undefined,
        }))
      }
    },
    [errors]
  )

  const handleSubmit = useCallback(
    (callback: (values: Values<T>) => Promise<void> | void) => {
      return async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsSubmitting(true)
        setErrors({})

        let validationErrors: Errors<T> = {}
        if (validate) {
          validationErrors = validate(formData)
          setErrors(validationErrors)
        }

        if (Object.keys(validationErrors).length === 0) {
          try {
            await Promise.resolve(callback(formData))
          } catch (error: unknown) {
            console.error('Form submission failed:', error)
          }
        }
        setIsSubmitting(false)
      }
    },
    [formData, validate]
  )

  const resetForm = useCallback(() => {
    setFormData(initialValues)
    setErrors({})
    setIsSubmitting(false)
  }, [initialValues])

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setErrors,
    setFormData,
    resetForm,
  }
}
