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
import { useApp } from '../../../../DataStores/AppContext'
import { saveAs } from 'file-saver'
import copy from 'copy-to-clipboard'

const caseFormats = [
  { value: 'uppercase', label: 'Uppercase' },
  { value: 'lowercase', label: 'Lowercase' },
  { value: 'sentenceCase', label: 'Sentence Case' },
  { value: 'titleCase', label: 'Title Case' },
  { value: 'capitalizedCase', label: 'Capitalized Case' },
  { value: 'camelCase', label: 'Camel Case' },
  { value: 'pascalCase', label: 'Pascal Case' },
  { value: 'snakeCase', label: 'Snake Case' },
  { value: 'constantCase', label: 'Constant Case' },
  { value: 'kebabCase', label: 'Kebab Case' },
  { value: 'trainCase', label: 'Train Case' },
  { value: 'dotCase', label: 'Dot Case' },
  { value: 'pathCase', label: 'Path Case' },
  { value: 'spaceCase', label: 'Space Case' },
  { value: 'noCase', label: 'No Case' },
  { value: 'headerCase', label: 'Header Case' },
  { value: 'toggleCase', label: 'Toggle Case' },
  { value: 'inverseCase', label: 'Inverse Case' },
  { value: 'alternatingCase', label: 'Alternating Case' },
  { value: 'flatCase', label: 'Flat Case' }
]

const getCaseLabel = (caseFormat) => {
  const selectedCase = caseFormats.find((item) => item.value === caseFormat)

  return selectedCase ? selectedCase.label : caseFormat
}

const getWords = (text) => {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_./-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((item) => item.length > 0)
}

const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

const convertTextCase = (text, caseFormat) => {
  const words = getWords(text)
  const lowerWords = words.map((item) => item.toLowerCase())

  if (caseFormat === 'uppercase') {
    return text.toUpperCase()
  }

  if (caseFormat === 'lowercase') {
    return text.toLowerCase()
  }

  if (caseFormat === 'sentenceCase') {
    const lowerText = text.toLowerCase()

    return lowerText.replace(/(^\s*[a-z]|[.!?]\s*[a-z])/g, (match) =>
      match.toUpperCase()
    )
  }

  if (caseFormat === 'titleCase') {
    return lowerWords.map((item) => capitalizeWord(item)).join(' ')
  }

  if (caseFormat === 'capitalizedCase') {
    return text.replace(/\b[a-zA-Z]/g, (match) =>
      match.toUpperCase()
    )
  }

  if (caseFormat === 'camelCase') {
    return lowerWords
      .map((item, index) =>
        index === 0 ? item : capitalizeWord(item)
      )
      .join('')
  }

  if (caseFormat === 'pascalCase') {
    return lowerWords.map((item) => capitalizeWord(item)).join('')
  }

  if (caseFormat === 'snakeCase') {
    return lowerWords.join('_')
  }

  if (caseFormat === 'constantCase') {
    return lowerWords.join('_').toUpperCase()
  }

  if (caseFormat === 'kebabCase') {
    return lowerWords.join('-')
  }

  if (caseFormat === 'trainCase') {
    return lowerWords.map((item) => capitalizeWord(item)).join('-')
  }

  if (caseFormat === 'dotCase') {
    return lowerWords.join('.')
  }

  if (caseFormat === 'pathCase') {
    return lowerWords.join('/')
  }

  if (caseFormat === 'spaceCase') {
    return lowerWords.join(' ')
  }

  if (caseFormat === 'noCase') {
    return lowerWords.join(' ')
  }

  if (caseFormat === 'headerCase') {
    return lowerWords.map((item) => capitalizeWord(item)).join('-')
  }

  if (caseFormat === 'toggleCase') {
    return text
      .split('')
      .map((item) =>
        item === item.toUpperCase()
          ? item.toLowerCase()
          : item.toUpperCase()
      )
      .join('')
  }

  if (caseFormat === 'inverseCase') {
    return text
      .split('')
      .map((item) =>
        item === item.toUpperCase()
          ? item.toLowerCase()
          : item.toUpperCase()
      )
      .join('')
  }

  if (caseFormat === 'alternatingCase') {
    return text
      .split('')
      .map((item, index) =>
        index % 2 === 0
          ? item.toLowerCase()
          : item.toUpperCase()
      )
      .join('')
  }

  if (caseFormat === 'flatCase') {
    return lowerWords.join('')
  }

  return text
}

