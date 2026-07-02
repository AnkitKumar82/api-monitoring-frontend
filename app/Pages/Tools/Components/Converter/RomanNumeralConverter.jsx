import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material'

import CTextField from '../../../../Components/CTextField'
import CTypography from '../../../../Components/CTypography'
import CButton from '../../../../Components/CButton'
import CSelect from '../../../../Components/CSelect'
import { saveAs } from 'file-saver'

const romanSymbols = [
  { symbol: 'M', value: 1000 },
  { symbol: 'CM', value: 900 },
  { symbol: 'D', value: 500 },
  { symbol: 'CD', value: 400 },
  { symbol: 'C', value: 100 },
  { symbol: 'XC', value: 90 },
  { symbol: 'L', value: 50 },
  { symbol: 'XL', value: 40 },
  { symbol: 'X', value: 10 },
  { symbol: 'IX', value: 9 },
  { symbol: 'V', value: 5 },
  { symbol: 'IV', value: 4 },
  { symbol: 'I', value: 1 }
]

export default function RomanNumeralConverterPage() {
  const [conversionType, setConversionType] =
    useState('numberToRoman')
  const [numberValue, setNumberValue] = useState(100)
  const [romanValue, setRomanValue] = useState('C')

  const [isNumberValueInvalid, setIsNumberValueInvalid] =
    useState(false)
  const [isRomanValueInvalid, setIsRomanValueInvalid] =
    useState(false)

  const [convertedNumber, setConvertedNumber] = useState(0.0)
  const [convertedRoman, setConvertedRoman] = useState('')
  const [isValidRoman, setIsValidRoman] = useState('Yes')

    const convertNumberToRoman = (number) => {
    let num = number
    let roman = ''

    romanSymbols.forEach((item) => {
      while (num >= item.value) {
        roman += item.symbol
        num -= item.value
      }
    })

    return roman
  }
    const validateRomanNumeral = (roman) => {
    const romanRegex =
      /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/

    return romanRegex.test(roman) && roman.length > 0
  }
    const convertRomanToNumber = (roman) => {
    let index = 0
    let total = 0

    romanSymbols.forEach((item) => {
      while (roman.substring(index, index + item.symbol.length) === item.symbol) {
        total += item.value
        index += item.symbol.length
      }
    })

    return total
  }
    const calculateRomanOnClickHandler = () => {
    const numNumberValue = parseFloat(numberValue)
    const cleanRomanValue = romanValue.toUpperCase().replace(/\s/g, '')

    if (
      isNumberValueInvalid ||
      isRomanValueInvalid ||
      (conversionType === 'numberToRoman' &&
        (numNumberValue <= 0 ||
          numNumberValue > 3999 ||
          numNumberValue % 1 !== 0)) ||
      (conversionType === 'romanToNumber' &&
        !validateRomanNumeral(cleanRomanValue))
    ) {
      return
    }

    let resultNumber = 0
    let resultRoman = ''
    let validRoman = 'Yes'

    if (conversionType === 'numberToRoman') {
      resultNumber = numNumberValue
      resultRoman = convertNumberToRoman(numNumberValue)
    } else {
      resultRoman = cleanRomanValue
      resultNumber = convertRomanToNumber(cleanRomanValue)
      validRoman = validateRomanNumeral(cleanRomanValue) ? 'Yes' : 'No'
    }

    setConvertedNumber(resultNumber)
    setConvertedRoman(resultRoman)
    setIsValidRoman(validRoman)

    const options = {
      romanNumeral: resultRoman
    }

  }

  useEffect(() => {
    calculateRomanOnClickHandler()
  }, [])

  return (    <Container>
      {/* Calculator */}
      <Grid container spacing={3} mb={4}>
        {/* Inputs */}
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              transition: '0.2s',
              border: '1px solid var(--p-fg-st-color)',
              boxShadow: '0 0 2500px var(--p-b-color)',
              borderRadius: '8px'
            }}
          >
            <CardContent>
              <CTypography cvariant='sh'>Roman Numeral Details</CTypography>

              <Stack spacing={3}>
                <CSelect
                  select
                  label='Conversion Type'
                  fullWidth
                  value={conversionType}
                  onChange={(e) =>
                    setConversionType(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='numberToRoman'>Number To Roman</MenuItem>
                  <MenuItem value='romanToNumber'>Roman To Number</MenuItem>
                </CSelect>

                {conversionType === 'numberToRoman' && (
                  <CTextField
                    label='Number Value'
                    fullWidth
                    value={numberValue.toLocaleString()}
                    helperText={'0 < Number <= 3999'}
                    helperTextStyle={{ pl: '4px' }}
                    sx={{
                      border: isNumberValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                      borderRadius: '8px',
                      ':hover': {
                        border: isNumberValueInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                      }
                    }}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/,/g, '')
                      const num = Number(rawValue)

                      if (!isNaN(num)) {
                        setNumberValue(num)

                        const isInvalid =
                          num <= 0 ||
                          num > 3999 ||
                          num % 1 !== 0

                        setIsNumberValueInvalid(isInvalid)
                      } else {
                        setIsNumberValueInvalid(true)
                      }
                    }}
                  />
                )}

                {conversionType === 'romanToNumber' && (
                  <CTextField
                    label='Roman Numeral'
                    fullWidth
                    value={romanValue}
                    helperText={'Use I, V, X, L, C, D, M'}
                    helperTextStyle={{ pl: '4px' }}
                    sx={{
                      border: isRomanValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                      borderRadius: '8px',
                      ':hover': {
                        border: isRomanValueInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                      }
                    }}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase().replace(/\s/g, '')

                      if (/^[IVXLCDM]*$/.test(value)) {
                        setRomanValue(value)

                        const isInvalid =
                          !validateRomanNumeral(value)

                        setIsRomanValueInvalid(isInvalid)
                      } else {
                        setIsRomanValueInvalid(true)
                      }
                    }}
                  />
                )}

                <CButton
                  size='large'
                  label='Convert Roman Numeral'
                  onClick={calculateRomanOnClickHandler}
                />

                <Paper
                  sx={{
                    p: 2,
                    border: '1px solid var(--p-fg-st-color)',
                    boxShadow: 'none',
                    borderRadius: '8px',
                  }}
                >
                  <CTypography
                    cvariant='c'
                    sx={{ mb: '8px' }}
                  >
                    Roman Numeral Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Roman numerals are built from I, V, X, L, C, D and M
                  </CTypography>

                  <CTypography cvariant='c'>
                    Values are matched from largest to smallest
                    <br />
                    Subtractive pairs like IV, IX, XL, XC, CD and CM are supported
                    <br />
                    Standard Roman numerals support values from 1 to 3999
                  </CTypography>
                </Paper>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
                {/* Results */}
        <Grid item xs={12} md={7}>
          <Card
            sx={{
              transition: '0.2s',
              border: '1px solid var(--p-fg-st-color)',
              boxShadow: '0 0 2500px var(--p-b-color)',
              borderRadius: '8px'
            }}
          >
            <CardContent>
              <CTypography cvariant='sh'>Results</CTypography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Number Value
                    </CTypography>
                    <Typography variant='h6'>
                      {convertedNumber.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Roman Numeral
                    </CTypography>
                    <Typography variant='h6'>
                      {convertedRoman}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Valid Roman
                    </CTypography>
                    <Typography variant='h6'>
                      {isValidRoman}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}