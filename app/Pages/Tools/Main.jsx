import React, { useState, useMemo } from 'react'
import {
  Box,
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
  Stack,
  Breadcrumbs,
  Chip
} from '@mui/material'
import { useApp } from '../../DataStores/AppContext'
import CTypography from '../../Components/CTypography'
import CTextField from '../../Components/CTextField'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import Link from 'next/link'
import TOOL_LIST from './Constants/TOOL_LIST'
import CATEGORY_FAQ from './Constants/CATEGORY_FAQ'
import TOOL_CONTENT from './Constants/TOOL_CONTENT'

export default function Main ({ tool }) {
  const [ expandedFAQ, setExpandedFAQ ] = useState('')
  const { slug, category } = tool || {}
  const searchedTool = TOOL_LIST.find((item) => item.slug.toLowerCase() === slug.toLowerCase()) || {}
  const searchedToolFAQ = CATEGORY_FAQ[searchedTool.category] || []
  const searchedToolContent = TOOL_CONTENT[searchedTool.category](searchedTool.title)
  const pageComponent = searchedTool.pageComponent || null

  const filteredTools = TOOL_LIST.filter((item) => item.category === searchedTool.category)

  return (
    <Box
      display='flex'
      width='100%'
      flexDirection='column'
    >
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link underline="hover" color="inherit" href="/">
            <CTypography cvariant='c'>
              Home
            </CTypography>
          </Link>

          {/* <Link underline="hover" color="inherit" href={`/${searchedTool.category?.toLowerCase()}`}>
            <CTypography cvariant='c'>
              {searchedTool.category}
            </CTypography>
          </Link> */}
          <CTypography cvariant='c'>
            {searchedTool.title}
          </CTypography>
        </Breadcrumbs>

        <Box mb={5}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={2}
          >
            <Chip label={`${searchedTool.category}`} size="small" />
          </Stack>
          <CTypography cvariant='mh'>{searchedTool.title}</CTypography>
          <CTypography cvariant='th' sx={{ my: 2, color: 'var(--t-fg-color)' }}>
            {searchedTool.description}
          </CTypography>
        </Box>
      </Container>
      <Grid item xs={12} lg={12} sm={12}>
        {pageComponent}
      </Grid>
      <Container maxWidth="lg">
        <Grid item xs={12} lg={12} sm={12}>
          <CTypography cvariant='sh' gutterBottom>
            {searchedToolContent?.title}
          </CTypography>
          <CTypography>
            {searchedToolContent?.content}
          </CTypography>
        </Grid>
        <Grid item xs={12} lg={12} sm={12}>
          <CTypography cvariant='sh' gutterBottom sx={{mt: '16px', mb: '8px'}}>
            Related Tools
          </CTypography>
          <Grid container spacing={3}>
            {filteredTools.map((toolItem, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={toolItem.title}
              >
                <Link
                  href={`/${toolItem.category.toLowerCase()}/${toolItem.slug}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    height: '100%',
                  }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      transition: '0.2s',
                      cursor: 'pointer',
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px',
                      '&:hover': {
                        border: '1px solid var(--p-b-color)'
                      }
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction='row'
                        sx={{
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Box mb={2}>{toolItem.icon}</Box>
                      </Stack>
                      <CTypography
                        cvariant='th'
                        gutterBottom
                      >
                        {toolItem.title}
                      </CTypography>
                      <CTypography cvariant='c'> {toolItem.description} </CTypography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12} sm={12}>
          <Typography
            sx={{
              color: 'var(--s-fg-color)',
              fontWeight: '400',
              pt: 4,
              pb: 1
            }}
            cvariant='th'
          >
            Answers to commonly asked questions
          </Typography>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        {
          searchedToolFAQ.map((faq = {}, idx) => {
            return (
              <Grid
                key={idx}
                item xs={12} lg={12} sm={12}
                sx={{
                  ...(idx !== searchedToolFAQ.length - 1 && {
                    borderBottom: '1px solid var(--b-color)'
                  })
                }}
              >
                <Accordion
                  expanded={expandedFAQ === idx}
                  onChange={() => {
                    if (expandedFAQ === idx) {
                      setExpandedFAQ('')
                      return
                    }
                    setExpandedFAQ(idx)
                  }}
                  sx={{
                    '&.MuiAccordion-root': {
                      boxShadow: 'none'
                    }
                  }}
                >
                  <AccordionSummary
                    sx={{
                      '&.MuiAccordionSummary-root': {
                        p: '0px'
                      }
                    }}
                    aria-controls={`${idx}-content`} id={`${idx}-header`}
                  >
                    <Grid item xs={12} lg={12} sm={12}>
                      <Stack
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='center'
                      >
                        <KeyboardArrowRightRoundedIcon
                          sx={{
                            width: 24,
                            height: 24,
                            mr: '8px',
                            textAlign: 'center',
                            color: 'var(--p-fg-color)',
                            ...(expandedFAQ === idx && { display: 'none' })
                          }}
                        />
                        <KeyboardArrowDownRoundedIcon
                          sx={{
                            width: 24,
                            height: 24,
                            mr: '8px',
                            textAlign: 'center',
                            color: 'var(--p-fg-color)',
                            ...(expandedFAQ !== idx && { display: 'none' })
                          }}
                        />
                        <CTypography
                          sx={{
                            fontWeight: '400',
                            color: 'var(--p-fg-color)'
                          }}
                          cvariant='th'
                        >
                          {faq.question}
                        </CTypography>
                      </Stack>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      '&.MuiAccordionDetails-root': {
                        p: '0px',
                        my: '8px'
                      }
                    }}
                  >
                    <Grid item xs={12} lg={12} sm={12}>
                      <CTypography
                        sx={{
                          textAlign: 'justify',
                          fontWeight: '400',
                          mx: '8px',
                          color: 'var(--s-fg-color)'
                        }}
                        cvariant='th'
                      >
                        {faq.answer}
                      </CTypography>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            )
          })
        }
      </Container>
      <Box
        sx={{
          py: 4,
          borderTop: '1px solid var(--s-bg-color)',
          textAlign: 'center',
        }}
      >
        <CTypography cvariant='c'>
          © 2026 FreeTools101. All rights reserved.
        </CTypography>
      </Box>
    </Box>
  )
}
