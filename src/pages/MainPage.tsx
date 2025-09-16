import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import constants from "../constants";
import styles from "./MainPage.module.css";
import { uiActions } from "../app/uiSlice";

function MainPage() {
  const dispatch = useAppDispatch()
  const mobileBreakpoint = useMediaQuery(`(max-width: ${constants.mobileBreakpoint}px`)
  const tabletBreakpoint = useMediaQuery(`(max-width: ${constants.tabletBreakpoint}px`)

  useEffect(() => {
    dispatch(uiActions.setMobileBreakpoint(mobileBreakpoint))
  }, [mobileBreakpoint])

  useEffect(() => {
    dispatch(uiActions.setTabletBreakpoint(tabletBreakpoint))
  }, [tabletBreakpoint])

  return (
    <div className={styles.container}>
      123
    </div>
  )
}

export default MainPage