'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import { useForm } from '@/hooks/useForm'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SignInFormValues } from './inteface'
import { validateSignIn } from './validation'
import { errorMessage } from '@/utils/errorMessage'

const SignIn = () => {
  const router = useRouter()

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setErrors,
    resetForm,
  } = useForm<SignInFormValues>(
    {
      username: '',
      password: '',
    },
    validateSignIn
  )

  const onSubmit = async (values: SignInFormValues) => {
    console.log('Form data valid dan siap dikirim:', values)
    try {
      // Simulasi panggilan API
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          // Simulasi error dari server
          // if (values.username === 'admin') {
          //   throw new Error('Username "admin" tidak diizinkan.');
          // }
          resolve({ success: true, message: 'Pendaftaran berhasil!' })
        }, 1500)
      )

      console.log('API Response:', response)
      resetForm()
      // Redirect ke halaman login atau dashboard
      router.push('/')
    } catch (error: unknown) {
      const message = errorMessage(error)
      setErrors((prev) => ({
        ...prev,
        form: message,
      }))
    }
  }

  return (
    <div className="p-3">
      <div className="pb-3">
        <div className="flex items-center justify-center">
          <Image src="/images/app-logo.png" alt="logo" width={36} height={36} />
        </div>
        <h1 className="text-2xl font-bold text-[#1A143C]">Sign In</h1>
        <p className="text-xs font-normal text-[#9693A5]">
          Selamat datang kembali
        </p>
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username"
          value={formData.username}
          name="username"
          onChange={handleChange}
          error={errors.username}
        />
        <Input
          label="Password"
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          error={errors.password}
        />

        <Button type="submit">{isSubmitting ? 'loading..' : 'Masuk'}</Button>
      </form>
    </div>
  )
}

export default SignIn
