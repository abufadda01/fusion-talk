import React, { useState } from 'react'
import bg from "@/assets/login2.png"
import Victory from "@/assets/victory.svg"
import { Tabs, TabsContent, TabsList , TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


const Auth = () => {


    const [formData , setFormData] = useState({
        email : "" ,
        password : "" ,
        confirmPassword : "" ,
    })


    const handleChange = e => {
        setFormData({...formData , [e.target.name] : e.target.value})
    }

    
    const handleLogin = async () => {

    }
    
    
    const handleRegister = async () => {

    }




  return (
    <div className='h-[100vh] flex items-center justify-center'>

        <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
            
            <div className='flex flex-col gap-3 items-center justify-center'>

                <div className='flex items-center justify-center p-5'>

                    <h1 className='text-5xl font-bold md:text-6xl'>Welcome</h1>
                    <img src={Victory} alt="" className='h-[100px]' />

                </div>

                <p className='font-medium text-center'>Fill in the details to get started with the best chat app</p>

            </div>

            <div className='flex justify-center items-center w-full'>

                <Tabs defaultValue='login' className='w-3/4'>

                    <TabsList className="bg-transparent rounded-none w-full">
                        <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-600 p-3 transition-all duration-300">Login</TabsTrigger>
                        <TabsTrigger value="register" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-600 p-3 transition-all duration-300">Register</TabsTrigger>
                    </TabsList>

                    <TabsContent  className="flex flex-col gap-5 mt-10" value="login">
                        <Input name="email" onChange={handleChange} placeholder="name@example.com" type="email" className="rounded-full p-6" value={formData.email} />
                        <Input name="password" onChange={handleChange} placeholder="********" type="password" className="rounded-full p-6" value={formData.password} />
                        <Button onClick={handleLogin} className="rounded-full p-6">Login</Button>
                    </TabsContent>


                    <TabsContent className="flex flex-col gap-5 mt-10" value="register">
                        <Input name="email" onChange={handleChange} placeholder="name@example.com" type="email" className="rounded-full p-6" value={formData.email} />
                        <Input name="password" onChange={handleChange} placeholder="password" type="password" className="rounded-full p-6" value={formData.password} />
                        <Input name="confirmPassword" onChange={handleChange} placeholder="confirm password" type="password" className="rounded-full p-6" value={formData.password} />
                        <Button onClick={handleRegister} className="rounded-full p-6">Register</Button>
                    </TabsContent>
                
                </Tabs>

            </div>

        </div>

        {/* <div className='hidden xl:flex justify-center items-center'>
            <img src={bg} className='h-[600px]' alt="" />
        </div> */}

    </div>
  )
}


export default Auth