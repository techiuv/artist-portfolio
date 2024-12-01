import { useState } from 'react'
import Navbar from './component/Navbar'
import Cards from './component/Cards'
import Form from './component/Form'
import './App.css'

function App() {

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <section id='home' className='w-[100vw] h-[100vh] relative flex justify-center items-center'>
          <div className='mx-auto relative h-[100%]'>
            <img src="/img/Firefly 20240729100151 2.png" alt="Artist Yuvraj" className='h-[100%]' />
            <div className="bg-gradient-to-b from-transparent to-[#070707] h-32 w-full absolute bottom-0 left-0"></div>
          </div>
          <div className='absolute h-[100%] w-[100%] text-[10vw] text-center flex justify-center items-center text-transparent  top-0 left-0  -z-10 '>
            <h3 className='text-stroke-1 opacity-50 uppercase font-bold text-[380px] md:text-[700px] lg:text-[150px] text-gradient-stroke'>Artist&nbsp;&nbsp;&nbsp;Yuvraj</h3>
          </div>


        </section>


        <section id='about' className='w-[100vw]'>
          <p className='text-center w-[65%] mx-auto text-3xl text-[#BDBDBD] my-16 font-normal'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto provident aliquam itaque tempore aliquid aut impedit dolores atque quo, distinctio quasi aperiam. Voluptatem dolor ullam assumenda? Dicta quia accusamus unde.
          </p>
        </section>

        <section id='portfolio'>

          <h3 className='text-center mx-auto text-[128px] font-bold drop-shadow-md uppercase'>featured Work</h3>

          <div className='w-[80%] mx-auto'>

            <Cards title={'tittle'} description={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto provident aliquam itaque tempore aliquid aut impedit dolores atque quo, distinctio quasi aperiam. Voluptatem dolor ullam assumenda? Dicta quia accusamus unde.'} year={2024} medium={'charcoal'} path={'/img/'} />

            <Cards title={'tittle'} description={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto provident aliquam itaque tempore aliquid aut impedit dolores atque quo, distinctio quasi aperiam. Voluptatem dolor ullam assumenda? Dicta quia accusamus unde.'} year={2024} medium={'charcoal'} path={'/img/'} />
          </div>

        </section>
        <section id='contact'>
          <Form />
        </section>
      </main>
    </>
  )
}

export default App
