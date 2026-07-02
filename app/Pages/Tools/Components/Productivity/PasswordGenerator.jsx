import { useState, useEffect } from 'react'
import {
  Box,
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
import { useApp } from '../../../../DataStores/AppContext'
import copy from 'copy-to-clipboard'

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const DIGITS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'
const SIMILAR = 'iIlL1oO0'
const AMBIGUOUS = '{}[]()/\\\'"`~,;:.<>'

export default function PasswordGeneratorPage() {
  const { setAlert } = useApp()

  // Inputs
  const [passwordLength, setPasswordLength] = useState(16)
  const [numberOfPasswords, setNumberOfPasswords] = useState(5)
  const [includeUppercase, setIncludeUppercase] = useState('yes')
  const [includeLowercase, setIncludeLowercase] = useState('yes')
  const [includeDigits, setIncludeDigits] = useState('yes')
  const [includeSymbols, setIncludeSymbols] = useState('yes')
  const [excludeSimilar, setExcludeSimilar] = useState('no')
  const [excludeAmbiguous, setExcludeAmbiguous] = useState('no')
  const [beginWithLetter, setBeginWithLetter] = useState('no')
  const [noConsecutive, setNoConsecutive] = useState('no')
  const [customExclude, setCustomExclude] = useState('')
  const [separatorType, setSeparatorType] = useState('none')
  const [separatorInterval, setSeparatorInterval] = useState(4)
  const [caseStyle, setCaseStyle] = useState('mixed')
  const [customPrefix, setCustomPrefix] = useState('')
  const [customSuffix, setCustomSuffix] = useState('')

  // Validation
  const [isPasswordLengthInvalid, setIsPasswordLengthInvalid] = useState(false)
  const [isNumberOfPasswordsInvalid, setIsNumberOfPasswordsInvalid] = useState(false)
  const [isSeparatorIntervalInvalid, setIsSeparatorIntervalInvalid] = useState(false)

  // Results
  const [generatedPasswords, setGeneratedPasswords] = useState([])
  const [passwordBreakdown, setPasswordBreakdown] = useState([])

  // Pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const buildCharset = () => {
    let charset = ''
    if (includeUppercase === 'yes') charset += UPPERCASE
    if (includeLowercase === 'yes') charset += LOWERCASE
    if (includeDigits === 'yes') charset += DIGITS
    if (includeSymbols === 'yes') charset += SYMBOLS

    if (excludeSimilar === 'yes') {
      charset = charset.split('').filter(c => !SIMILAR.includes(c)).join('')
    }
    if (excludeAmbiguous === 'yes') {
      charset = charset.split('').filter(c => !AMBIGUOUS.includes(c)).join('')
    }
    if (customExclude.length > 0) {
      charset = charset.split('').filter(c => !customExclude.includes(c)).join('')
    }

    return charset
  }

  const applyCase = (char) => {
    if (caseStyle === 'uppercase') return char.toUpperCase()
    if (caseStyle === 'lowercase') return char.toLowerCase()
    return char
  }

  const applySeparator = (password) => {
    if (separatorType === 'none') return password
    const sep = separatorType === 'hyphen' ? '-'
      : separatorType === 'underscore' ? '_'
      : separatorType === 'dot' ? '.'
      : separatorType === 'space' ? ' '
      : separatorType === 'pipe' ? '|'
      : ''
    const interval = Math.max(1, separatorInterval)
    const parts = []
    for (let i = 0; i < password.length; i += interval) {
      parts.push(password.slice(i, i + interval))
    }
    return parts.join(sep)
  }

  const generateSinglePassword = (charset, length) => {
    if (charset.length === 0) return ''

    const letters = (UPPERCASE + LOWERCASE).split('').filter(c => charset.includes(c))

    let attempts = 0
    while (attempts < 1000) {
      attempts++
      const chars = []

      for (let i = 0; i < length; i++) {
        chars.push(charset[Math.floor(Math.random() * charset.length)])
      }

      if (beginWithLetter === 'yes' && letters.length > 0) {
        chars[0] = letters[Math.floor(Math.random() * letters.length)]
      }

      if (noConsecutive === 'yes') {
        let hasConsecutive = false
        for (let i = 1; i < chars.length; i++) {
          if (chars[i] === chars[i - 1]) { hasConsecutive = true; break }
        }
        if (hasConsecutive) continue
      }

      return chars.map(applyCase).join('')
    }

    return charset.slice(0, length)
  }

  const calculateStrength = (password) => {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (password.length >= 16) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    if (score <= 2) return 'Weak'
    if (score <= 4) return 'Fair'
    if (score <= 5) return 'Good'
    return 'Strong'
  }

  const calculateEntropy = (charset, length) => {
    if (charset.length === 0) return 0
    return Number((length * Math.log2(charset.length)).toFixed(2))
  }

  const generatePasswords = () => {
    const numPasswords = parseFloat(numberOfPasswords)
    const numLength = parseFloat(passwordLength)
    const numInterval = parseFloat(separatorInterval)

    if (
      isPasswordLengthInvalid || isNumberOfPasswordsInvalid || isSeparatorIntervalInvalid ||
      numLength <= 0 || numPasswords <= 0 || numInterval <= 0
    ) return

    const charset = buildCharset()
    if (charset.length === 0) {
      setAlert({ message: 'Select at least one character type', duration: 5000, severity: 'error', show: true })
      return
    }

    const passwords = []
    for (let i = 0; i < numPasswords; i++) {
      const raw = generateSinglePassword(charset, numLength)
      const withSeparator = applySeparator(raw)
      const final = customPrefix + withSeparator + customSuffix
      passwords.push(final)
    }

    setGeneratedPasswords(passwords)

    // Breakdown
    const breakdown = passwords.map((pw, i) => {
      const raw = pw.replace(customPrefix, '').replace(customSuffix, '')
      const letters = (raw.match(/[A-Za-z]/g) || []).length
      const digits = (raw.match(/[0-9]/g) || []).length
      const symbols = (raw.match(/[^A-Za-z0-9]/g) || []).length
      return {
        index: i + 1,
        length: pw.length,
        letters,
        digits,
        symbols,
        strength: calculateStrength(pw),
        entropy: calculateEntropy(charset, numLength)
      }
    })

    setPasswordBreakdown(breakdown)
    setPage(0)

    const totalLetters = breakdown.reduce((s, r) => s + r.letters, 0)
    const totalDigits = breakdown.reduce((s, r) => s + r.digits, 0)
    const totalSymbols = breakdown.reduce((s, r) => s + r.symbols, 0)

  }

  const handleCopyPassword = (pw) => {
    try {
      copy(pw)
      setAlert({ message: 'Copied to clipboard', duration: 5000, severity: 'success', show: true })
    } catch {
      setAlert({ message: 'Failed to copy to clipboard', duration: 5000, severity: 'error', show: true })
    }
  }

  const handleCopyAll = () => {
    try {
      copy(generatedPasswords.join('\n'))
      setAlert({ message: 'All passwords copied', duration: 5000, severity: 'success', show: true })
    } catch {
      setAlert({ message: 'Failed to copy', duration: 5000, severity: 'error', show: true })
    }
  }

  useEffect(() => {
    generatePasswords()
  }, [])

  const strengthColor = (s) => {
    if (s === 'Strong') return 'success.main'
    if (s === 'Good') return 'info.main'
    if (s === 'Fair') return 'warning.main'
    return 'error.main'
  }

  return (
    <Container>
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
              <CTypography cvariant='sh'>Password Details</CTypography>

              <Stack spacing={3}>
                {/* Length */}
                <CTextField
                  label='Password Length'
                  fullWidth
                  value={passwordLength.toLocaleString()}
                  helperText={`0 < Length ≤ ${(128).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isPasswordLengthInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isPasswordLengthInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)'
                    }
                  }}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, '')
                    const num = Number(raw)
                    if (!isNaN(num)) {
                      setPasswordLength(num)
                      setIsPasswordLengthInvalid(num <= 0 || num > 128)
                    } else {
                      setIsPasswordLengthInvalid(true)
                    }
                  }}
                />

                {/* Number of passwords */}
                <CTextField
                  label='Number of Passwords'
                  fullWidth
                  value={numberOfPasswords.toLocaleString()}
                  helperText={`0 < Count ≤ ${(100).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isNumberOfPasswordsInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isNumberOfPasswordsInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)'
                    }
                  }}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, '')
                    const num = Number(raw)
                    if (!isNaN(num)) {
                      setNumberOfPasswords(num)
                      setIsNumberOfPasswordsInvalid(num <= 0 || num > 100)
                    } else {
                      setIsNumberOfPasswordsInvalid(true)
                    }
                  }}
                />

                {/* Include uppercase */}
                <CSelect
                  select
                  label='Include Uppercase (A–Z)'
                  fullWidth
                  value={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.value)}
                  sx={{ '.MuiOutlinedInput-notchedOutline': { border: '1px solid var(--p-fg-st-color)' } }}
                >
                  <MenuItem value='yes'>Yes</MenuItem>
                  <MenuItem value='no'>No</MenuItem>
                </CSelect>

                {/* Include lowercase */}
                <CSelect
                  select
                  label='Include Lowercase (a–z)'
                  fullWidth
                  value={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.value)}
                  sx={{ '.MuiOutlinedInput-notchedOutline': { border: '1px solid var(--p-fg-st-color)' } }}
                >
                  <MenuItem value='yes'>Yes</MenuItem>
                  <MenuItem value='no'>No</MenuItem>
                </CSelect>

                {/* Include digits */}
                <CSelect
                  select
                  label='Include Digits (0–9)'
                  fullWidth
                  value={includeDigits}
                  onChange={(e) => setIncludeDigits(e.target.value)}
                  sx={{ '.MuiOutlinedInput-notchedOutline': { border: '1px solid var(--p-fg-st-color)' } }}
                >
                  <MenuItem value='yes'>Yes</MenuItem>
                  <MenuItem value='no'>No</MenuItem>
                </CSelect>

                {/* Include symbols */}
                <CSelect
                  select
                  label='Include Symbols (!@#$…)'
                  fullWidth
                  value={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.value)}
                  sx={{ '.MuiOutlinedInput-notchedOutline': { border: '1px solid var(--p-fg-st-color)' } }}
                >
                  <MenuItem value='yes'>Yes</MenuItem>
                  <MenuItem value='no'>No</MenuItem>
                </CSelect>

                {/* Exclude similar */}
                <CSelect
                  select
                  label='Exclude Similar Characters (iIlL1oO0)'
                  fullWidth
                  value={excludeSimilar}
                  onChange={(e) => setExcludeSimilar(e.target.value)}
                  sx={{ '.MuiOutlinedInput-notchedOutline': { border: '1px solid var(--p-fg-st-color)' } }}
                >
                  <MenuItem value='no'>No</MenuItem>
                  <MenuItem value='yes'>Yes</MenuItem>
                </CSelect>

                {/* Exclude ambiguous */}
                <CSelect
                  select
                  label='Exclude Ambiguous Characters ({}[]…)'
                  fullWidth
                  value={excludeAmbiguous}
                  onChange={(e) => setExcludeAmbiguous(e.target.value)}
                  sx={{ '.MuiOutlinedInput-notchedOutline': { border: '1px solid var(--p-fg-st-color)' } }}
                >
                  <MenuItem value='no'>No</MenuItem>
                  <MenuItem value='yes'>Yes</MenuItem>
                </CSelect>

                {/* Begin with letter */}
                <CSelect
                  select
                  label='Begin With a Letter'
                  fullWidth
                  value={beginWithLetter}
                  onChange={(e) => setBeginWithLetter(e.target.value)}
                  sx={{ '.MuiOutlinedInput-notchedOutline': { border: '1px solid var(--p-fg-st-color)' } }}
                >
                  <MenuItem value='no'>No</MenuItem>
                  <MenuItem value='yes'>Yes</MenuItem>
                </CSelect>

                {/* No consecutive */}
                <CSelect
                  select
                  label='No Consecutive Duplicate Characters'
                  fullWidth
                  value={noConsecutive}
                  onChange={(e) => setNoConsecutive(e.target.value)}
                  sx={{ '.MuiOutlinedInput-notchedOutline': { border: '1px solid var(--p-fg-st-color)' } }}
                >
                  <MenuItem value='no'>No</MenuItem>
                  <MenuItem value='yes'>Yes</MenuItem>
                </CSelect>

                {/* Case style */}
                <CSelect
                  select
                  label='Letter Case Style'
                  fullWidth
                  value={caseStyle}
                  onChange={(e) => setCaseStyle(e.target.value)}
                  sx={{ '.MuiOutlinedInput-notchedOutline': { border: '1px solid var(--p-fg-st-color)' } }}
                >
                  <MenuItem value='mixed'>Mixed Case</MenuItem>
                  <MenuItem value='uppercase'>All Uppercase</MenuItem>
                  <MenuItem value='lowercase'>All Lowercase</MenuItem>
                </CSelect>

                {/* Separator type */}
                <CSelect
                  select
                  label='Separator Type'
                  fullWidth
                  value={separatorType}
                  onChange={(e) => setSeparatorType(e.target.value)}
                  sx={{ '.MuiOutlinedInput-notchedOutline': { border: '1px solid var(--p-fg-st-color)' } }}
                >
                  <MenuItem value='none'>None</MenuItem>
                  <MenuItem value='hyphen'>Hyphen ( - )</MenuItem>
                  <MenuItem value='underscore'>Underscore ( _ )</MenuItem>
                  <MenuItem value='dot'>Dot ( . )</MenuItem>
                  <MenuItem value='space'>Space</MenuItem>
                  <MenuItem value='pipe'>Pipe ( | )</MenuItem>
                </CSelect>

                {/* Separator interval */}
                {separatorType !== 'none' && (
                  <CTextField
                    label='Separator Interval (characters)'
                    fullWidth
                    value={separatorInterval.toLocaleString()}
                    helperText={`0 < Interval ≤ ${(passwordLength || 128).toLocaleString()}`}
                    helperTextStyle={{ pl: '4px' }}
                    sx={{
                      border: isSeparatorIntervalInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                      borderRadius: '8px',
                      ':hover': {
                        border: isSeparatorIntervalInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)'
                      }
                    }}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/,/g, '')
                      const num = Number(raw)
                      if (!isNaN(num)) {
                        setSeparatorInterval(num)
                        setIsSeparatorIntervalInvalid(num <= 0 || num > 128)
                      } else {
                        setIsSeparatorIntervalInvalid(true)
                      }
                    }}
                  />
                )}

                {/* Custom exclude */}
                <CTextField
                  label='Custom Characters to Exclude'
                  fullWidth
                  value={customExclude}
                  helperText='Enter any characters you want excluded'
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': { border: '1px solid var(--p-fg-st-color)' }
                  }}
                  onChange={(e) => setCustomExclude(e.target.value)}
                />

                {/* Custom prefix */}
                <CTextField
                  label='Custom Prefix'
                  fullWidth
                  value={customPrefix}
                  helperText='Prepended to every generated password'
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': { border: '1px solid var(--p-fg-st-color)' }
                  }}
                  onChange={(e) => setCustomPrefix(e.target.value)}
                />

                {/* Custom suffix */}
                <CTextField
                  label='Custom Suffix'
                  fullWidth
                  value={customSuffix}
                  helperText='Appended to every generated password'
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': { border: '1px solid var(--p-fg-st-color)' }
                  }}
                  onChange={(e) => setCustomSuffix(e.target.value)}
                />

                <CButton
                  size='large'
                  label='Generate Passwords'
                  onClick={generatePasswords}
                />

                <Paper
                  sx={{
                    p: 2,
                    border: '1px solid var(--p-fg-st-color)',
                    boxShadow: 'none',
                    borderRadius: '8px'
                  }}
                >
                  <CTypography cvariant='c' sx={{ mb: '8px' }}>
                    Password Formula
                  </CTypography>
                  <CTypography cvariant='th' sx={{ mb: '8px' }}>
                    Password = Prefix + Charset[random] × Length + Suffix
                  </CTypography>
                  <CTypography cvariant='c'>
                    Charset is built from selected character types
                    <br />
                    Entropy = Length × log₂(Charset Size)
                    <br />
                    Higher entropy = stronger password
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
                {/* Generated passwords list */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <CTypography cvariant='c'>Generated Passwords</CTypography>
                      {generatedPasswords.length > 0 && (
                        <CButton
                          size='small'
                          label='Copy All'
                          onClick={handleCopyAll}
                        />
                      )}
                    </Box>

                    <Stack spacing={1}>
                      {generatedPasswords.map((pw, i) => (
                        <Typography
                          key={i}
                          variant='body2'
                          sx={{
                            fontFamily: 'monospace',
                            p: 1,
                            borderRadius: '4px',
                            border: '1px solid var(--p-fg-st-color)',
                            wordBreak: 'break-all',
                            ':hover': {
                              cursor: 'pointer',
                              bgcolor: 'var(--s-bg-color)'
                            }
                          }}
                          onClick={() => handleCopyPassword(pw)}
                        >
                          {pw}
                        </Typography>
                      ))}
                    </Stack>
                  </Paper>
                </Grid>

                {/* Stat cards */}
                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>Total Passwords</CTypography>
                    <Typography variant='h6'>{generatedPasswords.length.toFixed(2)}</Typography>
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
                    <CTypography cvariant='c'>Charset Size</CTypography>
                    <Typography variant='h6'>{buildCharset().length.toFixed(2)}</Typography>
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
                    <CTypography cvariant='c'>Entropy (bits)</CTypography>
                    <Typography variant='h6'>
                      {calculateEntropy(buildCharset(), passwordLength).toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>Password Length</CTypography>
                    <Typography variant='h6'>{passwordLength.toFixed(2)}</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>Strength</CTypography>
                    <Typography
                      variant='h6'
                      sx={{ color: strengthColor(passwordBreakdown[0]?.strength) }}
                    >
                      {passwordBreakdown[0]?.strength ?? '—'}
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