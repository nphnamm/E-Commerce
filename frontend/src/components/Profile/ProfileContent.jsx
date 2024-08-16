import React, { useState } from 'react'
import { backend_url } from '../../server'
import { useSelector } from 'react-redux'
import { AiOutlineCamera } from 'react-icons/ai'
import styles from '../../styles/styles'

const ProfileContent = ({active}) => {
  const {user} = useSelector((state) => state.user)
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();



  const handleSubmit = (e) =>{

  }
  const handleImage = () =>{

  }
  console.log('check avatar', user);
  return (
    <div className='w-full'>
      
      {/* Profile Page */}
      {active ===1 &&
      (
        <>
        <div className='flex justify-center w-full'>
            <div className='relative'>
              <img src={`${backend_url}${user?.avatar}`} className='w-[35px] h-[35px] rounded-full' alt=''/>
              <div className='w-[30px] h-[30px] bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]'>
                  <input
                  type='file'
                  id='image'
                  className='hidden'
                  onChange={handleImage}
                  />
                  <label htmlFor='image'>
                    <AiOutlineCamera/>
                  </label>
              </div>
            </div>
        </div>
        <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>

        
      )}
    </div>
  )
}

export default ProfileContent
