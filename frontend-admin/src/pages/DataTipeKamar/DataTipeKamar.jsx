import React from 'react'
import styles from "../../style";
import {Navbar, Footer} from '../../components/General';
import { Table } from '../../components/DataTipeKamar';

const DataTipeKamar = () => {
  return (
    <div className="bg-white w-full overflow-hidden"> 
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-white ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Table />
        </div>
      </div>

      <div className={`gray-bg mt-12 ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>  
    </div>
  )
}

export default DataTipeKamar