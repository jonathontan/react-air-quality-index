import { Icon } from "@iconify/react";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { uiActions } from "../app/uiSlice";
import Map from "../components/Map";
import constants from "../constants";
import { FetchStatus } from "../enum/enums";
import styles from "./MainPage.module.css";

function MainPage() {
  const dispatch = useAppDispatch()
  const mobileBreakpoint = useMediaQuery(`(max-width: ${constants.mobileBreakpoint}px`)
  const tabletBreakpoint = useMediaQuery(`(max-width: ${constants.tabletBreakpoint}px`)
  const fetchStatus = useAppSelector(state => state.map.fetchStatus)
  const isLoading = useAppSelector(state => state.ui.isLoading)

  useEffect(() => {
    dispatch(uiActions.setMobileBreakpoint(mobileBreakpoint))
  }, [mobileBreakpoint])

  useEffect(() => {
    dispatch(uiActions.setTabletBreakpoint(tabletBreakpoint))
  }, [tabletBreakpoint])

  return (
    <div className={styles.container}>
      {(fetchStatus === FetchStatus.LOADING || isLoading) && (
        <div className={styles.loading}>
          <Icon icon="eos-icons:loading" fontSize={40} />
        </div>
      )}
      <Map />
    </div>
  )
}

export default MainPage