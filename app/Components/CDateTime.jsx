import * as React from 'react'
import {
  Typography,
  Stack,
  InputAdornment
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import CTextField from './CTextField'

export default function CDateTime(props) {
  const {
    label = '',
    labelStyle = {},
    cvariant = 'p',
    placeholder = '',
    sx={},
    style={},
    helperText = '',
    helperTextStyle = {},
    startIcon: StartIcon,
    endIcon: EndIcon,
    rounded = false,
    ...baseProps
  } = props

  const dateTimePickerFieldStyle = {...sx, ...style}
  let variantStyle = {}

  switch(cvariant) {
    case 'secondary':
    case 's':
      variantStyle = {
        bgcolor: 'transparent',
        border: '1px solid var(--s-bg-color)',
        ':focus-within': {
          border: '1px solid var(--p-b-color)'
        }
      }
      break
      default:
        variantStyle = {
          bgcolor: 'var(--s-bg-color)',
          border: '1px solid var(--s-bg-color)',
          ':focus-within': {
            border: '1px solid var(--p-b-color)'
          }
        }
    }

  return (
    <Stack
      direction='column'
      justifyContent='flex-start'
      alignItems='flex-start'
    >
      {
        label && 
        <Typography
          sx={{
            mb: '4px',
            color: 'var(--s-fg-color)',
            fontSize: '0.7rem',
            fontStyle: 'normal',
            fontWeight: '500',
            ...labelStyle
          }}
          variant='body2'
        >
          {label}
        </Typography>
      }
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker
          disableRipple
          size='small'
          variant='outlined'
          orientation='landscape'
          
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock
          }}

          sx={{
            borderRadius: '0px',
            ...(rounded && { borderRadius: '99999px' }),
            minHeight: '24px',
            '& .MuiInput-underline:after': { border: 'none' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: 'none' },
            },
            ...variantStyle,
            ...dateTimePickerFieldStyle  
          }}
          PopperProps={{
            sx: {
              '&.MuiPickersPopper-root': {
                border: '4px solid red',
              },
            },
          }}
          slotProps={{
            textField: {
              placeholder,
              InputProps: {
                endAdornment:
                  <InputAdornment position='end'>
                    <CalendarMonthRoundedIcon
                      sx={{
                        width: '16px',
                        height: '16px',
                        color: 'var(--t-fg-color)'
                      }}
                    />
                  </InputAdornment>
              },
              inputProps: {
                style: {
                  color: 'var(--p-fg-color)',
                  fontSize: '0.8rem',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  padding: '8px 16px'
                }
              }
            }
          }}
          {...baseProps}
        />
      </LocalizationProvider>
      {
        helperText && 
        <Typography
          sx={{
            mt: '4px',
            color: 'var(--t-fg-color)',
            fontSize: '0.7rem',
            fontStyle: 'normal',
            fontWeight: '400',
            ...helperTextStyle
          }}
          variant='body2'
        >
          {helperText}
        </Typography>
      }
    </Stack>
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <DemoContainer components={['DateTimePicker']}>
    //     <DateTimePicker label='Basic date time picker' />
    //   </DemoContainer>
    // </LocalizationProvider>
  )
}