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
import { useApp } from '../../../../DataStores/AppContext'
import copy from 'copy-to-clipboard'

const pieChartData = [
  { name: 'Words', value: 0 },
  { name: 'Characters', value: 0 }
]

const loremWords = [
  'lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua',
  'enim',
  'ad',
  'minim',
  'veniam',
  'quis',
  'nostrud',
  'exercitation',
  'ullamco',
  'laboris',
  'nisi',
  'aliquip',
  'ex',
  'ea',
  'commodo',
  'consequat',
  'duis',
  'aute',
  'irure',
  'in',
  'reprehenderit',
  'voluptate',
  'velit',
  'esse',
  'cillum',
  'fugiat',
  'nulla',
  'pariatur',
  'excepteur',
  'sint',
  'occaecat',
  'cupidatat',
  'non',
  'proident',
  'sunt',
  'culpa',
  'qui',
  'officia',
  'deserunt',
  'mollit',
  'anim',
  'id',
  'est',
  'laborum'
]

export default function LoremIpsumGeneratorPage() {
  const {
    setAlert,
    setPageLoaderShow
  } = useApp()

  const [generatorType, setGeneratorType] =
    useState('paragraphs')
  const [paragraphs, setParagraphs] = useState(3)
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState(4)
  const [wordsPerSentence, setWordsPerSentence] = useState(12)
  const [startWithLorem, setStartWithLorem] =
    useState('yes')

  const [isParagraphsInvalid, setIsParagraphsInvalid] =
    useState(false)
  const [isSentencesPerParagraphInvalid, setIsSentencesPerParagraphInvalid] =
    useState(false)
  const [isWordsPerSentenceInvalid, setIsWordsPerSentenceInvalid] =
    useState(false)

  const [generatedText, setGeneratedText] = useState('')
  const [totalWords, setTotalWords] = useState(0.0)
  const [totalCharacters, setTotalCharacters] = useState(0.0)
  const [charactersWithoutSpaces, setCharactersWithoutSpaces] = useState(0.0)
  const [totalSentences, setTotalSentences] = useState(0.0)
  const [totalParagraphs, setTotalParagraphs] = useState(0.0)

  const [pieChart, setPieChart] =
    useState(pieChartData)

  const [loremBreakdown, setLoremBreakdown] =
    useState([])

  const capitalizeSentence = (sentence) => {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1)
  }
  
  const generateSentence = (wordCount, offset, useLoremStart) => {
    const words = []

    for (let index = 0; index < wordCount; index++) {
      if (useLoremStart && index < 2) {
        words.push(loremWords[index])
      } else {
        words.push(loremWords[(index + offset) % loremWords.length])
      }
    }

    return `${capitalizeSentence(words.join(' '))}.`
  }

  const generateLoremText = ({
    generatorType,
    paragraphs,
    sentencesPerParagraph,
    wordsPerSentence,
    startWithLorem
  }) => {
    const paragraphList = []

    let paragraphCount = paragraphs
    let sentenceCount = sentencesPerParagraph

    if (generatorType === 'words') {
      paragraphCount = 1
      sentenceCount = 1
    }

    if (generatorType === 'sentences') {
      paragraphCount = 1
    }

    for (let paragraph = 1; paragraph <= paragraphCount; paragraph++) {
      const sentenceList = []

      for (let sentence = 1; sentence <= sentenceCount; sentence++) {
        const offset =
          paragraph * sentence * wordsPerSentence

        const useLoremStart =
          startWithLorem === 'yes' &&
          paragraph === 1 &&
          sentence === 1

        sentenceList.push(
          generateSentence(
            wordsPerSentence,
            offset,
            useLoremStart
          )
        )
      }

      paragraphList.push(sentenceList.join(' '))
    }

    return paragraphList.join('\n\n')
  }
  
  const calculateLoremOnClickHandler = () => {
    const numParagraphs = parseFloat(paragraphs)
    const numSentencesPerParagraph = parseFloat(sentencesPerParagraph)
    const numWordsPerSentence = parseFloat(wordsPerSentence)

    if (
      isParagraphsInvalid ||
      isSentencesPerParagraphInvalid ||
      isWordsPerSentenceInvalid ||
      numParagraphs <= 0 ||
      numSentencesPerParagraph <= 0 ||
      numWordsPerSentence <= 0
    ) {
      return
    }

    const text =
      generateLoremText({
        generatorType,
        paragraphs: numParagraphs,
        sentencesPerParagraph: numSentencesPerParagraph,
        wordsPerSentence: numWordsPerSentence,
        startWithLorem
      })

    const wordCount =
      text.trim().length > 0
        ? text.trim().split(/\s+/).length
        : 0

    const characterCount =
      text.length

    const characterWithoutSpaceCount =
      text.replace(/\s/g, '').length

    const sentenceCount =
      text.trim().length > 0
        ? text.split(/[.!?]+/).filter((item) => item.trim().length > 0).length
        : 0

    const paragraphCount =
      text.trim().length > 0
        ? text.split(/\n+/).filter((item) => item.trim().length > 0).length
        : 0

    setGeneratedText(text)
    setTotalWords(wordCount)
    setTotalCharacters(characterCount)
    setCharactersWithoutSpaces(characterWithoutSpaceCount)
    setTotalSentences(sentenceCount)
    setTotalParagraphs(paragraphCount)

    setPieChart([
      {
        name: 'Words',
        value: wordCount
      },
      {
        name: 'Characters',
        value: characterCount
      }
    ])

    const options = {
      generatedText: text
    }

    const result = generateLoremBreakdown(options)

    setLoremBreakdown(result)
  }
  
  const generateLoremBreakdown = ({
    generatedText
  }) => {
    const schedule = []

    const paragraphs =
      generatedText.split(/\n+/).filter((item) => item.trim().length > 0)

    paragraphs.forEach((paragraph, index) => {
      const sentences =
        paragraph.split(/[.!?]+/).filter((item) => item.trim().length > 0)

      const words =
        paragraph.trim().length > 0
          ? paragraph.trim().split(/\s+/).length
          : 0

      schedule.push({
        paragraph: index + 1,
        sentences: Number(sentences.length.toFixed(2)),
        words: Number(words.toFixed(2)),
        characters: Number(paragraph.length.toFixed(2))
      })
    })

    return schedule
  }

  const handleCopyToClipboard = () => {
    try {
      copy(generatedText)
      setAlert({ message: 'Copied to clipboard', duration: 5000, severity: 'success', show: true })
    } catch (err) {
      setAlert({ message: 'Failed to copy to clipboard', duration: 5000, severity: 'error', show: true })
    }
  }

  useEffect(() => {
    calculateLoremOnClickHandler()
  }, [])

  return (<Container>
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
              <CTypography cvariant='sh'>Lorem Ipsum Details</CTypography>

              <Stack spacing={3}>
                <CSelect
                  select
                  label='Generator Type'
                  fullWidth
                  value={generatorType}
                  onChange={(e) =>
                    setGeneratorType(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='paragraphs'>Paragraphs</MenuItem>
                  <MenuItem value='sentences'>Sentences</MenuItem>
                  <MenuItem value='words'>Words</MenuItem>
                </CSelect>

                {generatorType === 'paragraphs' && (
                  <CTextField
                    label='Paragraphs'
                    fullWidth
                    value={paragraphs.toLocaleString()}
                    helperText={`0 < Paragraphs < ${(100).toLocaleString()}`}
                    helperTextStyle={{ pl: '4px' }}
                    sx={{
                      border: isParagraphsInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                      borderRadius: '8px',
                      ':hover': {
                        border: isParagraphsInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                      }
                    }}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/,/g, '')
                      const num = Number(rawValue)

                      if (!isNaN(num)) {
                        setParagraphs(num)

                        const isInvalid =
                          num <= 0 || num > 100

                        setIsParagraphsInvalid(isInvalid)
                      } else {
                        setIsParagraphsInvalid(true)
                      }
                    }}
                  />
                )}

                {(generatorType === 'paragraphs' ||
                  generatorType === 'sentences') && (
                  <CTextField
                    label='Sentences Per Paragraph'
                    fullWidth
                    value={sentencesPerParagraph.toLocaleString()}
                    helperText={`0 < Sentences < ${(100).toLocaleString()}`}
                    helperTextStyle={{ pl: '4px' }}
                    sx={{
                      border: isSentencesPerParagraphInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                      borderRadius: '8px',
                      ':hover': {
                        border: isSentencesPerParagraphInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                      }
                    }}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/,/g, '')
                      const num = Number(rawValue)

                      if (!isNaN(num)) {
                        setSentencesPerParagraph(num)

                        const isInvalid =
                          num <= 0 || num > 100

                        setIsSentencesPerParagraphInvalid(isInvalid)
                      } else {
                        setIsSentencesPerParagraphInvalid(true)
                      }
                    }}
                  />
                )}

                <CTextField
                  label='Words Per Sentence'
                  fullWidth
                  value={wordsPerSentence.toLocaleString()}
                  helperText={`0 < Words < ${(100).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isWordsPerSentenceInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isWordsPerSentenceInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setWordsPerSentence(num)

                      const isInvalid =
                        num <= 0 || num > 100

                      setIsWordsPerSentenceInvalid(isInvalid)
                    } else {
                      setIsWordsPerSentenceInvalid(true)
                    }
                  }}
                />

                <CSelect
                  select
                  label='Start With Lorem Ipsum'
                  fullWidth
                  value={startWithLorem}
                  onChange={(e) =>
                    setStartWithLorem(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='yes'>Yes</MenuItem>
                  <MenuItem value='no'>No</MenuItem>
                </CSelect>

                <CButton
                  size='large'
                  label='Generate Lorem Ipsum'
                  onClick={calculateLoremOnClickHandler}
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
                    Lorem Ipsum Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Generated Text = Paragraphs * Sentences * Words
                  </CTypography>

                  <CTypography cvariant='c'>
                    Words are selected from a placeholder word list
                    <br />
                    Sentences are built using selected words per sentence
                    <br />
                    Paragraphs are created using selected sentences per paragraph
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
                      Generated Text
                    </CTypography>
                    <Typography
                      variant='body1'
                      sx={{
                        whiteSpace: 'pre-wrap',
                        ':hover': {
                          cursor: 'pointer',
                          bgcolor: 'var(--s-bg-color)'
                        } 
                      }}
                      onClick={handleCopyToClipboard}
                    >
                      {generatedText}
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
                      Total Words
                    </CTypography>
                    <Typography variant='h6'>
                      {totalWords.toFixed(2)}
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
                      Total Characters
                    </CTypography>
                    <Typography variant='h6'>
                      {totalCharacters.toFixed(2)}
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

                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Total Sentences
                    </CTypography>
                    <Typography variant='h6'>
                      {totalSentences.toFixed(2)}
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
                    <CTypography cvariant='c'>
                      Total Paragraphs
                    </CTypography>
                    <Typography variant='h6'>
                      {totalParagraphs.toFixed(2)}
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
    </Container>
  )
}