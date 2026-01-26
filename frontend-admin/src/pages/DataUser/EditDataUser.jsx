import React from 'react'
import styles from "../../style";
import { FormEditUser } from '../../components/DataUser'
import { Footer, Navbar } from '../../components/General'

const EditDataUser = () => {
  return (
    <div className="bg-white w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-white ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <FormEditUser />
      </div>
    </div>

    <div className={`gray-bg mt-20  ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer />
      </div>
    </div>
  </div>
  )
}

export default EditDataUser