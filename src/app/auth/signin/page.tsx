'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import { useForm } from '@/hooks/useForm'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { SignInFormValues } from './inteface'
import { validateSignIn } from './validation'
import { errorMessage } from '@/utils/errorMessage'
import Link from 'next/link'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '@/config/firebase'

const SignIn = () => {
  const router = useRouter()
  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth)

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
      email: '',
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
      router.push('/admin/home')
    } catch (error: unknown) {
      const message = errorMessage(error)
      setErrors((prev) => ({
        ...prev,
        form: message,
      }))
    }
  }

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const googleCredential = await signInWithGoogle()
      if (googleCredential) {
        const { user } = googleCredential
        console.log('googleCredential', user)
      }
    } catch (e) {
      console.error('Error during Google sign in:', e)
    }
  }, [signInWithGoogle])

  return (
    <div className="">
      <div className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-lg">
        <div className="pb-6 text-center">
          <div className="mb-4 flex items-center justify-center">
            <Image
              src="/images/app-logo.png"
              alt="logo"
              width={36}
              height={36}
            />
          </div>
          <h1 className="text-gradient mb-2 text-3xl font-bold">Sign In</h1>
          <p className="text-sm font-normal text-gray-400">
            Selamat datang kembali
          </p>
        </div>
        <form
          className="mb-5 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            error={errors.email}
            id="email-input"
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            error={errors.password}
            id="password-input"
          />
          <Button type="submit">{isSubmitting ? 'Loading...' : 'Masuk'}</Button>
        </form>
        <Button onClick={handleGoogleSignIn}>Sign in with google</Button>
        <div className="mt-2 flex justify-center gap-1 text-gray-200">
          <p className="text-gray-300">Saya mau</p>
          <Link
            className="font-semibold text-purple-400 transition duration-200 hover:text-purple-300"
            href={'/auth/signup'}
          >
            Daftar
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
