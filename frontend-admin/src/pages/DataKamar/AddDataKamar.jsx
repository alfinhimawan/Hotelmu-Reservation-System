import React from 'react'
import styles from "../../style";
import { Navbar, Footer } from '../../components/General';
import { FormTambahDataKamar } from '../../components/DataKamar';

const AddDataKamar = () => {
  return (
    <div className="bg-white w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-white ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
            <FormTambahDataKamar />
        </div>
      </div>

      <div className={`gray-bg mt-20  ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth} fixed bottom-0`}>
          <Footer />
        </div>
      </div>  
    </div>
  )
}

export default AddDataKamar