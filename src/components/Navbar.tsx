import { Icon } from "@iconify/react";
import { IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { fetchAirPollution, fetchGeocoding, mapActions } from "../app/mapSlice";
import colors from "../styles/colors";
import styles from "./Navbar.module.css";
import { uiActions } from "../app/uiSlice";

function Navbar() {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const [searchCity, setSearchCity] = useState<string>("")
  const [hasError, setHasError] = useState<boolean>(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value
    setSearchCity(text)
  }

  const handleSearch = () => {
    const valid = /^[a-zA-Z\s]*$/.test(searchCity)

    if (valid) setHasError(false)
    else {
      setHasError(true)
      enqueueSnackbar("Invalid input")
      return
    }

    dispatch(mapActions.setZoom(3))
    dispatch(mapActions.setMarker(null))
    dispatch(uiActions.setIsLoading(true))

    dispatch(fetchGeocoding(searchCity))
      .unwrap()
      .then((geoRes) => {
        if (geoRes.length) {
          const data = geoRes[0]
          dispatch(mapActions.setCenter([data.lat, data.lon]))
          dispatch(mapActions.setMarker([data.lat, data.lon]))
          dispatch(fetchAirPollution([data.lat, data.lon]))
            .unwrap()
            .then(() => {
              setTimeout(() => dispatch(uiActions.setIsLoading(false)), 1000)
            })
        } else {
          enqueueSnackbar("No city found. Please try again.")
          setTimeout(() => dispatch(uiActions.setIsLoading(false)), 1000)
        }
      })
  }

  return (
    <div className={styles.container}>
      <Typography variant="h6">Air Quality Index</Typography>
      <TextField
        autoFocus
        error={hasError}
        id="city-name"
        size="small"
        type="text"
        variant="outlined"
        autoComplete="off"
        placeholder="Search City"
        value={searchCity}
        onChange={handleInputChange}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') handleSearch()
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Icon
                    onClick={handleSearch}
                    color={colors.white}
                    icon="material-symbols:search"
                    fontSize={20} />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
        sx={{
          '.MuiOutlinedInput-root': {
            color: colors.white,
            borderRadius: 30,
            '& fieldset': {
              borderColor: colors.white,
            },
            '&:hover fieldset': {
              borderColor: colors.blue,
            },
          },
        }}
      />
    </div>
  )
}

export default Navbar;
