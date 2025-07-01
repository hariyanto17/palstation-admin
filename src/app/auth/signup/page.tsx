'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import { useForm } from '@/hooks/useForm'
import Image from 'next/image'
import { validateSignup } from './validation'
import { useRouter } from 'next/navigation'
import { SignUpFormValues } from './interface'
import { errorMessage } from '@/utils/errorMessage'
import Link from 'next/link'

const Signup = () => {
  const router = useRouter()

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setErrors,
    resetForm,
  } = useForm<SignUpFormValues>(
    {
      name: '',
      email: '',
      password: '',
      inviteCode: '',
    },
    validateSignup
  )

  const onSubmit = async (values: SignUpFormValues) => {
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
      router.push('/auth/signin')
    } catch (error: unknown) {
      const message = errorMessage(error)
      setErrors((prev) => ({
        ...prev,
        form: message,
      }))
    }
  }

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
            selamat datang di rental PS terbaik di bone
          </p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nama"
            value={formData.name}
            name="name"
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Username"
            value={formData.email}
            name="username"
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            error={errors.password}
          />
          <Input
            label="Kode undangan"
            description="kosongkan jika tidak ada"
            value={formData.inviteCode}
            name="inviteCode"
            onChange={handleChange}
            error={errors.inviteCode}
          />
          <Button type="submit">{isSubmitting ? 'Mendaftar' : 'Daftar'}</Button>
          <div className="mt-2 flex justify-center gap-1 text-gray-200">
            <p className="text-white">saya mau</p>
            <Link
              className="font-semibold text-purple-600"
              href={'/auth/signin'}
            >
              Masuk
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