const downloadCSV = (
  summary,
  caseBreakdown
) => {
  let csv = ''

  csv += `Input Text,${summary.inputText}\n`
  csv += `Selected Case,${summary.selectedCase}\n`
  csv += `Converted Text,${summary.convertedText}\n`
  csv += `Words,${summary.words}\n`
  csv += `Input Characters,${summary.inputCharacters}\n`
  csv += `Converted Characters,${summary.convertedCharacters}\n\n`

  csv +=
    'Case Format,Converted Text,Characters\n'

  caseBreakdown.forEach((row) => {
    csv += `${row.caseFormat},${row.convertedText},${row.characters}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'case-conversion.csv')
}
export default function CaseConverterPage() {
  const {
    setAlert,
    setPageLoaderShow
  } = useApp()

  const [textValue, setTextValue] = useState(
    'This is a sample text for Case Converter'
  )
  const [caseFormat, setCaseFormat] =
    useState('camelCase')

  const [isTextValueInvalid, setIsTextValueInvalid] =
    useState(false)

  const [convertedText, setConvertedText] = useState('')
  const [words, setWords] = useState(0.0)
  const [inputCharacters, setInputCharacters] = useState(0.0)
  const [convertedCharacters, setConvertedCharacters] = useState(0.0)

  const [caseBreakdown, setCaseBreakdown] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = caseBreakdown.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateCaseOnClickHandler = () => {
    const text = textValue

    if (
      isTextValueInvalid
    ) {
      return
    }

    const converted =
      convertTextCase(text, caseFormat)

    const wordCount =
      getWords(text).length

    const inputCharacterCount =
      text.length

    const convertedCharacterCount =
      converted.length

    setConvertedText(converted)
    setWords(wordCount)
    setInputCharacters(inputCharacterCount)
    setConvertedCharacters(convertedCharacterCount)

    const options = {
      text
    }

    const result = generateCaseBreakdown(options)

    setCaseBreakdown(result)
  }
    const generateCaseBreakdown = ({
    text
  }) => {
    const schedule = []

    caseFormats.forEach((item) => {
      const converted =
        convertTextCase(text, item.value)

      schedule.push({
        caseFormat: item.label,
        convertedText: converted,
        characters: Number(converted.length.toFixed(2))
      })
    })

    return schedule
  }
  const handleCopyToClipboard = () => {
    try {
      copy(convertedCharacters)
      setAlert({ message: 'Copied to clipboard', duration: 5000, severity: 'success', show: true })
    } catch (err) {
      setAlert({ message: 'Failed to copy to clipboard', duration: 5000, severity: 'error', show: true })
    }
  }

  const saveCSV = () => {
    const summary = {
      inputText: textValue.replace(/\n/g, ' '),
      selectedCase: getCaseLabel(caseFormat),
      convertedText: convertedText.replace(/\n/g, ' '),
      words: words.toFixed(2),
      inputCharacters: inputCharacters.toFixed(2),
      convertedCharacters: convertedCharacters.toFixed(2)
    }

    downloadCSV(summary, caseBreakdown)
  }

  useEffect(() => {
    calculateCaseOnClickHandler()
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
              <CTypography cvariant='sh'>Case Converter Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Text'
                  fullWidth
                  multiline
                  rows={8}
                  value={textValue}
                  helperText={'Enter text to convert between case formats'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isTextValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isTextValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value

                    setTextValue(value)

                    const isInvalid =
                      value.length > 1000000

                    setIsTextValueInvalid(isInvalid)
                  }}
                />

                <CSelect
                  select
                  label='Case Format'
                  fullWidth
                  value={caseFormat}
                  onChange={(e) =>
                    setCaseFormat(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  {caseFormats.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </CSelect>

                <CButton
                  size='large'
                  label='Convert Case'
                  onClick={calculateCaseOnClickHandler}
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
                    Case Conversion Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Text is split into words and joined using the selected case format
                  </CTypography>

                  <CTypography cvariant='c'>
                    Uppercase and lowercase convert the complete text directly
                    <br />
                    Camel, pascal, snake, constant and kebab case are generated from words
                    <br />
                    Conversion table shows the same text in all available formats
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
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Converted Text
                    </CTypography>
                    <Box
                        onClick={handleCopyToClipboard}
                        sx={{
                            ':hover': {
                                cursor: 'pointer',
                                bgcolor: 'var(--s-bg-color)'
                            }
                        }}
                    >
                        <div
                            style={{
                                whiteSpace: 'normal',
                                overflowWrap: 'break-word'
                            }}

                            >
                            {convertedText}
                        </div>
                    </Box>
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
                      Words
                    </CTypography>
                    <Typography variant='h6'>
                      {words.toFixed(2)}
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
                      Input Characters
                    </CTypography>
                    <Typography variant='h6'>
                      {inputCharacters.toFixed(2)}
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
                      Converted Characters
                    </CTypography>
                    <Typography variant='h6'>
                      {convertedCharacters.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
            {/* Download Actions */}
      <Stack
        direction='row'
        spacing={2}
        mb={'4px'}
      >
        <CButton
          size='large'
          cvariant='l'
          onClick={saveCSV}
          label='Download CSV'
        />
        {/* <CButton size='large' cvariant='l' label='Download PDF' /> */}
      </Stack>

      {/* Case Conversion Table */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Case Conversion Table
        </CTypography>

        <TableContainer
          component={Paper}
          sx={{
            textAlign: 'center',
            border: '1px solid var(--p-fg-st-color)',
            boxShadow: '0 0 2500px var(--p-b-color)',
            borderRadius: '8px'
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Case Format</TableCell>
                <TableCell align='left'>Converted Text</TableCell>
                <TableCell align='right'>Characters</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.caseFormat}>
                  <TableCell align='center'>
                    {item.caseFormat}
                  </TableCell>

                  <TableCell align='left'>
                    {item.convertedText}
                  </TableCell>

                  <TableCell align='right'>
                    {item.characters?.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                <TablePagination
          component={Paper}
          count={caseBreakdown.length}
          page={page}
          sx={{
            textAlign: 'center',
            border: '1px solid var(--p-fg-st-color)',
            boxShadow: '0 0 2500px var(--p-b-color)',
            borderRadius: '8px'
          }}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPageOptions={[]}
          rowsPerPage={12}
        />
      </Box>
    </Container>
  )
}