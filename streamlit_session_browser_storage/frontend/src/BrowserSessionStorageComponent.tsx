import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
  ComponentProps
} from "streamlit-component-lib"
import React, { useEffect, useMemo, useState } from "react"
import useSessionStorageState from 'use-session-storage-state'

const BrowserSessionStorageComponent: React.FC<ComponentProps> = (props: any) => {

  const { args } = props
  const method: any = args["method"]
  const itemKey: any = args["itemKey"]
  const itemValue: any = args["itemValue"]
  const sessionStrageOptions: any = args["sessionStrageOptions"] || { defaultValue: null }
  const [storageItems, setStorageItems, { removeItem, isPersistent }] = useSessionStorageState<any>(itemKey, sessionStrageOptions)

  const setItemF = (itemKey: any, itemValue: any) => {

    let toSave = { [itemKey]: itemValue }
    setStorageItems(toSave)
  }

  const deleteAll = () => {
    sessionStorage.clear();
    return true
  }

  const getAll = () => {
    const toSendToStreamlit = { ...sessionStorage }
    return toSendToStreamlit
  }

  const eraseItem = (itemKey: any) => {
    sessionStorage.removeItem(itemKey)
  }

  useEffect(() => {

    switch (method) {
      case "getItem":

        Streamlit.setComponentReady()
        Streamlit.setComponentValue(storageItems)

        break
      case "setItem":

        setItemF(itemKey, itemValue)
        break
      case "deleteItem":

        removeItem()
        break
      case "eraseItem":
        eraseItem(itemKey)
        break

      case "deleteAll":
        deleteAll()
        break

      case "getAll":
        const allStored = getAll()
        Streamlit.setComponentReady()
        Streamlit.setComponentValue(allStored)

        break

      default:
        break
    }


  }, [method, setStorageItems, storageItems])


  return (
    <div style={{ display: "none" }} >
    </div>
  )
}

export default withStreamlitConnection(BrowserSessionStorageComponent)


