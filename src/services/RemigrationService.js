import webApi from "./webApi/webApi";
import { dateFormate, timestamp } from "../views/Pages/HelperComponent/utils";

export const RemigrationCustomer = async (fy, onSuccess, onFailure) => {
  try {
    const res = await webApi.post('/fyMigrate/financialYearDataMigration/customerRemigration', {
      fy: fy
    })

    onSuccess(res.data)
  } catch (error) {
    onFailure(error)
  }
}

export const RemigrationVendor = async (fy, onSuccess, onFailure) => {
  try {
    const res = await webApi.post('/fyMigrate/financialYearDataMigration/vendorRemigration', {
      fy: fy
    })

    onSuccess(res.data)
  } catch (error) {
    onFailure(error)
  }
}

export const RemigrationItem = async (fy, onSuccess, onFailure) => {
  try {
    const res = await webApi.post('/fyMigrate/financialYearDataMigration/itemRemigration', {
      fy: fy
    })

    const resCat = await webApi.post('/fyMigrate/financialYearDataMigration/catRemigration', {
      fy: fy
    })

    const resBrand = await webApi.post('/fyMigrate/financialYearDataMigration/brandRemigration', {
      fy: fy
    })
    onSuccess(res.data)
  } catch (error) {
    onFailure(error)
  }
}

export const RemigrationLedger = async (fy, onSuccess, onFailure) => {
  try {
    const res = await webApi.post('/fyMigrate/financialYearDataMigration/ledgerAccountRemigrate', {
      fy: fy
    })
    onSuccess(res.data)
  } catch (error) {
    onFailure(error)
  }
}