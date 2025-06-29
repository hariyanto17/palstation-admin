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
      username: '',
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
    <div className="flex flex-col gap-5 px-3 py-7">
      <div className="">
        <div className="flex items-center justify-center">
          <Image src="/images/app-logo.png" alt="logo" width={36} height={36} />
        </div>
        <h1 className="text-gradient text-2xl font-bold">Daftar</h1>
        <p className="text-xs font-normal text-[#9693A5]">
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
        <Input
          label="Kode undangan"
          description="kosongkan jika tidak ada"
          value={formData.inviteCode}
          name="inviteCode"
          onChange={handleChange}
          error={errors.inviteCode}
        />
        <Button type="submit">{isSubmitting ? 'Mendaftar' : 'Daftar'}</Button>
        <div className="flex gap-0.5">
          <p className="text-white">saya mau</p>
          <Link className="font-semibold text-purple-600" href={'/auth/signin'}>
            Masuk
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
