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
import CPieChart from '../../../../Components/CPieChart'
import CSelect from '../../../../Components/CSelect'
import { saveAs } from 'file-saver'


const pieChartData = [
  { name: 'Letters', value: 0 },
  { name: 'Spaces', value: 0 },
  { name: 'Special Characters', value: 0 }
]

const downloadCSV = (
  summary,
  wordBreakdown
) => {
  let csv = ''

  csv += `Text,${summary.text}\n`
  csv += `Words,${summary.words}\n`
  csv += `Characters,${summary.characters}\n`
  csv += `Characters Without Spaces,${summary.charactersWithoutSpaces}\n`
  csv += `Capital Letters,${summary.capitalLetters}\n`
  csv += `Small Letters,${summary.smallLetters}\n`
  csv += `Numbers,${summary.numbers}\n`
  csv += `Special Characters,${summary.specialCharacters}\n`
  csv += `Spaces,${summary.spaces}\n`
  csv += `Sentences,${summary.sentences}\n`
  csv += `Paragraphs,${summary.paragraphs}\n\n`

  csv +=
    'Metric,Count,Percentage\n'

  wordBreakdown.forEach((row) => {
    csv += `${row.metric},${row.count},${row.percentage}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'word-count.csv')
}
export default function WordCounterPage() {
  const [textValue, setTextValue] = useState(
    'This is a sample paragraph.\nIt has words, letters, spaces and special characters!'
  )

  const [isTextValueInvalid, setIsTextValueInvalid] =
    useState(false)

  const [words, setWords] = useState(0.0)
  const [characters, setCharacters] = useState(0.0)
  const [charactersWithoutSpaces, setCharactersWithoutSpaces] = useState(0.0)
  const [capitalLetters, setCapitalLetters] = useState(0.0)
  const [smallLetters, setSmallLetters] = useState(0.0)
  const [numbers, setNumbers] = useState(0.0)
  const [specialCharacters, setSpecialCharacters] = useState(0.0)
  const [spaces, setSpaces] = useState(0.0)
  const [sentences, setSentences] = useState(0.0)
  const [paragraphs, setParagraphs] = useState(0.0)

  const [pieChart, setPieChart] =
    useState(pieChartData)

  const [wordBreakdown, setWordBreakdown] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = wordBreakdown.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateWordCounterOnClickHandler = () => {
    const text = textValue

    if (
      isTextValueInvalid
    ) {
      return
    }

    const wordCount =
      text.trim().length > 0
        ? text.trim().split(/\s+/).length
        : 0

    const characterCount =
      text.length

    const characterWithoutSpaceCount =
      text.replace(/\s/g, '').length

    const capitalLetterCount =
      (text.match(/[A-Z]/g) || []).length

    const smallLetterCount =
      (text.match(/[a-z]/g) || []).length

    const numberCount =
      (text.match(/[0-9]/g) || []).length

    const specialCharacterCount =
      (text.match(/[^A-Za-z0-9\s]/g) || []).length

    const spaceCount =
      (text.match(/ /g) || []).length

    const sentenceCount =
      text.trim().length > 0
        ? text.split(/[.!?]+/).filter((item) => item.trim().length > 0).length
        : 0

    const paragraphCount =
      text.trim().length > 0
        ? text.split(/\n+/).filter((item) => item.trim().length > 0).length
        : 0

    setWords(wordCount)
    setCharacters(characterCount)
    setCharactersWithoutSpaces(characterWithoutSpaceCount)
    setCapitalLetters(capitalLetterCount)
    setSmallLetters(smallLetterCount)
    setNumbers(numberCount)
    setSpecialCharacters(specialCharacterCount)
    setSpaces(spaceCount)
    setSentences(sentenceCount)
    setParagraphs(paragraphCount)

    setPieChart([
      {
        name: 'Letters',
        value: capitalLetterCount + smallLetterCount
      },
      {
        name: 'Spaces',
        value: spaceCount
      },
      {
        name: 'Numbers',
        value: numberCount
      },
      {
        name: 'Special Characters',
        value: specialCharacterCount
      }
    ])

    const options = {
      words: wordCount,
      characters: characterCount,
      charactersWithoutSpaces: characterWithoutSpaceCount,
      capitalLetters: capitalLetterCount,
      smallLetters: smallLetterCount,
      numbers: numberCount,
      specialCharacters: specialCharacterCount,
      spaces: spaceCount,
      sentences: sentenceCount,
      paragraphs: paragraphCount
    }

    const result = generateWordBreakdown(options)

    setWordBreakdown(result)
  }
    const generateWordBreakdown = ({
    words,
    characters,
    charactersWithoutSpaces,
    capitalLetters,
    smallLetters,
    numbers,
    specialCharacters,
    spaces,
    sentences,
    paragraphs
  }) => {
    const schedule = []

    const totalCharacters =
      characters > 0 ? characters : 1

    schedule.push({
      metric: 'Words',
      count: Number(words.toFixed(2)),
      percentage: Number((0).toFixed(2))
    })

    schedule.push({
      metric: 'Characters',
      count: Number(characters.toFixed(2)),
      percentage: Number((100).toFixed(2))
    })

    schedule.push({
      metric: 'Characters Without Spaces',
      count: Number(charactersWithoutSpaces.toFixed(2)),
      percentage: Number((charactersWithoutSpaces / totalCharacters * 100).toFixed(2))
    })

    schedule.push({
      metric: 'Capital Letters',
      count: Number(capitalLetters.toFixed(2)),
      percentage: Number((capitalLetters / totalCharacters * 100).toFixed(2))
    })

    schedule.push({
      metric: 'Small Letters',
      count: Number(smallLetters.toFixed(2)),
      percentage: Number((smallLetters / totalCharacters * 100).toFixed(2))
    })

    schedule.push({
      metric: 'Numbers',
      count: Number(numbers.toFixed(2)),
      percentage: Number((numbers / totalCharacters * 100).toFixed(2))
    })

    schedule.push({
      metric: 'Special Characters',
      count: Number(specialCharacters.toFixed(2)),
      percentage: Number((specialCharacters / totalCharacters * 100).toFixed(2))
    })

    schedule.push({
      metric: 'Spaces',
      count: Number(spaces.toFixed(2)),
      percentage: Number((spaces / totalCharacters * 100).toFixed(2))
    })

    schedule.push({
      metric: 'Sentences',
      count: Number(sentences.toFixed(2)),
      percentage: Number((0).toFixed(2))
    })

    schedule.push({
      metric: 'Paragraphs',
      count: Number(paragraphs.toFixed(2)),
      percentage: Number((0).toFixed(2))
    })

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      text: textValue.replace(/\n/g, ' '),
      words: words.toFixed(2),
      characters: characters.toFixed(2),
      charactersWithoutSpaces: charactersWithoutSpaces.toFixed(2),
      capitalLetters: capitalLetters.toFixed(2),
      smallLetters: smallLetters.toFixed(2),
      numbers: numbers.toFixed(2),
      specialCharacters: specialCharacters.toFixed(2),
      spaces: spaces.toFixed(2),
      sentences: sentences.toFixed(2),
      paragraphs: paragraphs.toFixed(2)
    }

    downloadCSV(summary, wordBreakdown)
  }

  useEffect(() => {
    calculateWordCounterOnClickHandler()
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
              <CTypography cvariant='sh'>Word Counter Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Text'
                  fullWidth
                  multiline
                  rows={10}
                  value={textValue}
                  helperText={'Enter text to count words, characters, sentences and paragraphs'}
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

                <CButton
                  size='large'
                  label='Count Words'
                  onClick={calculateWordCounterOnClickHandler}
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
                    Word Counter Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Words = Text split by spaces and line breaks
                  </CTypography>

                  <CTypography cvariant='c'>
                    Characters are counted from total text length
                    <br />
                    Capital letters, small letters, numbers and special characters are matched separately
                    <br />
                    Sentences and paragraphs are counted using punctuation and line breaks
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
                      Characters
                    </CTypography>
                    <Typography variant='h6'>
                      {characters.toFixed(2)}
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
                      Without Spaces
                    </CTypography>
                    <Typography variant='h6'>
                      {charactersWithoutSpaces.toFixed(2)}
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
                      Capital Letters
                    </CTypography>
                    <Typography variant='h6'>
                      {capitalLetters.toFixed(2)}
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
                      Small Letters
                    </CTypography>
                    <Typography variant='h6'>
                      {smallLetters.toFixed(2)}
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
                      Special Characters
                    </CTypography>
                    <Typography variant='h6'>
                      {specialCharacters.toFixed(2)}
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
                      Spaces
                    </CTypography>
                    <Typography variant='h6'>
                      {spaces.toFixed(2)}
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
                      Sentences
                    </CTypography>
                    <Typography variant='h6'>
                      {sentences.toFixed(2)}
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
                      Paragraphs
                    </CTypography>
                    <Typography variant='h6'>
                      {paragraphs.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Chart Placeholder */}
              <Paper
                sx={{
                  mt: 3,
                  p: 4,
                  textAlign: 'center',
                  border: '1px solid var(--p-fg-st-color)',
                  boxShadow: '0 0 2500px var(--p-b-color)',
                  borderRadius: '8px'
                }}
              >
                <CPieChart data={pieChart} />
              </Paper>
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

      {/* Word Counter Breakdown */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Word Counter Breakdown
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
                <TableCell align='center'>Metric</TableCell>
                <TableCell align='right'>Count</TableCell>
                <TableCell align='right'>Percentage</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.metric}>
                  <TableCell align='center'>
                    {item.metric}
                  </TableCell>

                  <TableCell align='right'>
                    {item.count?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    {item.percentage?.toLocaleString()}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                <TablePagination
          component={Paper}
          count={wordBreakdown.length}
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